# Dataforge

An Android-friendly data engineering practice app. Built with React, TypeScript, Vite, SQLite/sql.js and PostgreSQL/PGlite. The current release runs locally in the browser and can be installed as a PWA on supported Android browsers.

## Included

- 20 learning tracks and 104 original multiple-choice questions, with explanations for every alternative.
- 30 executable SQL challenges in two genuine engines: SQLite and PostgreSQL. Four depths: Foundations, Intermediate, Advanced, Professional.
- Eight dialect choices. MySQL, BigQuery, Snowflake, SQL Server/T-SQL, DuckDB and Spark SQL are clearly labeled study references, not fake engine modes.
- Three seeded datasets per SQL submission, typed result comparison, duplicate preservation, ordering when required, and counterexample rows.
- 40 field-guide entries, 77 external primary-source resources, bookmarks, personal notes, and local keyword search.
- Six incident simulations containing 18 decisions, plus eight external capstone build briefs with saved checklists.
- Daily sessions, spaced review, unique-solve XP, streaks without penalties, milestones, local query drafts, and validated JSON progress backups.
- Versioned offline cache including both engines, self-hosted fonts and icons, responsive navigation and reduced-motion support.

## Run

Use Node 22+ and pnpm. The committed lockfile pins the resolved versions.

```powershell
pnpm install
pnpm dev
```

```powershell
pnpm test
pnpm build
pnpm preview
```

Direct runtime equivalents, useful on this Windows host:

```powershell
node node_modules/typescript/bin/tsc -b
node node_modules/vitest/vitest.mjs run
node node_modules/vite/bin/vite.js build
node scripts/offline.mjs
node node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 4173
```

The browser suite requires installed Chrome:

```powershell
$env:QA_URL='http://127.0.0.1:4173'
node scripts/browser-qa.mjs
node scripts/offline-qa.mjs
```

## Android use

Open the deployed HTTPS URL in Chrome, sign in if the private hosting gate requests it, then use Chrome's **Add to Home screen / Install app** action if available. Stay online for the initial asset cache (approximately 18 MB uncompressed, principally PostgreSQL). Subsequent local practice can work offline. Private hosting authentication and actual Android installation still require device verification; desktop mobile emulation is not a physical-device test.

Progress belongs to this browser and origin. It does not synchronize between phone and desktop. Export from Settings regularly, especially before clearing browser data, changing domains, or switching devices. Offline content is readable by someone with access to the same device/browser profile.

## Where to edit

- `src/content/curriculum.ts`: tracks, authored questions, guides, incident decisions, capstones.
- `src/content/sql.ts`: challenge contracts, solutions, schema, seeded datasets, dialect references.
- `src/content/resources.ts`: external reading library.
- `src/lib/grading.ts`: typed multiset comparison and evidence-based diagnostics.
- `src/sql.worker.ts`: disposable SQL engines; `src/lib/runner.ts`: cancellation/deadline controller.
- `src/lib/progress.ts`: scheduling, unique rewards, backup validation.
- `src/views/`: separate functional screens; `src/shared.tsx`: shared UI; `src/style.css`: design tokens and responsive composition.
- `scripts/offline.mjs`: build cache manifest and service worker.

Keep content IDs stable across updates or migrate saved progress explicitly. Run the content tests and both SQL engines when changing exercises. New questions need primary sources, a correct answer, an explanation of every choice, a concrete scenario, and human editorial review. Do not market the bank as exhaustive or externally certified.

## Design and architecture

Read [the research](docs/RESEARCH.md), [system architecture](docs/ARCHITECTURE.md), [design system](DESIGN.md), [product contract](PRODUCT.md), and [QA evidence](QA_REPORT.md).

The planned server architecture covers authenticated progress sync, a cited RAG tutor, versioned ingestion, retrieval evaluation, provenance and permissions, isolated Python/SQL runners, observability, and production rollout. The current field guide is deterministic keyword retrieval, **not generative RAG**. There is no connected LLM API, cloud database, remote sandbox or account system in this release. No API keys are needed or accepted by the client. Future credentials belong in server-side secret storage.

## Deployment and rollback

`.openai/hosting.json` binds this project to its existing private Sites project. Preserve the project ID and audience. Build and verify locally, synchronize the exact source through the Sites source helper, package `dist` plus the hosting manifest, then deploy that saved version. Do not create a second Site for updates. Roll back by deploying a previously successful saved version, preserving browser-local progress schema compatibility.

The bundled PostgreSQL build emits upstream Vite warnings concerning conditional Node filesystem branches and Emscripten eval. The browser path was tested in production mode; Node filesystem adapters are not invoked. This is not an audited hostile multi-user execution service. Workers have a 30-second parent deadline and 2,000 returned-row cap; mobile memory exhaustion remains possible for malicious queries.

## Release boundaries

Finite fixture equality is not proof of SQL equivalence. Local answers and fixtures are inspectable. No competitive anti-cheat guarantees, professional certification, universal correctness guarantee, or zero-bug claim. External documentation may evolve. Links do not imply affiliation or permission to redistribute third-party exercises.
