# Architecture and pipeline learning roadmap

Research reviewed: **2026-11-09 (Asia/Manila)**. The 24 milestone descriptions and exercises are original curriculum synthesis. External links were checked through web research; their presence is not a claim that the material has been downloaded, licensed for redistribution, or indexed by the RAG tutor.

## Selection and ordering

Foundations precede pipeline construction, production operation and advanced specialization. Each milestone provides a short explanation, explicit topics, a demonstrable outcome and a concrete exercise. Status is a learner's own tracking signal, not an assessment or professional credential.

The advanced selections are editorial recommendations informed by current primary documentation, **not a labor-market ranking or a promise of an employment advantage**. Asset-aware orchestration, lakehouse table maintenance, CDC recovery, contracts, lineage, unit costs and AI data evaluation complement SQL, Python and sound modeling; they do not replace those fundamentals. No claim is made that these established techniques were invented this year.

## Primary technical references

| Scope | Source and what it supports |
| --- | --- |
| SQL and query plans | [PostgreSQL tutorial](https://www.postgresql.org/docs/current/tutorial.html), [EXPLAIN](https://www.postgresql.org/docs/current/using-explain.html): relational concepts, transactions, windows and plan interpretation. |
| Python | [Official tutorial](https://docs.python.org/3/tutorial/): language structures, modules, files and exceptions. It assumes some basic programming familiarity. |
| Reproducible environment | [Docker getting started](https://docs.docker.com/get-started/): containers and application stacks. |
| Architecture and reliability | [Google SRE pipelines](https://sre.google/sre-book/data-processing-pipelines/), [SLOs](https://sre.google/sre-book/service-level-objectives/): pipeline operating challenges and consumer-facing objectives. These are durable references, not recent product announcements. |
| Dimensional modeling | [Kimball Group techniques](https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/): declared grain, facts, dimensions, history and late-arriving data. Link to publisher material; do not bundle commercial books. |
| Transformation | [dbt incremental models](https://docs.getdbt.com/docs/build/incremental-models), [data tests](https://docs.getdbt.com/docs/build/data-tests), [model contracts](https://docs.getdbt.com/docs/mesh/govern/model-contracts): incremental selection, assertions and structural contracts. Adapter/version support and constraint enforcement differ. |
| Orchestration | [Airflow concepts](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/), [tutorials](https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html), [Dagster assets](https://dagster.io/docs/guides/build/assets): task and asset dependencies, intervals, materialization and linked partition/backfill guides. |
| Storage | [Parquet](https://parquet.apache.org/docs/overview/), [Iceberg evolution](https://iceberg.apache.org/docs/latest/evolution/): columnar files versus table metadata, schema and partition evolution. Actual engine compatibility must be checked before a lab. |
| CDC and streaming | [Debezium architecture](https://debezium.io/documentation/reference/stable/architecture.html), [Kafka docs](https://kafka.apache.org/documentation/), [Spark streaming](https://spark.apache.org/docs/latest/streaming/index.html): capture runtimes, event transport and streaming programming guides. End-to-end delivery guarantees depend on source, engine, sink and configuration. |
| Lineage | [OpenLineage integration matrix](https://openlineage.io/docs/integrations/): supported metadata varies by integration; its matrix explicitly says it is incomplete. |
| Security | [Google Cloud architecture security pillar](https://docs.cloud.google.com/architecture/framework/security): identity, data protection and governance principles. This is technical learning, not jurisdiction-specific legal advice. |
| Delivery and automation | [GitHub Actions](https://docs.github.com/en/actions), [n8n error handling](https://docs.n8n.io/flow-logic/error-handling/): repeatable workflow execution and error workflows. The exercise designs notifications; it does not send messages or connect an account. |
| Cost engineering | [FinOps unit economics](https://www.finops.org/framework/capabilities/unit-economics/): relating resource cost to useful workload units and business outcomes. No fixed provider prices are embedded. |
| AI data pipelines | [Google Cloud RAG architecture](https://docs.cloud.google.com/architecture/rag-genai-gemini-enterprise-vertexai), [RAGAS paper](https://arxiv.org/abs/2309.15217): source/retrieval/generation boundaries and evaluation research. Automated scores and matching citations are not guarantees of factual correctness. |

## Video and practical learning

- [freeCodeCamp's publisher course page](https://www.freecodecamp.org/news/learn-the-essentials-of-data-engineering/) identifies Justin Chau's **2024** Data Engineering Course for Beginners and links directly to [the YouTube course](https://www.youtube.com/watch?v=PHsC_t0j1dU). It covers Docker, SQL, pipelines, dbt, cron, Airflow and Airbyte. Use it for orientation; follow current official documentation when commands or versions differ. This is deliberately not labeled a newly released course.
- [DataTalksClub's DE Zoomcamp repository](https://github.com/DataTalksClub/data-engineering-zoomcamp) supplies lessons, course materials and assignments covering a full pipeline workflow. Cohort tools, schedules and certificate eligibility can change; the roadmap promises neither a currently open cohort nor a certificate.

## Verification limits and upkeep

Research verified the linked publisher pages, not every embedded video minute, cloud service, third-party dependency or exercise on every platform. External practical work may need a computer, containers, accounts or paid cloud resources; completing a roadmap status does not execute a distributed lab. Use local synthetic data first and inspect costs before provisioning.

`stable`, `latest` and `current` documentation URLs intentionally follow their publishers. Record exact tool/adapter versions in each project, review migration notes, and recheck these sources before changing implementation examples. No scraped publisher text or video transcript is bundled by this roadmap change.
