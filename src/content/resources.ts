import {automations} from './expansion';
/**
 * Curated primary-source reading library, reviewed 2026-11-05.
 * These are links with original summaries, not redistributed copies of sources.
 * Level is our suggested starting depth, not the publisher's certification.
 * External labs may require accounts or paid infrastructure; reading is separate.
 */
export type LearningResource = {
  id: string;
  title: string;
  track: string;
  level: 'Foundations' | 'Intermediate' | 'Advanced' | 'Professional';
  kind: 'Documentation' | 'Course' | 'Book' | 'Practice';
  url: string;
  description: string;
};

export const resources: LearningResource[] = [
  {
    id: 'sql-cs50', title: 'CS50: Introduction to Databases with SQL', track: 'sql', level: 'Foundations', kind: 'Course',
    url: 'https://cs50.harvard.edu/sql/',
    description: 'Harvard OpenCourseWare with lectures, problem sets, and a final project covering querying, relationships, database design, and optimization. Course material is openly available; certificates are separate.',
  },
  {
    id: 'sql-postgres-tutorial', title: 'PostgreSQL: the relational tutorial', track: 'sql', level: 'Foundations', kind: 'Practice',
    url: 'https://www.postgresql.org/docs/current/tutorial.html',
    description: 'Work through tables, queries, joins, aggregates, views, foreign keys, and transactions with the PostgreSQL project itself. A practical first route into relational thinking.',
  },
  {
    id: 'sql-sqlite-language', title: 'SQLite language reference', track: 'sql', level: 'Foundations', kind: 'Documentation',
    url: 'https://www.sqlite.org/lang.html',
    description: 'The authoritative map of SQLite statements, expressions, date functions, CTEs, and window functions. Use it to distinguish supported syntax from another engine\'s dialect.',
  },
  {
    id: 'sql-postgres-language', title: 'PostgreSQL SQL language', track: 'sql', level: 'Intermediate', kind: 'Documentation',
    url: 'https://www.postgresql.org/docs/current/sql.html',
    description: 'A structured reference for SQL syntax, constraints, data types, queries, functions, indexes, and tuning. Follow it after the tutorial or jump to a specific topic.',
  },
  {
    id: 'sql-mysql-language', title: 'MySQL 8.4 SQL statements', track: 'sql', level: 'Intermediate', kind: 'Documentation',
    url: 'https://dev.mysql.com/doc/refman/8.4/en/sql-statements.html',
    description: 'Native MySQL statement syntax, including data definition, manipulation, transactions, and administration. Compare its behavior with PostgreSQL rather than assuming the dialects are interchangeable.',
  },
  {
    id: 'sql-duckdb-language', title: 'DuckDB SQL introduction', track: 'sql', level: 'Intermediate', kind: 'Documentation',
    url: 'https://duckdb.org/docs/stable/sql/introduction',
    description: 'Learn the analytical SQL engine\'s query language and follow its statement and function references. Useful for local analytics and a later file-oriented practice environment.',
  },
  {
    id: 'sql-bigquery-language', title: 'BigQuery GoogleSQL query syntax', track: 'sql', level: 'Advanced', kind: 'Documentation',
    url: 'https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax',
    description: 'The GoogleSQL reference for SELECT, joins, arrays, subqueries, windows, and QUALIFY. Reading the reference does not provision a BigQuery execution account.',
  },
  {
    id: 'sql-snowflake-language', title: 'Snowflake SQL reference', track: 'sql', level: 'Advanced', kind: 'Documentation',
    url: 'https://docs.snowflake.com/en/sql-reference',
    description: 'Snowflake references for commands, types, functions, identifiers, transactions, and three-valued logic. Use the linked command sections to verify warehouse-specific syntax.',
  },
  {
    id: 'sql-tsql-language', title: 'SQL Server Transact-SQL reference', track: 'sql', level: 'Advanced', kind: 'Documentation',
    url: 'https://learn.microsoft.com/en-us/sql/t-sql/language-reference',
    description: 'Microsoft\'s entry point to T-SQL statements and functions. Learn the dialect used by SQL Server and related Microsoft data services, with applicability noted per feature.',
  },
  {
    id: 'sql-spark-language', title: 'Apache Spark SQL reference', track: 'sql', level: 'Advanced', kind: 'Documentation',
    url: 'https://spark.apache.org/docs/latest/sql-ref.html',
    description: 'Spark SQL syntax, data types, NULL semantics, functions, identifiers, and ANSI behavior. Pair language study with distributed execution plans and the Spark track.',
  },
  {
    id: 'sql-postgres-windows', title: 'PostgreSQL window functions', track: 'sql', level: 'Intermediate', kind: 'Documentation',
    url: 'https://www.postgresql.org/docs/current/tutorial-window.html',
    description: 'Understand PARTITION BY, window ordering, and calculations that preserve individual rows. Practice ranking and running totals while checking the result grain.',
  },
  {
    id: 'sql-postgres-explain', title: 'Reading PostgreSQL execution plans', track: 'sql', level: 'Professional', kind: 'Documentation',
    url: 'https://www.postgresql.org/docs/current/using-explain.html',
    description: 'Read scans, joins, costs, and measured execution with EXPLAIN. Learn to compare estimates with actual work instead of guessing that a rewrite is faster.',
  },
  {
    id: 'python-tutorial', title: 'The Python tutorial', track: 'python', level: 'Foundations', kind: 'Documentation',
    url: 'https://docs.python.org/3/tutorial/',
    description: 'Official introduction to Python data structures, control flow, functions, modules, exceptions, and environments. It assumes some programming familiarity, so take the beginner app lessons first if needed.',
  },
  {
    id: 'python-itertools', title: 'Memory-aware iteration with itertools', track: 'python', level: 'Intermediate', kind: 'Documentation',
    url: 'https://docs.python.org/3/library/itertools.html',
    description: 'Compose iterator operations for streaming and batching data without eagerly building every intermediate list. Read each iterator\'s consumption behavior carefully.',
  },
  {
    id: 'python-unittest', title: 'Python unit tests and fixtures', track: 'python', level: 'Intermediate', kind: 'Documentation',
    url: 'https://docs.python.org/3/library/unittest.html',
    description: 'Learn test cases, assertions, setup, cleanup, and test discovery. Apply these tools to parsers, transformations, and failure-handling code.',
  },
  {
    id: 'python-logging', title: 'Python logging HOWTO', track: 'python', level: 'Intermediate', kind: 'Documentation',
    url: 'https://docs.python.org/3/howto/logging.html',
    description: 'Choose useful log levels and configure loggers, handlers, and formatting. Replace unexplained print statements with diagnostic events that help investigate a failed pipeline.',
  },
  {
    id: 'git-pro-git', title: 'Pro Git', track: 'git', level: 'Foundations', kind: 'Book',
    url: 'https://git-scm.com/book/en/v2',
    description: 'The complete openly available book by Scott Chacon and Ben Straub, hosted by the Git project. Progress from commits and branches to collaboration and internals.',
  },
  {
    id: 'git-tutorial', title: 'Git command-line tutorial', track: 'git', level: 'Foundations', kind: 'Practice',
    url: 'https://git-scm.com/docs/gittutorial',
    description: 'A hands-on introduction to recording changes, inspecting history, branching, and collaborating. Practice in a disposable repository before using destructive recovery commands.',
  },
  {
    id: 'git-actions', title: 'GitHub Actions: workflows, jobs, and runners', track: 'git', level: 'Intermediate', kind: 'Documentation',
    url: 'https://docs.github.com/en/actions/get-started/understand-github-actions',
    description: 'Understand how repository events trigger automated jobs and steps. Use CI to run content validation, SQL fixture tests, and pipeline tests on every change.',
  },
  {
    id: 'linux-ubuntu-cli', title: 'The Linux command line for beginners', track: 'linux', level: 'Foundations', kind: 'Practice',
    url: 'https://ubuntu.com/desktop/docs/en/latest/tutorial/the-linux-command-line-for-beginners/',
    description: 'Canonical\'s guided introduction to terminals, paths, files, commands, and pipes. Work through the exercises in a Linux environment rather than memorizing command names.',
  },
  {
    id: 'linux-bash-pipelines', title: 'Bash pipelines and exit status', track: 'linux', level: 'Intermediate', kind: 'Documentation',
    url: 'https://www.gnu.org/software/bash/manual/html_node/Pipelines',
    description: 'Understand how commands connect through pipes and how pipefail changes failure detection. Essential when a shell pipeline appears successful despite an upstream error.',
  },
  {
    id: 'linux-coreutils-sort', title: 'GNU sort: keys, ordering, and large files', track: 'linux', level: 'Intermediate', kind: 'Documentation',
    url: 'https://www.gnu.org/software/coreutils/manual/html_node/sort-invocation.html',
    description: 'Learn numeric versus lexical sorting, field keys, unique output, locale effects, and temporary storage. Useful for inspecting data files and avoiding misleading shell results.',
  },
  {
    id: 'apis-http', title: 'How HTTP works', track: 'apis', level: 'Foundations', kind: 'Documentation',
    url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview',
    description: 'Mozilla\'s overview of requests, responses, headers, intermediaries, and the client-server model. Build the protocol foundation before implementing API ingestion.',
  },
  {
    id: 'apis-pagination', title: 'GitHub REST API pagination', track: 'apis', level: 'Intermediate', kind: 'Documentation',
    url: 'https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api',
    description: 'A concrete production API example of following pagination links and changing page size. Learn why fetching one successful response may still leave most records unread.',
  },
  {
    id: 'apis-requests', title: 'Python Requests quickstart', track: 'apis', level: 'Foundations', kind: 'Practice',
    url: 'https://requests.readthedocs.io/en/latest/user/quickstart/',
    description: 'Make requests, pass parameters, inspect responses, and handle timeouts and errors with the library\'s own guide. Extend the examples with bounded retries and tests.',
  },
  {
    id: 'apis-openapi', title: 'OpenAPI specification', track: 'apis', level: 'Advanced', kind: 'Documentation',
    url: 'https://spec.openapis.org/oas/latest.html',
    description: 'The formal contract language for HTTP APIs: paths, operations, schemas, responses, and security requirements. Use it to read and design explicit ingestion interfaces.',
  },
  {
    id: 'formats-csv', title: 'CSV parsing and dialects in Python', track: 'formats', level: 'Foundations', kind: 'Documentation',
    url: 'https://docs.python.org/3/library/csv.html',
    description: 'Handle quoting, delimiters, newlines, and dictionary rows with the standard library. Learn why splitting every line on a comma is not a reliable CSV parser.',
  },
  {
    id: 'formats-parquet', title: 'Apache Parquet overview', track: 'formats', level: 'Intermediate', kind: 'Documentation',
    url: 'https://parquet.apache.org/docs/overview/',
    description: 'Understand the column-oriented storage format and navigate its specification and implementations. Separate a file format from the table-management layer built above it.',
  },
  {
    id: 'formats-avro', title: 'Apache Avro schema and format specification', track: 'formats', level: 'Advanced', kind: 'Documentation',
    url: 'https://avro.apache.org/docs/1.12.0/specification/',
    description: 'Explore records, unions, logical types, binary encoding, and schema resolution in this versioned specification. Useful for event contracts and schema evolution.',
  },
  {
    id: 'formats-arrow', title: 'Apache Arrow columnar format', track: 'formats', level: 'Advanced', kind: 'Documentation',
    url: 'https://arrow.apache.org/docs/format/Columnar.html',
    description: 'Study the in-memory columnar representation, buffers, validity information, and serialization. Compare Arrow\'s interchange role with Parquet\'s storage role.',
  },
  {
    id: 'modeling-kimball', title: 'Kimball dimensional modeling techniques', track: 'modeling', level: 'Intermediate', kind: 'Documentation',
    url: 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/',
    description: 'The original practitioners\' catalog of facts, dimensions, snapshots, conformed dimensions, and historical-change techniques. Use it as a structured modeling reference.',
  },
  {
    id: 'modeling-grain', title: 'Declare the grain first', track: 'modeling', level: 'Foundations', kind: 'Documentation',
    url: 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/grain/',
    description: 'A concise explanation of what one fact-table row represents. Practice stating that contract before choosing dimensions, measures, and join keys.',
  },
  {
    id: 'modeling-scd2', title: 'Slowly changing dimensions: Type 2', track: 'modeling', level: 'Advanced', kind: 'Documentation',
    url: 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/type-2/',
    description: 'Understand preserving dimension history by adding rows. Apply the idea to effective dates, surrogate keys, and joining a fact to the correct historical version.',
  },
  {
    id: 'ingestion-debezium-tutorial', title: 'Debezium change-data-capture tutorial', track: 'ingestion', level: 'Intermediate', kind: 'Practice',
    url: 'https://debezium.io/documentation/reference/stable/kc-tutorial.html',
    description: 'Follow a CDC workflow and observe change events rather than treating ingestion as a periodic full copy. The external lab requires its documented runtime setup.',
  },
  {
    id: 'ingestion-debezium-postgres', title: 'Debezium PostgreSQL connector', track: 'ingestion', level: 'Advanced', kind: 'Documentation',
    url: 'https://debezium.io/documentation/reference/stable/connectors/postgresql.html',
    description: 'Study snapshots, streaming changes, event structure, connector configuration, and failure considerations. Use the documented connector version when reproducing behavior.',
  },
  {
    id: 'ingestion-logical-decoding', title: 'PostgreSQL logical decoding concepts', track: 'ingestion', level: 'Professional', kind: 'Documentation',
    url: 'https://www.postgresql.org/docs/current/logicaldecoding-explanation.html',
    description: 'Learn replication slots, WAL decoding, replay, and client responsibilities after crashes. Connect CDC guarantees to the source database\'s actual recovery behavior.',
  },
  {
    id: 'warehouse-bigquery-performance', title: 'BigQuery query computation and cost-aware design', track: 'warehouse', level: 'Advanced', kind: 'Documentation',
    url: 'https://docs.cloud.google.com/bigquery/docs/best-practices-performance-compute',
    description: 'Reduce processed data, inspect execution, and improve joins and query operations. Translate the guidance into hypotheses that you verify on actual workloads.',
  },
  {
    id: 'warehouse-snowflake-partitions', title: 'Snowflake micro-partitions and clustering', track: 'warehouse', level: 'Advanced', kind: 'Documentation',
    url: 'https://docs.snowflake.com/en/user-guide/tables-clustering-micropartitions',
    description: 'Understand how storage organization and metadata support pruning in Snowflake. Compare clustering choices with the filters and data distribution of your workload.',
  },
  {
    id: 'warehouse-redshift-architecture', title: 'Amazon Redshift warehouse architecture', track: 'warehouse', level: 'Intermediate', kind: 'Documentation',
    url: 'https://docs.aws.amazon.com/redshift/latest/dg/c_high_level_system_architecture.html',
    description: 'Trace how clients, the leader node, and compute nodes participate in distributed query execution. Build an MPP mental model before tuning distribution strategies.',
  },
  {
    id: 'warehouse-star-schema', title: 'Star schemas and semantic models', track: 'warehouse', level: 'Intermediate', kind: 'Documentation',
    url: 'https://learn.microsoft.com/en-us/power-bi/guidance/star-schema',
    description: 'Microsoft\'s explanation of facts, dimensions, relationships, and star-schema design for analytical models. Connect warehouse modeling to the experience of downstream analysts.',
  },
  {
    id: 'orchestration-airflow-dags', title: 'Airflow DAGs and task dependencies', track: 'orchestration', level: 'Foundations', kind: 'Documentation',
    url: 'https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html',
    description: 'Understand schedules, tasks, dependencies, and workflow behavior. Read with a small pipeline in mind and explain what should happen when a task fails.',
  },
  {
    id: 'orchestration-airflow-best-practices', title: 'Airflow production best practices', track: 'orchestration', level: 'Advanced', kind: 'Documentation',
    url: 'https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html',
    description: 'Design retry-safe tasks, avoid partial results, and manage communication and dependencies. Apply the guidance to backfills and reruns, not only the happy path.',
  },
  {
    id: 'orchestration-dagster-assets', title: 'Dagster software-defined assets', track: 'orchestration', level: 'Intermediate', kind: 'Documentation',
    url: 'https://dagster.io/docs/guides/build/assets/defining-assets',
    description: 'Explore orchestration centered on the datasets and artifacts a pipeline produces. Compare asset dependencies with a task-oriented workflow model.',
  },
  {
    id: 'quality-dbt-data-tests', title: 'dbt data tests', track: 'quality', level: 'Foundations', kind: 'Documentation',
    url: 'https://docs.getdbt.com/docs/build/data-tests',
    description: 'Assert uniqueness, non-nullness, relationships, and accepted values in transformed data. Think about which business failures each assertion can and cannot detect.',
  },
  {
    id: 'quality-dbt-unit-tests', title: 'dbt unit tests for model logic', track: 'quality', level: 'Advanced', kind: 'Documentation',
    url: 'https://docs.getdbt.com/docs/build/unit-tests',
    description: 'Test transformation logic with controlled inputs and expected outputs, including incremental cases. Distinguish model unit tests from assertions on already-built datasets.',
  },
  {
    id: 'quality-gx', title: 'Great Expectations Core introduction', track: 'quality', level: 'Intermediate', kind: 'Documentation',
    url: 'https://docs.greatexpectations.io/docs/core/introduction/',
    description: 'Learn the project\'s approach to expressing and validating data expectations. Use explicit quality checks to make data assumptions visible and executable.',
  },
  {
    id: 'quality-pandera', title: 'Pandera DataFrame schemas', track: 'quality', level: 'Intermediate', kind: 'Documentation',
    url: 'https://pandera.readthedocs.io/en/stable/dataframe_schemas.html',
    description: 'Define column types and checks for DataFrames. Add validation boundaries around transformations so invalid data fails with actionable evidence.',
  },
  {
    id: 'spark-sql-start', title: 'Spark SQL and DataFrames: getting started', track: 'spark', level: 'Intermediate', kind: 'Practice',
    url: 'https://spark.apache.org/docs/latest/sql-getting-started.html',
    description: 'Create DataFrames, run SQL, and work with structured data using Spark\'s own examples. Requires an external Spark environment for execution.',
  },
  {
    id: 'spark-pyspark-quickstart', title: 'PySpark DataFrame quickstart', track: 'spark', level: 'Intermediate', kind: 'Practice',
    url: 'https://spark.apache.org/docs/latest/api/python/getting_started/quickstart_df.html',
    description: 'Practice DataFrame creation, selection, grouping, and data access in Python. Observe lazy computation and the distinction between local and distributed operations.',
  },
  {
    id: 'spark-performance', title: 'Spark SQL performance tuning', track: 'spark', level: 'Professional', kind: 'Documentation',
    url: 'https://spark.apache.org/docs/latest/sql-performance-tuning.html',
    description: 'Study partitions, statistics, join strategies, caching, and adaptive execution. Diagnose skew and shuffle costs from evidence before changing configuration.',
  },
  {
    id: 'streaming-kafka-design', title: 'Kafka design and delivery guarantees', track: 'streaming', level: 'Advanced', kind: 'Documentation',
    url: 'https://kafka.apache.org/41/design/design/',
    description: 'Understand logs, replication, transactions, offsets, and delivery semantics. Pay attention to the boundary between Kafka guarantees and an external destination\'s behavior.',
  },
  {
    id: 'streaming-flink-time', title: 'Flink event time and watermarks', track: 'streaming', level: 'Intermediate', kind: 'Documentation',
    url: 'https://nightlies.apache.org/flink/flink-docs-stable/docs/learn-flink/streaming_analytics/',
    description: 'Reason about out-of-order events, event time, watermarks, and latency versus completeness. Predict the window output before running a streaming exercise.',
  },
  {
    id: 'streaming-flink-state', title: 'Flink stateful stream processing', track: 'streaming', level: 'Advanced', kind: 'Documentation',
    url: 'https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/stateful-stream-processing/',
    description: 'Learn how stream processors maintain state and recover it consistently. Connect checkpoints and replay to the guarantees required by a downstream system.',
  },
  {
    id: 'streaming-spark-guide', title: 'Spark Structured Streaming guide', track: 'streaming', level: 'Advanced', kind: 'Documentation',
    url: 'https://spark.apache.org/docs/latest/streaming/index.html',
    description: 'Navigate Spark\'s structured-streaming execution model, APIs, and operational guidance. Compare it with batch DataFrames and verify sink-specific guarantees.',
  },
  {
    id: 'lakehouse-iceberg-evolution', title: 'Iceberg schema and partition evolution', track: 'lakehouse', level: 'Advanced', kind: 'Documentation',
    url: 'https://iceberg.apache.org/docs/latest/evolution/',
    description: 'Explore how a table format evolves schemas and partition layouts. Understand why table metadata matters beyond a directory of Parquet files.',
  },
  {
    id: 'lakehouse-iceberg-maintenance', title: 'Iceberg table maintenance', track: 'lakehouse', level: 'Professional', kind: 'Documentation',
    url: 'https://iceberg.apache.org/docs/latest/maintenance/',
    description: 'Learn snapshot expiration, orphan-file cleanup, and data-file rewriting. Treat maintenance as an operational workflow with retention and recovery implications.',
  },
  {
    id: 'lakehouse-delta', title: 'Delta Lake documentation', track: 'lakehouse', level: 'Intermediate', kind: 'Documentation',
    url: 'https://docs.delta.io/',
    description: 'Explore Delta Lake\'s table capabilities, reads and writes, schema handling, and maintenance. Compare guarantees and ecosystem support with other table formats.',
  },
  {
    id: 'cloud-iam', title: 'AWS IAM security best practices', track: 'cloud', level: 'Intermediate', kind: 'Documentation',
    url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html',
    description: 'Use temporary credentials, roles, least privilege, and permission review. Apply these principles to pipeline workloads instead of embedding long-lived keys in code.',
  },
  {
    id: 'cloud-terraform', title: 'Terraform AWS getting-started tutorials', track: 'cloud', level: 'Intermediate', kind: 'Practice',
    url: 'https://developer.hashicorp.com/terraform/tutorials/aws-get-started',
    description: 'Learn infrastructure configuration, plans, state, changes, and cleanup. The reading is public; provisioning the example infrastructure may incur cloud charges.',
  },
  {
    id: 'cloud-docker', title: 'Get started with Docker', track: 'cloud', level: 'Foundations', kind: 'Practice',
    url: 'https://docs.docker.com/get-started/',
    description: 'Follow the official route through images, containers, and development workflows. Build reproducible environments for data tools before moving to orchestration platforms.',
  },
  {
    id: 'cloud-kubernetes', title: 'Kubernetes basics', track: 'cloud', level: 'Advanced', kind: 'Practice',
    url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/',
    description: 'Learn deployment, inspection, scaling, and updates through Kubernetes\' official tutorial. Treat it as an operational option rather than a prerequisite for every pipeline.',
  },
  {
    id: 'governance-postgres-rls', title: 'PostgreSQL row security policies', track: 'governance', level: 'Advanced', kind: 'Documentation',
    url: 'https://www.postgresql.org/docs/current/ddl-rowsecurity.html',
    description: 'Restrict rows by policy and understand default-deny behavior and privileged-role exceptions. Test denied access as carefully as permitted access.',
  },
  {
    id: 'governance-openmetadata', title: 'OpenMetadata metadata standards', track: 'governance', level: 'Advanced', kind: 'Documentation',
    url: 'https://docs.open-metadata.org/latest/main-concepts/metadata-standard',
    description: 'Explore schemas for catalog entities, relationships, lineage, quality, and governance. Use metadata as a structured operational asset rather than a collection of informal notes.',
  },
  {
    id: 'governance-purview', title: 'Data governance with Microsoft Purview', track: 'governance', level: 'Intermediate', kind: 'Documentation',
    url: 'https://learn.microsoft.com/en-us/purview/data-governance-overview',
    description: 'A first-party overview of discovery, trust, protection, and governance workflows. Separate the underlying governance responsibilities from a particular vendor\'s product choices.',
  },
  {
    id: 'observability-otel', title: 'OpenTelemetry signals', track: 'observability', level: 'Intermediate', kind: 'Documentation',
    url: 'https://opentelemetry.io/docs/concepts/signals/',
    description: 'Distinguish traces, metrics, logs, and context. Design instrumentation that helps follow a data job across services without collecting unnecessary sensitive payloads.',
  },
  {
    id: 'observability-prometheus', title: 'Prometheus metric types', track: 'observability', level: 'Intermediate', kind: 'Documentation',
    url: 'https://prometheus.io/docs/concepts/metric_types/',
    description: 'Choose counters, gauges, histograms, and summaries for the question you need to answer. Apply them to throughput, failures, queue depth, and latency.',
  },
  {
    id: 'observability-openlineage', title: 'OpenLineage jobs, runs, and datasets', track: 'observability', level: 'Advanced', kind: 'Documentation',
    url: 'https://openlineage.io/docs/spec/object-model/',
    description: 'Understand the event model behind operational data lineage. Trace which execution produced a dataset and how changes propagate to downstream consumers.',
  },
  {
    id: 'reliability-sre-monitoring', title: 'SRE: monitoring distributed systems', track: 'reliability', level: 'Advanced', kind: 'Book',
    url: 'https://sre.google/sre-book/monitoring-distributed-systems/',
    description: 'Google\'s engineering chapter on monitoring, symptoms, and useful alerts. Apply the principles to freshness and correctness as well as infrastructure health.',
  },
  {
    id: 'reliability-sre-slos', title: 'SRE: service-level objectives', track: 'reliability', level: 'Professional', kind: 'Book',
    url: 'https://sre.google/sre-book/service-level-objectives/',
    description: 'Define indicators and objectives from user needs. Practice stating a measurable data freshness or delivery target and the consequences of missing it.',
  },
  {
    id: 'reliability-postmortems', title: 'SRE: learning from incidents', track: 'reliability', level: 'Professional', kind: 'Book',
    url: 'https://sre.google/sre-book/postmortem-culture/',
    description: 'Learn a blameless approach to incident analysis and follow-up actions. Write evidence-based postmortems that improve systems and operating practices.',
  },
  {
    id: 'architecture-azure-data', title: 'Choosing database architectures', track: 'architecture', level: 'Advanced', kind: 'Documentation',
    url: 'https://learn.microsoft.com/en-us/azure/architecture/databases/database-get-started',
    description: 'Microsoft\'s architecture entry point for transactional, analytical, relational, and nonrelational choices. Start with workload and consistency requirements before selecting services.',
  },
  {
    id: 'architecture-aws-framework', title: 'AWS Well-Architected Framework', track: 'architecture', level: 'Professional', kind: 'Documentation',
    url: 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html',
    description: 'Review designs across operations, security, reliability, performance, cost, and sustainability. Use the framework to surface tradeoffs in a capstone architecture.',
  },
  {
    id: 'architecture-google-framework', title: 'Google Cloud Well-Architected Framework', track: 'architecture', level: 'Professional', kind: 'Documentation',
    url: 'https://docs.cloud.google.com/architecture/framework',
    description: 'A second first-party perspective on cloud architecture and operational tradeoffs. Compare recommendations against requirements instead of copying a reference diagram unchanged.',
  },
  {
    id: 'mlops-mlflow', title: 'MLflow experiment tracking', track: 'mlops', level: 'Intermediate', kind: 'Documentation',
    url: 'https://mlflow.org/docs/latest/ml/tracking/',
    description: 'Track runs, parameters, metrics, code versions, and artifacts. Connect reproducible experiments to versioned data inputs and transformation pipelines.',
  },
  {
    id: 'mlops-feast', title: 'Feast feature-store concepts', track: 'mlops', level: 'Advanced', kind: 'Documentation',
    url: 'https://docs.feast.dev/',
    description: 'Understand offline historical features and online serving. Explore how feature definitions and retrieval support production machine-learning systems.',
  },
  {
    id: 'mlops-leakage', title: 'Prevent data leakage in ML pipelines', track: 'mlops', level: 'Intermediate', kind: 'Documentation',
    url: 'https://scikit-learn.org/stable/common_pitfalls.html',
    description: 'Study inconsistent preprocessing, leakage, and reproducibility pitfalls. Practice separating training information from what would actually be available at prediction time.',
  },
  {
    id: 'mlops-pgvector', title: 'pgvector: vector search in PostgreSQL', track: 'mlops', level: 'Advanced', kind: 'Documentation',
    url: 'https://github.com/pgvector/pgvector',
    description: 'Learn vector storage, similarity operators, exact search, and approximate indexes. Evaluate retrieval quality and authorization filters before using search in a RAG system.',
  },
];

resources.push(...automations);

resources.push({id:'sql-postgres-pdf18',title:'PostgreSQL 18 complete manual (PDF)',track:'sql',level:'Advanced',kind:'Documentation',url:'https://www.postgresql.org/files/documentation/pdf/18/postgresql-18-A4.pdf',description:'Official downloadable versioned reference. Read tutorial, query, transaction and index chapters selectively. Large PDF; engine behavior must be matched to your actual PostgreSQL version.'},{id:'architecture-duckdb-wasm-paper',title:'DuckDB-Wasm architecture paper (PDF)',track:'architecture',level:'Advanced',kind:'Documentation',url:'https://duckdb.org/pdf/VLDB2022-kohn-duckdb-wasm.pdf',description:'Original four-page systems paper on analytical SQL in browser workers. Read the architecture and filesystem tradeoffs, then compare them with a server-side execution design.'});
