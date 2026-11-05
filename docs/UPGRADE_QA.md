# Version 0.2 verification — 2026-11-06

## Observed passes

- TypeScript build and18 Vitest tests. SQL regression still executes30 solutions ×3 datasets ×2 engines.
- Production browser suite:22 tracks with source links,15 credential paths with cost filtering,13 project briefs and5 extended career guides, learning-status persistence, dark-theme persistence, multi-select/sequence controls, and retrieval of source excerpts.
- No horizontal page overflow at320,390,1440 px for8 upgraded routes in both themes. Axe WCAG2 A/AA checks at390px across those routes: zero violations after dark bottom-nav contrast repair. `qa/upgrades-report.json`.
- Real Pyodide execution in a worker: deduplication reference code passes exercise assertions. The other two exercise contracts are authored but their browser acceptance tests were not independently executed during this upgrade.
- A real PDF fixture was rendered, uploaded, parsed with PDF.js and its distinctive text retrieved and preserved after reload. `scripts/pdf-qa.mjs` reproduces this check.
- Tutor server contract tests pass with a mock compatible provider: invalid origins denied403, invalid payload rejected400, grounded provider response accepted, out-of-range citation rejected502. This test does not establish real-model answer quality.
- Docker Compose parses the three-node Kafka configuration. Docker daemon is not running, so startup, readiness, replication and failover are unverified.
- Independent screenshot reviewer returned ship after recapturing settled dark certification colors. Review covered required home and new mobile views; animations and integrations were not certified by screenshots.

## Editorial evidence

81 existing questions had choice wording revised. Correct-choice length >1.5× average distractor length fell from81/104 to0/104 in the original bank. Question prompts, explanation arrays and correct option identities were preserved. Runtime option shuffling keeps option/answer/explanation alignment. Length balance reduces a cue; it does not prove a question's psychometric quality. See QUESTION_EDITORIAL_AUDIT.md.

New content:2 automation tracks,18 questions,6 guides,14 resource links including2 official PDFs,5 detailed career projects;15 official credential entries. Free completion certificates, free skills assessments and paid certification exams are differentiated. Verification dates and primary links are embedded in content.

## Setup-dependent boundaries

Google Drive snapshot API code is implemented but no Google OAuth client ID was supplied; real consent and two-device save/load remain unverified. Tokens remain in session memory. Sync appends private snapshots and requires an explicit merge/replace choice on loading; no background sync or automatic document-folder crawler is advertised.

No Ollama binary/model was installed on the computer. Generative tutor integration is implemented and tested through a mock; real Llama inference and citation support require local setup and evaluation. Llama3.1:8b is the default local starting point; Llama3.3:70b and hosted compatible endpoints are configurable. The model never establishes SQL correctness.

PDF/text imports persist in browser IndexedDB and not synchronized. Python is trusted-user browser execution, not a hostile-code sandbox. Python runtime assets are downloaded on demand and do not have an offline guarantee. Native desktop/Android packaging remains deferred until explicit user satisfaction.

## Known limits

Drive snapshot merge gives this device precedence for conflicting notes, drafts, status labels, settings and review schedules. Snapshot pruning is manual. PDF extraction needs selectable text and has bounded size/page limits. Lexical retrieval can miss semantic matches; embeddings, reranking and persistent document storage remain later enhancements. Citation-number checking does not establish semantic entailment. Private-network browser policy can block a hosted HTTPS page from reaching localhost; run the app locally or provide an authenticated HTTPS companion endpoint for phone use.

Physical Android, TalkBack, a real Drive OAuth client, actual Llama quality and Docker failures remain required external checks. No claim of guaranteed certification success, employment, universal source coverage or zero bugs.

