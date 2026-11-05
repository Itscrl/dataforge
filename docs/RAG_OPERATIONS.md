# Research and synchronization operations

Implementation record: 2026-11-06. This is an executable verification and recovery guide, not a statement that production checks have passed. The hosted account rollout passed signed-in save/load and conflict checks; real Llama inference remains untested because no Llama runtime/model is installed locally. Architecture and API limits are in [RAG_ARCHITECTURE.md](RAG_ARCHITECTURE.md).

## Local startup and model configuration

1. Install project dependencies with `pnpm install --frozen-lockfile`.
2. Copy `.env.example` to an untracked `.env`. Keep provider keys out of `VITE_*`, browser bundles, logs and commits.
3. Start the app with `pnpm dev`. Evidence retrieval and PDF inspection require no companion.
4. For real generation, install Ollama separately and run `ollama pull llama3.1:8b`; use `LLAMA_MODEL` for another installed model. This is a required operator action, not a completed installation.
5. Set `APP_ORIGIN` to the exact browser origin, including port. `LLAMA_PROVIDER=ollama` uses `http://127.0.0.1:11434`; `compatible` needs its `/v1` base and optional `LLAMA_API_KEY`.
6. Start `pnpm tutor` (`node --env-file=.env server/tutor.mjs`). In Connection, check readiness, then explicitly enable transmission of question and selected passages before generating.

Keep loopback binding for a single-machine setup. A phone's loopback points to the phone, so supply a reachable HTTPS companion service with authenticated access and `TUTOR_ACCESS_TOKEN` when binding off loopback. Do not place the model provider key in the browser token field. A healthy HTTP server can report `ready:false`; verify the configured model appears in the provider inventory and supports the requested structured output.

## Verification commands and evidence

Run from the repository root:

```powershell
pnpm test
node scripts/citation-test.mjs
node scripts/tutor-test.mjs
pnpm build
pnpm exec vite preview --host 127.0.0.1 --port 4174
```

With that preview running in another terminal, run `node scripts/research-qa.mjs`. It uses installed Chrome, creates a two-page fixture, checks ingestion/persistence/page rendering and exercises light/dark themes at 1440, 768, 390 and 320 pixels. It checks overflow across existing app routes and accessibility at 390 pixels. Retain the current screenshot scope: `qa/research-{light,dark}-{1440,390}.png`, proof/answer desktop captures and source-library phone capture; results go to `qa/research-report.json`. Older `pdf-qa.mjs` selectors describe the prior tutor UI and are not the current acceptance script.

| Check | What it establishes / limitation |
| --- | --- |
| Vitest `cloud.test.ts` | SQL-backed local account isolation, stale revision rejection, invalid payload and cross-origin rejection; SQL.js substitutes for D1. |
| Citation contract script | Source/page propagation, exact quote matching, invalid/missing citations and abstention; no semantic entailment assessment. |
| Tutor script | Local compatible-provider HTTP wiring and invalid citation rejection using a mock provider; no real Llama inference. |
| Research browser QA | Browser PDF extraction, original physical page rendering, local persistence, responsive UI and a mocked generated answer. |
| Build | TypeScript, client bundle, offline assets and cloud Worker packaging; does not publish or provision production storage. |

For real inference acceptance, check `/health`, ask a question with an indexed PDF passage, verify a bounded structured response, and open every cited original physical page. Confirm unsupported questions abstain. Capture model/version, request ID, duration and pass/fail without retaining private excerpts in operational logs. A quote can match and still fail to support the claim; review meaning and source version separately.

## Static-to-Worker deployment and migration

1. Export a local progress backup and record the current published version, existing private Sites project ID/access policy, hosting manifest and database backup/snapshot capability.
2. Keep `.openai/hosting.json` on the existing project with `d1: "DB"` and without `static:true`. Build output must include `dist/client`, `dist/server/index.js`, `dist/server/wrangler.json`, and `.openai` hosting/migration artifacts.
3. Provision/bind D1 `DB` through the Sites deployment workflow and apply `drizzle/0000_account_progress.sql` before enabling account saves. Check the deployment's real binding; the generated all-zero-style UUID is only a packaging placeholder. `pnpm db:generate` generates migrations, not production provisioning.
4. Publish the complete Worker/ASSETS package to the existing private project. GitHub commits/pushes and Sites publication are independent operations. Keep incremental, descriptive commits with actual validation evidence and mark pending integration checks clearly.
5. Verify the existing sign-in/access policy remains enforced and that the trusted authentication layer owns the user-ID header. Never validate account security by manually supplying a fabricated identity header to a public deployment.
6. Use two signed-in browser/device sessions for account A and a separate account B. A saves a distinctive harmless note, reloads it on the second device and explicitly reviews/merges it. B must not receive A's note. Save from both A sessions against the same revision: one succeeds and the other must receive 409. Verify signed-out 401, oversized 413, missing/wrong Origin 403 and wrong content type 415 where the deployment permits controlled checks.
7. Reload the app and inspect `/api/progress` JSON/content type and revision, plus a normal static route/PDF download. Confirm account responses are not cached and local evidence remains local. Record publication ID/time and check results before calling sync live-verified.

No destructive data conversion is required for the initial table. Keep progress `version:1` compatible with existing validated exports and browser data. For later schema changes, add a migration rather than editing applied SQL; validate old snapshots before rollout. Preserve indexed PDFs and local progress during updates. D1 snapshots contain private learner notes/drafts: apply deployment access controls and a deliberate retention/backup policy; the application has no administrative history or restore UI.

## Rollback and recovery

Prefer rolling back to the last known compatible Worker plus matching ASSETS. Keep the D1 table and user rows intact; do not drop storage to roll back code. Confirm the old client understands progress version 1 and revision handling. If temporarily restoring a static-only release, account API availability is lost: disable expectations of cloud saves, preserve local progress and export it. Restoring an old cloud database snapshot can invalidate clients' remembered revisions; require reload/review before further writes and recover newer local exports explicitly.

The UI does not replace local data on a failed fetch/save. After an incident, export local progress before selecting “Use account snapshot.” “Keep this device” preserves local data but intentionally allows a subsequent explicit save against the loaded revision; it is not an automatic merge. For uncertain data lineage, retain both exports and reconcile attempt IDs and notes before saving. PDFs require their own original-file backup and reimport on each device; progress exports do not contain the evidence store.

## Failure runbook

| Symptom | Diagnosis and recovery |
| --- | --- |
| Account 401 | Sign in through the deployed app; verify trusted header injection/access policy. Never accept a browser-supplied account ID as a fix. |
| Account 503 / HTML instead of JSON | Check Worker routing, D1 binding/table migration and deployment logs. Local Vite previews do not provide account storage. Keep local work and export it. |
| Account 409 | Another device won the revision check. Load latest; review merge/use/keep choices; then explicitly save. Do not retry blindly or bypass the expected revision. |
| Account 413 | Snapshot exceeds 2,000,000 UTF-8 bytes. Export an archive and review large notes/drafts or history; do not silently truncate learner data. |
| Account 400 / 403 / 415 | Validate version-1 progress, exact Origin and JSON content type; preserve the rejected export for diagnosis without logging private content. |
| Retrieval empty / 20-second timeout | Narrow scope/page range, use specific lexical terms and inspect indexed-page counts. Remove unused documents only after preserving originals. No semantic search or whole-book indexing is implied. |
| PDF import fails | Check 35 MB file, at most 500 selected pages, extraction caps, valid page range and browser quota. Scanned PDF needs external OCR; retained PDF pages use physical numbering. |
| Original page fails to render | Open the original Blob link; reimport legacy documents missing bytes. Compare file hash and cited range. Do not manufacture a page image or page number. |
| Tutor unavailable / not ready | Inspect `/health`, model inventory, exact `LLAMA_MODEL`, endpoint/HTTPS, allowed origin and access token. Evidence mode remains usable. |
| Tutor 422 | Model supplied invalid JSON/fields/source index/quote. Preserve request ID and validation stage, inspect source text locally and retry with a supported structured-output model. Never display rejected claims as verified. |
| Tutor 429 / 502 / deadline | One process accepts one generation; wait for completion, check provider availability/load and 120-second deadline. There is no job queue or retry worker. |
| Drive authorization expired | Reconnect the optional OAuth integration; confirm allowed origin, Drive API and appData scope. App-account sign-in does not grant Google Drive access. |
| Offline sync or generation fails | Continue local practice/evidence inspection from retained data. Reconnect and explicitly load/review/save; no background reconciliation exists. Bundled PDF originals are excluded from precache. |

Companion logs are intentionally content-free request metadata. Do not add raw prompt/answer logging for diagnosis. Its `totals` are process-local and reset on restart; there is no metrics backend, distributed rate limit or concurrency queue. Cloud errors are deliberately generic; correlate deployment logs without exposing private snapshot payloads. Establish provider capacity, D1 service quotas and browser-memory budgets for the actual deployment before increasing document or concurrency caps.

## Source collection maintenance

The catalog has six entries; the current downloadable bundle has two unchanged originals, PostgreSQL 18 and Computer Networks open 6.1. The other four downloads were unavailable at acquisition and remain external links. `public/pdfs/manifest.json` records byte size, SHA-256, source, authors, fetch time and license links; `public/pdfs/ATTRIBUTION.txt` carries attribution. Retain each original's internal notices and the corresponding license files when distributing assets. Replacing bytes requires a new digest and review; the same URL does not identify an immutable edition.

Use `scripts/fetch-pdf-library.mjs` only as a deliberate source-maintenance action, then inspect results and notices; a failed fetch must not become an indexed/ready claim. A bundled file is downloadable before indexing and is not automatically added to a learner's IndexedDB. Add selected ranges through Source library and confirm “N of total pages indexed.” The public manuals are references, not exhaustive modern data-engineering coverage or a claim about the version of the SQL engine running in the browser.
