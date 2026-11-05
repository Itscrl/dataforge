# Data engineering learning product: research and curriculum

Research date: 5 November 2026, Asia/Manila. This document is a product and curriculum proposal, not a claim that every item is implemented. The application's README and QA report describe the delivered build. Sources are primary project documentation, original research, and first-party engineering guidance; links that track `stable`, `latest`, or `current` must be pinned to versions when lessons ship.

## Product thesis

Build a practice environment that teaches a learner to **reason about data, implement a transformation, diagnose a failure, and defend a production decision**. A large multiple-choice bank alone cannot establish those abilities. The daily loop should mix retrieval practice, executable problems, incident investigation, and progressively larger projects. Progress should mean evidence of retained skills, not time spent tapping answers.

The user needs both immediate feedback and real-time engineering topics. These are separate features: SQL feedback should return promptly; streaming exercises should teach event time, late data, duplicates, ordering, recovery, and sink semantics.

## Evidence that changes the design

| Finding | Product decision | Primary source |
| --- | --- | --- |
| A SQL window calculation preserves individual rows, unlike ordinary aggregation. | Teach the grain of intermediate and final results; ask learners to predict row counts before executing. | [PostgreSQL window functions](https://www.postgresql.org/docs/current/tutorial-window.html) |
| Plans expose scan, join, sort, and aggregation choices; measured and estimated behavior differ. | Add plan-reading and performance investigations after correctness exercises. Do not grade only by query text. | [PostgreSQL EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html) |
| Retryable orchestration tasks should produce consistent outcomes and avoid partial published results. | Include retries, atomic publication, deterministic partitions, and rerun tests. | [Airflow best practices](https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html) |
| Kafka transactions support coordinated Kafka read/process/write operations; other destinations need cooperation for end-to-end guarantees. | Never teach “exactly once” as an unconditional system property. Grade the stated failure boundary. | [Kafka design](https://kafka.apache.org/41/design/design/) |
| Event time and processing time answer different questions; watermark policy trades completeness against latency. | Offer an event timeline with late events and a configurable watermark, followed by a prediction question. | [Flink streaming analytics](https://nightlies.apache.org/flink/flink-docs-master/docs/learn-flink/streaming_analytics/) |
| Data assertions and model unit tests serve different purposes. Incremental processing introduces state. | Teach fixture-based transformation tests, output contracts, and rerunning incremental models. | [dbt data tests](https://docs.getdbt.com/docs/build/data-tests), [unit tests](https://docs.getdbt.com/docs/build/unit-tests), [incremental models](https://docs.getdbt.com/docs/build/incremental-models-overview) |
| Spark performance depends on partitioning, statistics, joins, caching, and adaptive execution. | Add skew and shuffle incidents with measured evidence rather than “always broadcast” rules. | [Spark performance tuning](https://spark.apache.org/docs/latest/sql-performance-tuning.html) |
| Parquet is a column-oriented file format; Iceberg adds table-level evolution semantics. | Explicitly distinguish file format, table format, catalog, storage, and compute. | [Parquet overview](https://parquet.apache.org/docs/overview/), [Iceberg evolution](https://iceberg.apache.org/docs/latest/evolution/) |
| CDC has snapshot and ongoing-change phases, including ordering and collision concerns. | Give learners inserts, updates, deletes, restarts, and snapshot overlap cases. | [Debezium PostgreSQL connector](https://debezium.io/documentation/reference/stable/connectors/postgresql.html) |
| Lineage models jobs, runs, and datasets rather than just static table arrows. | Teach impact analysis and attach evidence to a specific run. | [OpenLineage object model](https://openlineage.io/docs/spec/object-model/) |
| Repeated retrieval improved delayed retention in the studied prose-learning experiments. | Ask for an answer before revealing explanations, then revisit the concept later. This is evidence for the learning mechanism, not proof this app improves job performance. | [Roediger & Karpicke, 2006](https://doi.org/10.1111/j.1467-9280.2006.01693.x) |
| A synthesis of distributed-practice studies found that spacing and retention interval interact. | Use scheduled review and measure delayed transfer. A fixed interval schedule is an initial product heuristic, not a scientifically optimal personalized model. | [Cepeda et al., 2006](https://pubmed.ncbi.nlm.nih.gov/16719566/) |

## Beginner-to-professional curriculum

The following scope is a proposed full curriculum. Each track needs explanations, diagnostic questions, practice, common misconceptions, an applied assessment, and reviewed references. Prerequisites should be visible but learners may explore ahead.

| Track | Skills to acquire | Evidence of competence |
| --- | --- | --- |
| 01. Computing foundations | Files and paths; shell commands; processes; environment variables; HTTP, JSON, CSV; Git commits/branches; debugging; basic complexity. | Inspect a failed ingestion script and describe its input/output contract. |
| 02. Relational foundations | Tables, keys, grain, types, NULL, constraints, normalization, transactions, OLTP versus OLAP. | Identify grain violations and design keys that prevent duplicate facts. |
| 03. SQL essentials | SELECT, WHERE, CASE, aggregates, GROUP BY, HAVING, ordering, limits, dates, strings, set operations. | Produce exact results on unseen data including empty input and NULLs. |
| 04. Joins and analytical SQL | Join cardinality; outer/anti/semi joins; CTEs; subqueries; windows; deduplication; top-N; retention; funnels; gaps and islands. | Solve business questions without fan-out or accidental data loss. |
| 05. SQL performance and dialects | EXPLAIN; indexes; statistics; partitions; pruning; sargability; deterministic ordering; timezone and cast differences. | Explain a slow plan, propose a change, measure the result on the actual engine. |
| 06. Python for data work | Functions, collections, iterators/generators, exceptions, modules, environments, typing, tests, logging, context managers, APIs. | Build a tested paginated API ingestion process with bounded retries and checkpointing. |
| 07. Data modeling | Facts/dimensions; explicit grain; surrogate/natural keys; conformed dimensions; SCD1/SCD2; late-arriving dimensions; snapshots; metric definitions. | Design an order-line model and correctly join facts to historical dimensions. |
| 08. Ingestion and CDC | Batch/API/file ingestion; pagination; rate limits; incremental cursors; CDC logs; snapshots; deletes; schema drift; replay. | Recover after a partial load without losing or duplicating records. |
| 09. Storage and lakehouses | Object storage; CSV/JSON/Avro/Parquet; compression; partitioning; small files; table formats; catalogs; snapshots; compaction. | Select a storage layout for a workload and explain evolution/maintenance costs. |
| 10. Transformations and analytics engineering | ELT; dbt models, dependencies, sources, tests, documentation, incremental strategies, snapshots; semantic metrics. | Deliver a documented transformation with unit tests and output assertions. |
| 11. Orchestration | DAG dependencies; schedules and data intervals; idempotence; retries/backoff; backfills; concurrency; sensors; data readiness. | Repair an unreliable daily pipeline and demonstrate a safe backfill. |
| 12. Distributed processing | Partitions, shuffles, serialization, lazy evaluation, join strategies, skew, spill, caching, Spark DataFrames/SQL. | Use an execution plan and task metrics to fix a skewed job. |
| 13. Streaming systems | Logs, partitions, keys, offsets, consumer groups, event/processing time, watermarks, windows, state, checkpoints, delivery semantics. | Predict output under out-of-order arrivals, crashes, and replays. |
| 14. Data quality and contracts | Uniqueness, completeness, validity, freshness, distribution drift, reconciliation, quarantine, schema compatibility. | Add tests that catch a silent revenue error and route bad records safely. |
| 15. Reliability and observability | Logs/metrics/traces; data SLIs/SLOs; lineage; alert design; incident triage; rollback; runbooks; postmortems. | Mitigate an incident from evidence and explain prevention without blaming people. |
| 16. Cloud and platform engineering | IAM, networks, object storage, warehouses, managed compute, IaC, containers, CI/CD, secrets, budgets, lifecycle policies. | Deploy a reproducible least-privilege environment with a cost ceiling and cleanup plan. |
| 17. Governance and security | Classification; minimization; access control; encryption; masking; retention; deletion propagation; audit trails; ownership. | Trace sensitive fields and implement an access/deletion policy in a synthetic scenario. |
| 18. Systems design and professional practice | Requirements; SLAs; volume estimates; failure modes; tradeoffs; migrations; ADRs; stakeholder communication; cost estimation. | Defend a design, revise it after new constraints, and hand over a runbook. |
| 19. Data for AI systems | Embeddings; chunking; retrieval; freshness; ACL-aware search; RAG evaluation; provenance; feature freshness; training/serving leakage. | Build an evaluated, cited retrieval pipeline with authorization tests. |

The curriculum outline is our synthesis. Its modeling sequence follows the emphasis on grain, facts, dimensions, and historical change in the [Kimball techniques catalog](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/). Python fundamentals can link to the [official tutorial](https://docs.python.org/3/tutorial/), while adding a gentler introduction for people with no programming background. Cloud exercises should teach query pruning and resource awareness using [BigQuery guidance](https://docs.cloud.google.com/bigquery/docs/best-practices-performance-compute), and role-based temporary credentials using [AWS IAM guidance](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html). These are transferable principles; the learner need not buy three clouds.

### The app's 20 track IDs and phased prerequisites

The broad curriculum above is organized into these 20 product tracks. A track appearing in navigation means a learning category exists; it does not mean its entire professional syllabus or execution environment is delivered. Mastery progression should require new evidence at each phase, while keeping exploratory reading available.

| Product track | Core scope | Recommended prior evidence |
| --- | --- | --- |
| `sql` | Relational basics through joins, windows, correctness, and plans | None for foundations |
| `python` | Programming through tested, memory-aware data scripts | None for foundations |
| `git` | Commits, branches, reviews, merges, reproducibility, CI | Basic file editing |
| `linux` | Shell, files, pipes, permissions, processes, environment, scheduling | None for foundations |
| `apis` | HTTP, JSON, pagination, auth, rate limits, retries, webhooks | Python and basic networking |
| `formats` | CSV, JSON, Avro, Parquet, types, encodings, compression | SQL types and Python files |
| `modeling` | Grain, keys, facts/dimensions, SCD, metric contracts | SQL joins and relational constraints |
| `ingestion` | Incremental loads, CDC, snapshots, deletes, replay | APIs, formats, SQL, Python |
| `warehouse` | OLAP, MPP, column storage, partitions, clustering, dialects, cost | SQL, modeling, formats |
| `orchestration` | DAGs, intervals, retries, backfills, idempotence | Ingestion, Python, Git |
| `quality` | Assertions, unit tests, contracts, reconciliation, quarantine | SQL, modeling, ingestion |
| `spark` | Distributed DataFrames, shuffles, joins, skew, plans, spill | SQL, Python, formats |
| `streaming` | Kafka/Flink concepts, offsets, time, windows, state, recovery | Ingestion, quality, distributed basics |
| `lakehouse` | Object storage, table formats, catalogs, evolution, compaction | Formats, modeling, warehouse basics |
| `cloud` | IAM, networking, storage, compute, IaC, CI/CD, budgets | Linux, Git, warehouse or ingestion |
| `governance` | Ownership, classification, access, retention, lineage, deletion | Modeling, quality, cloud access basics |
| `observability` | Logs, metrics, traces, lineage, freshness, SLO dashboards | Orchestration and quality |
| `reliability` | Failure analysis, alerting, recovery, rollback, incident response | Observability, orchestration, cloud |
| `architecture` | Requirements, scale estimates, tradeoffs, migrations, ADRs | Evidence across modeling, storage, pipelines, reliability |
| `mlops` | Data/feature contracts, freshness, leakage, versioning, RAG data pipelines and evaluation | Python, quality, ingestion, governance |

Suggested phases: **Foundations** (`sql`, `python`, `git`, `linux`, `formats`); **Build reliable datasets** (`apis`, `modeling`, `ingestion`, `warehouse`, `quality`, `orchestration`); **Scale and operate** (`spark`, `streaming`, `lakehouse`, `cloud`, `observability`, `reliability`, `governance`); **Professional synthesis** (`architecture`, `mlops`, cross-track capstones). These are learning dependencies, not arbitrary calendar deadlines. A learner can place out with diagnostic evidence; failed prerequisites should produce targeted review rather than lock the whole app.

## Practice modes and variety

1. **Daily expedition, 10–20 minutes.** One due review, one new concept, one SQL or incident task, and one short reflection. Always offer a shorter session and a clear stopping point.
2. **Concept questions.** Single-best-answer questions with an explanation for every option, a misconception tag, an example, and a source. Shuffle options independently of answer identity. Avoid “all of the above” and superficial trivia.
3. **SQL workbench.** Schema, sample rows, task constraints, editor, results, failed fixture, hints, and a reference solution. Accept semantically equivalent answers; preserve duplicates and NULL distinctions when comparing results.
4. **Predict before running.** Predict row count, join cardinality, output, or query plan; then execute and reconcile the difference.
5. **Debug the pipeline.** Inspect a timeline, logs, a schema change, and data samples. Choose an investigation before a repair. Explain why plausible alternatives would fail.
6. **Streaming simulator.** Step through events, offsets, retries, watermarks, and sink writes. Mark it as a simulation; it does not establish Kafka/Flink operational competence.
7. **Design studio.** Complete a requirements sheet, choose components, calculate volumes, identify risks, and compare alternatives against a rubric. More than one design can be valid.
8. **Build projects.** Produce tested repositories, architecture decisions, quality contracts, and runbooks. Code execution requires a real sandbox; reading a project brief is not project completion.
9. **Interview room.** SQL, debugging, and systems-design sessions with optional time limits. Explain the answer after submission; do not equate speed with mastery.
10. **Mistake notebook and review queue.** Group attempts by misconception, record a personal explanation, and revisit a different problem that tests the same skill.
11. **Dialect clinic.** Compare SQLite, PostgreSQL, MySQL, DuckDB, BigQuery GoogleSQL, Snowflake SQL, T-SQL, and Spark SQL on dates, NULLs, casts, identifiers, QUALIFY, and upserts. Execution labels must name the actual engine/version. The initial app executes SQLite and PostgreSQL via PGlite; the other paths are language references until their runtimes exist. A translated query is not native execution.
12. **Field guide and later RAG tutor.** Search reviewed material without leaving a problem. Later, generate explanations only from authorized retrieved evidence plus the deterministic grader result.

Variety should come from changing the reasoning: different grains, edge cases, constraints, failure histories, and domains. Merely replacing names/numbers in the same query is not a new skill. Use retail, logistics, subscriptions, payments, energy, public transport, and observability data. All initial data should be synthetic and clearly described as such.

### Source library and learning depth

The source catalog in `src/content/resources.ts` adds curated primary-source links across all 20 tracks. It includes eight SQL language references plus guided practice, official tool documentation, openly available books, and Harvard's SQL OpenCourseWare. Each entry has a stable ID, track, suggested depth, format, URL, and original description for filtering, search, and bookmarks. These are referenced resources, not scraped copies or an exhaustive survey. External reading requires connectivity; external labs can require their own runtime, account, or infrastructure spend. A resource's suggested level is our editorial guidance, not a publisher-issued qualification.

Let learners choose both SQL language and depth. Foundations should teach portable relational reasoning; intermediate work should build analytical patterns; advanced work should expose engine-specific behavior; professional work should require plans, concurrency/failure reasoning, and operational tradeoffs. Show the actual execution engine separately from the selected reading language. PGlite expands real PostgreSQL practice in-browser, but server operations and multi-client behavior still need dedicated labs. [PGlite documentation](https://pglite.dev/docs/)

## Content system and editorial standards

Proposed library target after editorial expansion: 600 reviewed concept questions, 180 executable SQL challenges, 60 incident cases, 24 systems-design cases, and 12 capstones. These are backlog targets, not the delivered inventory or a promise of generated quality. Every published task needs a human-reviewed objective and test evidence; fewer verified tasks are preferable to thousands of untested variants.

A content record needs: stable ID; version; track; skill tags; prerequisites; level; expected effort; scenario/domain; prompt; allowed assumptions; answer or reference implementation; fixture seeds; grader rules; hints; misconception-specific feedback; explanation; source URLs and source versions; last reviewed date; author/reviewer; license/provenance; accessibility notes. Store alternative correct solutions as grader tests.

Publish workflow: draft → technical review → fixture validation → ambiguity review → accessibility/copy review → release. Source updates create review tasks, not automatic rewrites of published answers. Keep previous content versions to reproduce historical grades. Reported issues should freeze affected scoring until reviewed.

## Learning and gamification rules

- Award XP for first-time demonstrated skills and successful delayed review. Repeatedly submitting a known answer should not farm XP.
- Show a mastery estimate per skill with evidence count and recency. Do not label a skill “mastered” from one multiple-choice answer.
- Let learners choose a daily goal and rest days. Streaks should encourage consistency without erasing progress or punishing absence.
- Alternate question, query, incident, and design formats; offer beginner, focused, and challenge sessions.
- Use hints in stages: conceptual direction → relevant clause/approach → worked solution. Record assistance without shaming the learner.
- Distinguish “solved with hints,” “solved independently,” and “retained on a new problem.” Keep all three useful.
- Initial review intervals can be 1, 3, 7, 14, and 30 days, shortening after a miss. Treat this as a transparent heuristic to validate against real delayed performance.
- Track confidence after an answer to detect confident misconceptions. Never infer professional readiness solely from XP, streak, or completion percentage.

## Capstone ladder

| Capstone | Deliverable and failure injection |
| --- | --- |
| Reliable API ingestion | Paginated API to raw storage; inject rate limits, duplicate pages, and a restart. |
| Retail analytics warehouse | Order-line facts and historical customer dimensions; inject returns and late updates. |
| Subscription metrics | Cohorts, churn, and recurring revenue with a precise metric contract; inject cancellations and reactivations. |
| Incremental dbt project | Staging/intermediate/mart layers with tests; inject an old updated record and schema drift. |
| Backfill operations | Orchestrated daily pipeline; repair a failed interval without corrupting successful intervals. |
| CDC replica | Snapshot plus change stream; inject deletes, out-of-order events, and a restart. |
| Streaming fraud features | Event-time windows and idempotent sink; inject late arrivals and repeated events. |
| Lakehouse maintenance | Partitioned Parquet/Iceberg design; inject small files and schema evolution. |
| Performance rescue | Diagnose a skewed join or expensive scan using actual plans and metrics. |
| Data incident response | Reconcile finance totals, identify impact through lineage, mitigate, and write a postmortem. |
| Governed data product | Define owners, contracts, access, retention, deletion, and quality SLOs. |
| RAG knowledge service | Cited retrieval with access filters, freshness checks, and a reproducible evaluation set. |

Production reliability exercises should include actionable alerts and user-visible symptoms, drawing on [Google SRE monitoring guidance](https://sre.google/sre-book/monitoring-distributed-systems/), rather than rewarding alarm volume.

## What success should measure

Primary learning outcome: performance on unseen, delayed, skill-matched tasks. Secondary outcomes: correct explanations, fewer repeated misconceptions, successful capstone tests, and the ability to make explicit tradeoffs. Engagement measures such as daily use and session completion help diagnose the experience but do not prove learning. Collect only the telemetry needed, with clear consent and deletion controls when cloud accounts are introduced.

Release research gaps: real Android usability testing, beginner comprehension testing, expert review of the question bank, validation of adaptive review, and longer-term transfer to real projects. No source establishes that a single app can guarantee professional mastery.
