# Career projects: build useful systems and show the evidence

Reviewed 2026-11-06. These are original build briefs and implementation guides, not finished project repositories or a guarantee of employment. A strong submission lets another engineer reproduce its result, inspect a failure, and understand its tradeoffs. The five projects below complement the existing generic pipeline labs with a specific consumer and a defensible data contract.

Each project is local-first so its core can run without a paid cloud account. Cloud deployment is an optional extension after correctness and cost limits are established. Provider access, licenses, free allowances, and pricing can change. Read the linked source terms before collecting data. Do not publish personal records, access tokens, or copied third-party datasets without permission.

## A shared project skeleton

Use Python for collection/validation, DuckDB or PostgreSQL for SQL, and Git for reviewable changes. Pick one orchestrator after the CLI pipeline works. Do not add Kafka, Spark, or Kubernetes merely to make a diagram look larger.

```text
project/
  README.md
  pyproject.toml or requirements.txt
  src/
  sql/
  tests/fixtures/       # small synthetic or redistributable inputs
  manifests/           # source provenance and content hashes
  reports/             # checks, measurements, and demo output
  docs/                # contracts, architecture, runbook, decisions
  data/                # ignored raw/private/runtime data
```

Bootstrap commands for a new local repository:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install duckdb pytest
python -m pip freeze > requirements.txt
git init
```

Record the Python version and pin the versions you actually tested. A lockfile or captured requirements is evidence of the environment, not proof that every future platform works. On Linux/macOS activate the environment with `source .venv/bin/activate`.

Before each commit, run the real tests you wrote:

```powershell
python -m pytest -q
git diff --check
git status --short
```

Use synthetic credentials in documentation. Keep `.env`, `data/`, virtual environments, and private outputs out of Git. Create an `.env.example` containing names and explanations, with no real values.

Minimum evidence for every project:

1. A one-page requirement: consumer, business question, expected grain, freshness, completeness, source rights, and budget.
2. A versioned input manifest: source identifier, retrieval time, source event/issue time when available, content hash, bytes, schema version, permission/license note.
3. Tests for normal input, duplicate delivery, missing data, malformed data, and a recovery boundary.
4. An independent correctness check. Do not compare a query only to itself or to another function with the same bug.
5. A small runbook covering diagnosis, scoped replay, rollback, and proof that repaired output is correct.
6. A five-minute demonstration: show the consumer result, break the pipeline, identify the evidence, repair it, and reconcile the result.

## 1. Transit feed change and quality observatory

**Consumer:** a developer or analyst who relies on a timetable feed. **Question:** can this new feed replace the published one, and what service changed? This project is a data publication gate and change mart, not a passenger arrival prediction system.

Start with the [official GTFS schedule reference](https://gtfs.org/documentation/schedule/reference/) and its [examples](https://gtfs.org/getting-started/example-feed/). Use an authorized agency feed if available, or construct a clearly labeled synthetic Philippine-route example. This guide does not assume the existence of a Philippine transit API or grant permission to scrape an operator's site.

Build sequence:

1. Choose the feed and record its license and publication conditions. Save two input snapshots under content-derived identifiers; never overwrite the first when fetching the second.
2. Preserve GTFS identifiers as strings. `001` and `1` need not be the same key. Read the specification before inferring types from a CSV sample.
3. Separate calendar dates, agency timezone, and timetable times. Some timetable values exceed 24 hours to represent service after midnight; a parser constrained to wall-clock `00:00–23:59` loses that meaning.
4. Run the [canonical GTFS validator](https://gtfs-validator.mobilitydata.org/) on the small sample. Keep its report with the input hash. Use its official interface or supported release instructions; do not invent CLI flags from an old blog post.
5. Add consumer-specific checks: expected service window, orphan stop/trip references, routes unexpectedly absent from the new snapshot, and minimum coverage. A specification-valid feed can still violate your consumer contract.
6. Load validated snapshot tables into DuckDB/PostgreSQL. Model `feed_snapshot`, `route`, `trip`, `stop`, `service_date`, and a change fact with both source snapshot keys.
7. Compute added/removed routes, changed stop sequences, and departure-count changes. Treat route IDs as source-scoped, not globally unique.
8. Publish a manifest or pointer to the last approved snapshot only after checks succeed. A rejected snapshot remains in quarantine, while downstream readers continue seeing the last known good release.

Example relationship check after loading tables:

```sql
SELECT t.trip_id, t.route_id
FROM trips AS t
LEFT JOIN routes AS r ON r.route_id = t.route_id
WHERE r.route_id IS NULL;
```

This should return zero rows for a release whose trip-to-route relationship is required. Add a fixture with an orphan route and prove that the release gate rejects it.

**Acceptance:** leading-zero identifiers survive; extended-hour time parses correctly; a repeated source hash does not create duplicate change records; a failed new feed does not replace the published pointer; a reviewer can reproduce every reported defect from the included small fixture.

**Job evidence:** relational modeling, typed ingestion, source provenance, semantic validation, atomic publication, and rollback. Explain how you distinguish a real service reduction from a feed-coverage problem. Show actual validator output and your extra checks, not a screenshot of a green workflow alone.

**Scope extension:** use orchestration to validate one snapshot/agency at a time. Introduce object storage and cloud scheduling only after measuring size and frequency. Do not pretend a local one-process demonstration proves distributed failover.

## 2. Job-skills demand mart with evidence

**Consumer:** yourself or a career adviser reviewing a defined collection of job descriptions. **Question:** which skills appear in that collection, how do requirements change, and how reliable is the extraction? This is not an estimate of the entire labor market.

Use personal exports you are allowed to process, a licensed dataset, or original synthetic descriptions. Do not automatically scrape job boards or republish job text just because a page is reachable. Store a permission note per source and redact personal contact details.

Build sequence:

1. Create an input CSV with `posting_id`, `source`, `permission_note`, `captured_at`, `title`, `employer`, `location`, and `description`. Start with approximately 30 authorized/synthetic rows, including reposts and changed descriptions.
2. Read it with Python's [CSV library](https://docs.python.org/3/library/csv.html). Validate required fields, encoding, and length bounds. Keep rejected records and reasons outside the published mart.
3. Use a source-scoped stable posting identity and a description hash. Distinguish the logical posting from each observed version. A repeated import should not become another job.
4. Create a versioned skills dictionary: canonical skill, aliases, exclusions, and effective dictionary version. Test token boundaries: Java should not be detected solely because JavaScript appears.
5. For each match, save the source text offsets and the extractor version. Preserve the distinction between required, optional, negated, and ambiguous phrases when the extraction logic supports it. Otherwise label the limitation.
6. Manually label a held-out sample that the dictionary author did not use to tune every rule. Measure precision and recall; publish confusion examples. Adding an LLM before having a reference sample makes improvement hard to establish.
7. Model a fact at posting-snapshot-skill grain. Build dimensions for collection date, source, location, employer, and role category. Do not multiply a skill count by joining to an unconstrained alias table.
8. Report counts with a denominator and window: “12 of 30 collected postings mention SQL,” not “40% of employers need SQL.” Document collection bias and how repeated agency ads were handled.

Example reporting query:

```sql
SELECT skill_id, COUNT(DISTINCT posting_id) AS posting_count
FROM posting_skill
WHERE snapshot_date = DATE '2026-11-01'
GROUP BY skill_id;
```

Adapt the literal to the actual fixture date. If several snapshots of the same posting exist in the selection, decide which observation belongs in the denominator before running the report.

**Acceptance:** every match has an evidence span; duplicate imports do not inflate counts; extraction is evaluated against held-out labels; dictionary changes can be replayed reproducibly; source rights and collection limits are visible.

**Job evidence:** text ingestion, versioned reference data, evaluation, dimensional grain, deduplication, and responsible sourcing. The interesting engineering question is why a count should be trusted, not how many technologies appear in the stack.

**Extensions:** compare [PostgreSQL text search](https://www.postgresql.org/docs/current/textsearch.html) with dictionary matching. Add a retrieval-assisted explanation only after comparing its outputs to the same evaluation sample. Keep source text access controls and deletion behavior explicit.

## 3. Private household receipt and statement reconciler

**Consumer:** a household maintaining a personal spending ledger. **Question:** which expenses reconcile to known transactions, and which need human review? Start with synthetic documents and statements so the public repository is safe to review.

The important boundary is between extracted candidates and trusted financial facts. OCR or LLM output is evidence to validate, not a bank record. Learn [Python Decimal](https://docs.python.org/3/library/decimal.html) and [PostgreSQL numeric types](https://www.postgresql.org/docs/current/datatype-numeric.html) before implementing money calculations.

Build sequence:

1. Generate a synthetic receipt set with document IDs, merchant names, currency, line items, tax, discount, totals, and timestamps. Include an ambiguous date, an incorrect arithmetic total, a duplicate scan, and a corrected receipt.
2. Generate a statement CSV with immutable transaction IDs and integer minor-unit values. Include partial captures, fees, and two same-amount purchases on the same date to defeat simplistic matching.
3. Hash raw documents and record provenance. Keep documents outside the public repository; publish only synthetic fixtures. Avoid logging raw document text or account numbers.
4. Parse fields into a candidate table with source page/region, extractor version, candidate value, and review status. A model confidence score is not calibrated proof of correctness.
5. Normalize money with integer minor units or `Decimal` values constructed from strings. Specify each currency's scale rather than assuming every currency has two decimal places.
6. Validate line arithmetic and currency consistency. Route uncertain or contradictory candidates to a review queue. Never replace an unparseable amount with zero and publish it silently.
7. Match candidate receipts to statement entries using an explicit window and rules. Accept automatically only when the rule is unambiguous. A review decision becomes a versioned event so that corrections remain explainable.
8. Build spending views exclusively from the defined accepted/reconciled state. Reconcile their totals back to accepted statement transactions and publish unresolved counts separately.

Exact-money fixture:

```python
from decimal import Decimal

subtotal = Decimal('0.10') + Decimal('0.20')
assert subtotal == Decimal('0.30')
```

This proves the chosen arithmetic representation for that fixture, not the correctness of tax rules or the whole financial model. Add boundary tests for discounts, negative refunds, and currency mismatches.

**Acceptance:** no binary floating-point discrepancy enters the ledger; uncertain extraction never silently becomes a trusted fact; repeated imports preserve identity; correction history survives rebuilds; the public demonstration contains no real financial documents or live credentials.

**Job evidence:** data privacy, provenance, exact arithmetic, human-in-the-loop quality, audit history, and reconciliation. Interview discussion: how would you change matching rules without silently invalidating prior human decisions?

**Extensions:** local OCR first, then an optional consented provider integration. Before sending documents to any model provider, define retention, permitted fields, and the user's data-sharing choice. Do not make an unverified “all data stays local” claim.

## 4. Philippine weather forecast revision warehouse

**Consumer:** an analyst interested in how forecasts evolve. **Question:** what was forecast at collection time, for which target hour, and how did later vintages revise it? This project is for analysis, not emergency decisions.

Use [Open-Meteo's documented API](https://open-meteo.com/en/docs) and read its [terms](https://open-meteo.com/en/terms). The non-commercial free API and data attribution conditions are distinct from a commercial service agreement. Use official [PAGASA cyclone bulletins](https://www.pagasa.dost.gov.ph/tropical-cyclone/severe-weather-bulletin) as separately attributed documents if needed; the web bulletin page is not a promised JSON API.

A real forecast request for a Manila coordinate can be tried with:

```powershell
curl.exe "https://api.open-meteo.com/v1/forecast?latitude=14.5995&longitude=120.9842&hourly=temperature_2m,precipitation_probability&timezone=Asia%2FManila"
```

Do not schedule this request until the selected use and frequency comply with the current terms. Save the request parameters and response metadata so your analysis knows exactly what was requested.

Build sequence:

1. Start with one location and one scheduled collection. Add Manila, Cebu, and Davao only after validating the schema and request budget. Record coordinates rather than assuming a city label uniquely identifies a grid cell.
2. Preserve every response as a content-hashed raw vintage. Save `received_at`, source metadata, requested variables, units, timezone, coordinates, and forecast target timestamps.
3. Build a fact keyed by location, collection/vintage, target time, and variable. Do not overwrite old vintages when collecting an updated forecast.
4. Normalize timestamps with [timezone-aware Python support](https://docs.python.org/3/library/zoneinfo.html). Check equal array lengths, expected units, missing values, and plausible numeric ranges.
5. Compare the same target hour across vintages. Compute lead time explicitly; do not mix a 2-hour-ahead forecast with a 5-day-ahead forecast without labeling the distinction.
6. Rehearse an outage: the absence of a scheduled response should create a freshness/completeness exception, not a zero-rainfall row. Retain last-known-good output with a stale marker.
7. Add a replay command using saved responses. Replaying a response reproduces processing; it does not recreate what a live API would have returned before you started collecting it. Historical forecast products must be selected explicitly when needed.
8. If adding warning bulletins, save their source URL, issue time, revision, and collection time separately. Keep official warning status distinct from your forecast-derived analysis.

**Acceptance:** old vintages stay queryable; gaps are distinguishable from measured zero; units/timezones are validated; every chart points to source/vintage metadata; the README states attribution, request frequency, and non-emergency-use limits.

**Job evidence:** bitemporal reasoning, API ingestion, slowly changing external data, source provenance, operational freshness, and analytical honesty. An extension can evaluate forecasts against a compatible observation source after defining units, location alignment, and evaluation windows.

## 5. Merchant close with auditable CDC corrections

**Consumer:** a small merchant or finance analyst closing daily sales. **Question:** do sales, captures, refunds, and fees reconcile for a settlement date, including late corrections?

Start from [Debezium's self-contained tutorials](https://debezium.io/documentation/reference/stable/tutorials.html) and [official examples](https://github.com/debezium/debezium-examples). The published tutorials choose compatible components. Pin the versions you actually use; do not combine arbitrary `latest` container tags or copy a historical setup without checking its current instructions.

Build sequence:

1. Specify the business event identities and grains. Sale date, event occurrence time, CDC arrival time, and settlement date are different concepts. Use integer minor units and separate currencies.
2. Generate deterministic fixtures: two partial captures, a failed payment attempt, a late refund, an updated sale, an intentionally duplicated delivery, and a source delete. Define what deleting a source record means for audit and reporting.
3. Run the selected official local tutorial topology. Keep ports bound to loopback where possible and use synthetic credentials. Record your container versions, source schema, and start/stop procedure.
4. Confirm the connector's snapshot, ordering, source-position, delete, and tombstone behavior for your exact connector/version. Do not assume all CDC connectors emit identical records.
5. Retain an append-only change log with source position and event identity. Materialize a current-state table using an explicit tested ordering/conflict rule. Replayed change events should not multiply money.
6. Build a daily settlement mart with exceptions, not only a grand total. A successful scheduler run must not publish a finance close when required source coverage or reconciliation checks fail.
7. Kill and restart a component at an interesting boundary. Record what happened to offsets, source changes, and output. Test an update/delete after initial snapshot completion.
8. Independently recompute expected totals from the synthetic business events. Compare this batch calculation against the CDC-maintained mart. Inspect differences by business key and settlement date.
9. Repair one settlement date without rebuilding every date. Keep the repair inputs, code version, and published result identity in an audit record.

Useful reconciliation shape:

```sql
SELECT sale_id, expected_minor, settled_minor,
       expected_minor - settled_minor AS difference_minor
FROM close_reconciliation
WHERE expected_minor <> settled_minor;
```

You must implement and test the definition of `close_reconciliation`; the query above is a reporting contract, not a prebuilt database supplied by Dataforge.

**Acceptance:** replay does not multiply captures/refunds; deletes have documented behavior; crash/restart does not silently skip logical changes; every published close matches an independent recomputation; an incomplete source interval blocks publication or marks it explicitly provisional.

**Job evidence:** CDC, source ordering, event identity, current-state materialization, finance modeling, operational recovery, and reconciliation. Be precise about exactly-once claims: explain the source, transport, consumer, and sink boundaries separately.

**Local operation:** inspect running services with `docker compose ps` and logs with `docker compose logs --tail=100`. Use the exact compose file and service names from the tutorial you selected. Stop the project with its documented `docker compose down` procedure. Removing volumes can destroy your local lab state; preserve evidence or snapshots before intentional cleanup.

## Automation learning ladder

Automation is useful supporting knowledge for data engineering: connecting services, approvals, dispatch, notifications, and lightweight integration. It does not eliminate data contracts, dimensional modeling, reliable writes, or the need for a suitable bulk compute engine.

| Stage | Learn | Practice | Evidence to keep |
|---|---|---|---|
| First workflow | [n8n Academy](https://learn.n8n.io/), [Zapier Learn](https://learn.zapier.com/), [Make Academy](https://academy.make.com/) | Trigger a synthetic event and map fields into a test sink. | Redacted workflow export, input fixture, expected output. |
| Webhook contract | [n8n Webhook node](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook) | Compare test and published production URLs; authenticate requests; send duplicates. | Contract, correlation ID, duplicate test. |
| Failure handling | [n8n error workflows](https://docs.n8n.io/build/flow-logic/handle-errors-gracefully.md), [Make incomplete executions](https://help.make.com/incomplete-executions) | Fail an action after a sink write, inspect state, recover without another logical write. | Failure log, replay procedure, reconciliation query. |
| Backpressure | [Zapier webhook rate limits](https://help.zapier.com/hc/en-us/articles/29972220283789-Webhooks-by-Zapier-rate-limits) | Simulate 429 and timeout responses; enforce retry and concurrency budgets. | Attempt count, delay timeline, exhausted-work queue. |
| Dataset orchestration | [Dagster partitions/backfills](https://docs.dagster.io/guides/build/partitions-and-backfills), [Prefect retries](https://docs.prefect.io/v3/how-to-guides/workflows/retries), [Airflow best practices](https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html) | Orchestrate one project above as daily partitions; repair three historical partitions. | Fixed inputs, partition outputs, checks, scoped backfill evidence. |

Provider course badges and certificates have separate requirements and availability. A completed workflow tutorial is not automatically a professional certification. Follow the app's certification catalog to the current provider assessment page and check its credential type and cost before enrolling.

## Presenting the portfolio

Make the first page answer: who uses this, what result is published, how it is checked, and how to run the small fixture. Add an architecture diagram and link to a short failure/recovery demonstration. Include a data dictionary, source rights, dependency versions, measured run cost/time, tests, and one honest limitation. A concise project with reproducible evidence is easier to assess than a large screenshot collection with unexplained outputs.

During interviews, explain one alternative you rejected and the concrete constraint behind that decision. Be ready to change the requirement: ten times the volume, a late correction, a second writer, a source deletion, or a user asking to remove their private data. Those changes reveal whether the implementation embodies the underlying engineering principles.

