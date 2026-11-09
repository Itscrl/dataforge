/** Source-reviewed 2026-11-09. These are learning links, not indexed tutor evidence. */
export type RoadmapPhase = 'Foundations' | 'Build pipelines' | 'Operate reliably' | 'Advanced practice';
export interface RoadmapStage {
  id: string;
  phase: RoadmapPhase;
  title: string;
  summary: string;
  topics: string[];
  outcome: string;
  exercise: string;
  resources: { title: string; url: string; kind: 'Read' | 'Watch' | 'Practice' }[];
}
const read = (title: string, url: string): RoadmapStage['resources'][number] => ({ title, url, kind: 'Read' });
const practice = (title: string, url: string): RoadmapStage['resources'][number] => ({ title, url, kind: 'Practice' });
const sql = read('PostgreSQL tutorial', 'https://www.postgresql.org/docs/current/tutorial.html');
const modeling = read('Kimball dimensional modeling techniques', 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/');
const pipelines = read('Google SRE: data processing pipelines', 'https://sre.google/sre-book/data-processing-pipelines/');
const airflow = read('Airflow core concepts', 'https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/');
const zoomcamp = practice('DataTalksClub DE Zoomcamp: lessons and assignments', 'https://github.com/DataTalksClub/data-engineering-zoomcamp');
const security = read('Google Cloud architecture: security and privacy', 'https://docs.cloud.google.com/architecture/framework/security');
const tests = read('dbt data tests', 'https://docs.getdbt.com/docs/build/data-tests');
const iceberg = read('Apache Iceberg schema and partition evolution', 'https://iceberg.apache.org/docs/latest/evolution/');

export const roadmapStages: RoadmapStage[] = [
  {
    id: 'engineering-overview', phase: 'Foundations', title: 'Understand the data lifecycle',
    summary: 'Follow a record from an operational system through ingestion, transformation and a consumer-facing dataset. Start with the business decision the data must support.',
    topics: ['Operational vs analytical workloads', 'ETL and ELT', 'Sources, sinks and ownership', 'Freshness and correctness'],
    outcome: 'Explain each component in a small pipeline and who depends on its output.',
    exercise: 'Choose a public dataset. Draw its source, raw storage, clean tables and one useful report; write an explicit freshness target.',
    resources: [{ title: 'freeCodeCamp: Data Engineering Course for Beginners (2024)', url: 'https://www.youtube.com/watch?v=PHsC_t0j1dU', kind: 'Watch' }, read('freeCodeCamp course outline and context', 'https://www.freecodecamp.org/news/learn-the-essentials-of-data-engineering/'), pipelines],
  },
  {
    id: 'sql-relations', phase: 'Foundations', title: 'Query relational data correctly',
    summary: 'Learn how keys, joins, grouping and NULL affect the meaning of a result. Correct row counts come before clever query syntax.',
    topics: ['Keys and foreign keys', 'Join cardinality', 'NULL and aggregates', 'Transactions and windows'],
    outcome: 'Write a report query and explain why its joins do not multiply totals.',
    exercise: 'Build customers, orders and order_lines. Calculate daily revenue, include customers with no orders, and test duplicate and NULL cases in the SQL lab.',
    resources: [sql, practice('Use the Dataforge SQL lab', '#sql')],
  },
  {
    id: 'python-ingestion', phase: 'Foundations', title: 'Write maintainable Python ingestion',
    summary: 'Turn a one-off script into small functions with explicit inputs, validation, exceptions and tests. Keep extraction separate from transformation and persistence.',
    topics: ['Functions and modules', 'JSON and CSV', 'Iterators and files', 'Exceptions and logging'],
    outcome: 'Parse records with bounded memory and report malformed input without hiding failures.',
    exercise: 'Read a CSV containing invalid dates and duplicate IDs. Produce clean rows, a rejected-record file and a reconciliation summary.',
    resources: [read('Python official tutorial', 'https://docs.python.org/3/tutorial/'), zoomcamp],
  },
  {
    id: 'reproducible-environment', phase: 'Foundations', title: 'Make development reproducible',
    summary: 'Package code and dependencies so another person can reproduce a pipeline. Separate configuration and credentials from source control.',
    topics: ['Git and reviewable changes', 'Container images and volumes', 'Environment configuration', 'Dependency versions'],
    outcome: 'Start an isolated local database and pipeline using documented commands.',
    exercise: 'Create a containerized PostgreSQL development stack, a sample environment file without secrets, and a README that another developer can follow.',
    resources: [read('Docker getting started', 'https://docs.docker.com/get-started/'), zoomcamp],
  },
  {
    id: 'architecture-decisions', phase: 'Foundations', title: 'Design the architecture before the stack',
    summary: 'Translate scale, latency, recovery and privacy requirements into component boundaries. A warehouse, lake or streaming system is a tradeoff rather than a mandatory checklist.',
    topics: ['Requirements and constraints', 'Batch vs continuous processing', 'Storage and compute boundaries', 'Architecture decision records'],
    outcome: 'Defend a simple design and identify when its assumptions stop holding.',
    exercise: 'Design daily city-service reporting and compare it with a one-minute alerting service. Record volume assumptions, failure modes and why each architecture differs.',
    resources: [pipelines, security],
  },
  {
    id: 'dimensional-grain', phase: 'Foundations', title: 'Model facts, dimensions and grain',
    summary: 'Declare exactly what one fact row represents before selecting measures and dimensions. Preserve a consistent grain so aggregation answers the intended business question.',
    topics: ['Transaction and snapshot facts', 'Star schemas', 'Additive vs non-additive measures', 'Conformed dimensions'],
    outcome: 'Create a dimensional model with explicit keys, grain and aggregation rules.',
    exercise: 'Model public-transit journeys. Distinguish one boarding event from one route-day summary; show why average delay cannot simply be summed.',
    resources: [modeling, practice('Open Dataforge projects', '#projects')],
  },
  {
    id: 'history-and-scd', phase: 'Build pipelines', title: 'Preserve history and late changes',
    summary: 'Choose whether an attribute should be overwritten or versioned. Historical reporting needs temporal rules and a defined policy for facts that arrive after their dimension changes.',
    topics: ['SCD Types 1 and 2', 'Surrogate and business keys', 'Effective intervals', 'Late-arriving facts and dimensions'],
    outcome: 'Resolve each fact to the correct historical dimension version.',
    exercise: 'Version a customer address dimension with non-overlapping effective intervals. Load a late order and prove it joins to the address valid at event time.',
    resources: [modeling, sql],
  },
  {
    id: 'batch-replay', phase: 'Build pipelines', title: 'Build a replayable batch pipeline',
    summary: 'Treat raw inputs as recoverable evidence and define deterministic processing boundaries. A rerun should not silently duplicate output or lose the ability to explain a result.',
    topics: ['Raw and curated layers', 'Idempotent writes', 'Checkpoints and manifests', 'Reconciliation'],
    outcome: 'Rerun a dated batch safely after a simulated partial failure.',
    exercise: 'Load three days of public CSV data, fail after staging, and rerun. Compare source counts, rejected rows and target totals before publishing.',
    resources: [pipelines, zoomcamp],
  },
  {
    id: 'storage-and-formats', phase: 'Build pipelines', title: 'Choose storage layout and file formats',
    summary: 'Distinguish a file format from a database or table format. Match columnar storage, compression and partition layout to the actual access pattern.',
    topics: ['CSV, JSON and Parquet', 'Column projection', 'Partition pruning', 'Small-file overhead'],
    outcome: 'Explain how file layout changes scanned bytes and maintenance work.',
    exercise: 'Write the same sample dataset as CSV and Parquet. Compare file size and a two-column filtered query; record both the data size and engine used.',
    resources: [read('Apache Parquet overview', 'https://parquet.apache.org/docs/overview/'), iceberg],
  },
  {
    id: 'dbt-transformations', phase: 'Build pipelines', title: 'Build a tested transformation graph',
    summary: 'Organize transformations as reusable models with declared dependencies. Incremental processing requires an explicit rule for selecting changed rows and handling updates.',
    topics: ['Staging and marts', 'Model dependencies', 'Incremental filters and unique keys', 'Data tests and documentation'],
    outcome: 'Build and test a small mart that remains correct after an update and a rerun.',
    exercise: 'Create staging, dimension and fact models. Insert a corrected record, run the incremental path, and compare it with a full rebuild on a test dataset.',
    resources: [read('dbt incremental models', 'https://docs.getdbt.com/docs/build/incremental-models'), tests, zoomcamp],
  },
  {
    id: 'airflow-orchestration', phase: 'Build pipelines', title: 'Orchestrate dependencies with Airflow',
    summary: 'Separate scheduling and dependency management from the code doing the data processing. Model data intervals, retries and concurrency so a successful run means something precise.',
    topics: ['Dags and task dependencies', 'TaskFlow', 'Data intervals', 'Retries, timeouts and concurrency'],
    outcome: 'Run a dependency-aware workflow and explain its retry behavior.',
    exercise: 'Orchestrate extract, validate, transform and publish. Force validation to fail, ensure publication is blocked, then repair the data and rerun.',
    resources: [airflow, practice('Apache Airflow tutorials', 'https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html')],
  },
  {
    id: 'asset-orchestration', phase: 'Build pipelines', title: 'Compare asset-oriented orchestration',
    summary: 'Describe the durable datasets a system produces and their dependencies. Compare an asset view with a task view using the same pipeline rather than learning tool names in isolation.',
    topics: ['Dagster assets and materializations', 'Partitions and backfills', 'Asset checks', 'Airflow asset scheduling'],
    outcome: 'Explain which orchestration model helps you diagnose a stale dataset.',
    exercise: 'Represent one dated raw file and its daily mart as assets. Materialize one partition, inspect dependencies, and document a safe historical backfill procedure.',
    resources: [read('Dagster assets and linked guides', 'https://dagster.io/docs/guides/build/assets'), airflow],
  },
  {
    id: 'quality-and-contracts', phase: 'Operate reliably', title: 'Protect consumers with tests and contracts',
    summary: 'A structural contract and a content assertion answer different questions. Define both and decide which failures block publication versus require investigation.',
    topics: ['Schema contracts', 'Uniqueness and relationships', 'Accepted values and business rules', 'Quarantine and ownership'],
    outcome: 'Detect a breaking schema change separately from incorrect business data.',
    exercise: 'Change an amount column to text, then introduce negative amounts. Demonstrate a structural rejection and a separate business-rule test with useful failing rows.',
    resources: [read('dbt model contracts', 'https://docs.getdbt.com/docs/mesh/govern/model-contracts'), tests],
  },
  {
    id: 'observability-and-lineage', phase: 'Operate reliably', title: 'Observe freshness and trace lineage',
    summary: 'A green task can still publish stale or incomplete data. Track consumer-facing freshness and volume signals, then trace affected datasets when an upstream input changes.',
    topics: ['Freshness and completeness', 'SLIs and SLOs', 'Job, run and dataset lineage', 'Actionable alerts'],
    outcome: 'Connect an observed data symptom to its upstream owner and dependency.',
    exercise: 'Write a freshness SLO for your mart, simulate a missing input, and draw the downstream blast radius. Define an alert with an owner and a recovery action.',
    resources: [read('Google SRE: service level objectives', 'https://sre.google/sre-book/service-level-objectives/'), read('OpenLineage integration capabilities', 'https://openlineage.io/docs/integrations/')],
  },
  {
    id: 'backfills-and-incidents', phase: 'Operate reliably', title: 'Recover safely and write runbooks',
    summary: 'Recovery is part of pipeline design. Bound historical reprocessing, preserve trustworthy outputs and verify reconciliation before declaring an incident resolved.',
    topics: ['Backfill ranges and concurrency', 'Partial failures', 'Rollback and replay', 'Incident timelines'],
    outcome: 'Recover missing partitions without overwhelming a source or duplicating published data.',
    exercise: 'Remove one input day, write a recovery runbook, backfill only that interval, and produce a short incident report with validation evidence.',
    resources: [airflow, pipelines],
  },
  {
    id: 'security-and-governance', phase: 'Operate reliably', title: 'Design privacy and access boundaries',
    summary: 'Classify data before distributing it. Give identities only the access they need, keep secrets out of logs, and make retention and deletion part of the design.',
    topics: ['Least privilege', 'PII classification', 'Encryption and secret handling', 'Retention, deletion and auditability'],
    outcome: 'Explain who can read raw versus curated data and how access is audited.',
    exercise: 'Use synthetic data to create a role-access matrix and a redacted mart. Write a deletion plan covering raw files, tables, backups and downstream consumers.',
    resources: [security],
  },
  {
    id: 'delivery-and-automation', phase: 'Operate reliably', title: 'Automate delivery and operational handoffs',
    summary: 'Make code and schema changes reviewable and repeatable. Use workflow automation for notifications and integrations while retaining explicit error handling and duplicate protection.',
    topics: ['CI validation', 'Environment promotion', 'n8n error workflows', 'Webhook retries and idempotency'],
    outcome: 'Reject a bad transformation in CI and route an operational failure to a clear recovery path.',
    exercise: 'Create a test workflow for a pipeline PR. Design an n8n failure notification containing a run ID and safe retry instructions, without embedding credentials or raw personal data.',
    resources: [read('GitHub Actions documentation', 'https://docs.github.com/en/actions'), read('n8n error handling', 'https://docs.n8n.io/flow-logic/error-handling/')],
  },
  {
    id: 'performance-and-cost', phase: 'Operate reliably', title: 'Measure performance and unit cost',
    summary: 'Tune from a baseline rather than an assumption. Evaluate runtime, scan volume and resource cost alongside correctness and maintenance effort.',
    topics: ['Query plans and estimates', 'Indexes and pruning', 'Cost per useful unit', 'Benchmark reproducibility'],
    outcome: 'Show a measured improvement while preserving result correctness.',
    exercise: 'Capture an EXPLAIN plan and timings for a slow query, change one factor, and compare results. Estimate cost per GB processed with explicit pricing and workload assumptions.',
    resources: [read('PostgreSQL EXPLAIN', 'https://www.postgresql.org/docs/current/using-explain.html'), read('FinOps Foundation: unit economics', 'https://www.finops.org/framework/capabilities/unit-economics/')],
  },
  {
    id: 'cdc-and-events', phase: 'Advanced practice', title: 'Capture database changes and replay events',
    summary: 'Move beyond periodic full extracts by learning the lifecycle of change events. Handle snapshots, updates, deletes and offset recovery before treating CDC as a reliable replacement.',
    topics: ['Debezium snapshots and change streams', 'Kafka topics and keys', 'Offsets and replay', 'Delete propagation'],
    outcome: 'Explain how a source update becomes a correctly applied target change.',
    exercise: 'Use a synthetic orders table. Capture an insert, update and delete, replay the events, and verify that duplicate delivery does not corrupt the target.',
    resources: [read('Debezium architecture', 'https://debezium.io/documentation/reference/stable/architecture.html'), read('Apache Kafka documentation', 'https://kafka.apache.org/documentation/')],
  },
  {
    id: 'streaming-time-and-state', phase: 'Advanced practice', title: 'Reason about streaming time and state',
    summary: 'Continuous processing introduces unbounded input, late events and recovery state. Specify the source, engine and sink assumptions behind any delivery guarantee.',
    topics: ['Event time vs processing time', 'Windows and watermarks', 'State and checkpoints', 'Delivery guarantees and sink behavior'],
    outcome: 'Explain the result of late, duplicated and out-of-order events.',
    exercise: 'Compute five-minute counts over synthetic events. Delay one event, duplicate another, restart processing, and document which outputs change and why.',
    resources: [read('Spark Structured Streaming guides', 'https://spark.apache.org/docs/latest/streaming/index.html'), zoomcamp],
  },
  {
    id: 'lakehouse-table-formats', phase: 'Advanced practice', title: 'Operate evolving lakehouse tables',
    summary: 'Learn the metadata and lifecycle above columnar files. A table format can manage snapshots and evolution, but still requires catalog, compatibility and maintenance decisions.',
    topics: ['Iceberg metadata and snapshots', 'Schema and partition evolution', 'Catalog boundaries', 'Compaction and retention'],
    outcome: 'Distinguish a Parquet file, an Iceberg table and the engine querying it.',
    exercise: 'On disposable test data, change a table partition layout and compare old and new data reads. Write a maintenance plan that considers readers and snapshot retention.',
    resources: [iceberg, read('Apache Parquet overview', 'https://parquet.apache.org/docs/overview/')],
  },
  {
    id: 'ai-data-and-evaluation', phase: 'Advanced practice', title: 'Engineer trustworthy data for AI and RAG',
    summary: 'Treat document ingestion, retrieval and answer evaluation as separate systems. Preserve source identity and access permissions, and measure retrieval quality before relying on generated prose.',
    topics: ['Document provenance and chunking', 'Access-aware retrieval', 'Evaluation datasets', 'Grounding, abstention and versioning'],
    outcome: 'Trace an answer to its source snapshot and identify unsupported or unauthorized retrieval.',
    exercise: 'Create 20 questions with expected source passages, including unanswerable questions. Measure retrieval hit rate, inspect citation support and test a document deletion or access change.',
    resources: [read('Google Cloud RAG reference architecture', 'https://docs.cloud.google.com/architecture/rag-genai-gemini-enterprise-vertexai'), read('RAGAS evaluation research paper', 'https://arxiv.org/abs/2309.15217'), practice('Inspect sources in the Dataforge tutor', '#tutor')],
  },
  {
    id: 'architecture-review', phase: 'Advanced practice', title: 'Review a system under realistic constraints',
    summary: 'Combine modeling, orchestration and operations in a design review. Prefer a justified system with tested recovery over a diagram containing every fashionable technology.',
    topics: ['Capacity and latency estimates', 'Failure and security boundaries', 'Migration and rollback', 'Documented tradeoffs'],
    outcome: 'Defend design decisions with assumptions, alternatives and measurable acceptance criteria.',
    exercise: 'Review a municipal-service pipeline with a daily dashboard and urgent alerts. Estimate load, choose different freshness targets, and explain the simplest design that meets them.',
    resources: [pipelines, security, read('FinOps unit economics', 'https://www.finops.org/framework/capabilities/unit-economics/')],
  },
  {
    id: 'portfolio-capstone', phase: 'Advanced practice', title: 'Ship a portfolio that proves engineering judgment',
    summary: 'Package a useful public-data product with reproducible execution, clear modeling and evidence of correctness. Show how you handle bad data and failures as well as the happy path.',
    topics: ['Useful consumer problem', 'Architecture and data dictionary', 'Tests and incident evidence', 'Demo, limitations and reproducibility'],
    outcome: 'Give a reviewer enough evidence to reproduce and assess your work.',
    exercise: 'Publish a transit reliability, local-price or public-service data product. Include source licenses, grain, orchestration, reconciliation, one failure drill, cost assumptions and an honest limitations section.',
    resources: [zoomcamp, practice('Choose a Dataforge project', '#projects'), pipelines],
  },
];
