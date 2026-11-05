# Dataforge QA report

Date: 2026-11-05 (Asia/Manila). Environment: Windows, Node 24.22.1, Chrome through Playwright 1.64.1. Production preview: http://127.0.0.1:4173. Source and test scripts are included in this checkout.

| Requirement | Status | Evidence |
|---|---|---|
| Type safety | PASS | `node node_modules/typescript/bin/tsc -b` |
| Production build | PASS | Vite 6.4.5 build; `qa/build.log`; cache generator completed |
| Unit/content contracts | PASS | 13 Vitest tests, including 20 tracks / 104 questions / 40 guides / unique IDs / aligned answer explanations |
| SQL reference validity | PASS | 30 reference queries × 3 datasets × 2 real engines = 180 executions in automated tests |
| SQL feedback | PASS | Browser: correct query, incorrect rowset, schema error, three-fixture pass, both engines; `qa/browser-report.json` |
| Engine read-only guards | PASS | Automated SQLite and PostgreSQL mutation rejection; one statement per learner execution |
| Quiz learning flow | PASS | Selection, feedback, explanation for each option, persisted attempt on reload |
| Knowledge tools | PASS | Guide search, saved notes, resource search/bookmark filter, incident decision feedback, project checklist |
| Responsive layout | PASS | Browser overflow checks at 320, 390, 768, 1440 CSS pixels; screenshots `qa/home-*.png` and SQL screenshots |
| Automated accessibility | PASS | Axe WCAG 2 A/AA + 2.1 AA tags on ten main screens, zero violations in `qa/accessibility.json` |
| Offline | PASS | Offline reload and real PostgreSQL/SQLite execution, `qa/offline-report.json` |
| Cancellation/recovery | PASS | Unbounded recursive SQLite query cancelled; next query succeeds |
| Backup | PASS | Export, malformed import rejection, valid replacement confirmation and restore |
| Reward/scheduling integrity | PASS | Duplicate/assisted XP checks; due intervals; due/unseen priority |
| Visual inspection | PASS with noted scope | Taste inspector 0 FAIL, 2 WARN. Independent reviewer found a tablet line-break issue; fixed and recaptured; independent reviewer scored the sole material finding resolved and returned ship (tablet correction scope). |
| Physical Android / installed PWA | UNVERIFIED | Mobile viewport/touch emulation is covered, real phone installation and private gate behavior require device testing. |
| Screen-reader / inclusive user study | UNVERIFIED | Semantic controls and automated accessibility checked; no TalkBack session or user study. |
| Field performance / slow mobile memory | UNVERIFIED | No field Core Web Vitals or low-memory device benchmark; WASM engine download dominates initial assets. |
| Cloud sync / LLM / server auth | N/A | Not implemented. Hosting privacy gate is separate from app accounts. |

## Fixes from verification

- Raised sub-11px text and darkened mobile navigation, calendar labels, resource domains, incident labels and milestone text.
- Added shrinkable SQL challenge browser container to eliminate tablet horizontal overflow.
- Preserved the daily mission headline line break at tablet width.
- Fixed offline static-cache matches for preview responses containing `Vary: Origin`; versioned same-origin asset lookup ignores Vary.
- Genuine engine execution remains separate from six reference-only dialect roadmaps.

## Limits and accepted warnings

The personal-home heading intentionally uses 36px on desktop and 31px on mobile. Compact metadata uses 11–12px; question and learning body copy uses 13–16px. Taste warnings are recorded, not presented as universal usability proof. The impeccable binary was unavailable because its engine was not installed; independent screenshot review and the functioning taste/browser checks were used. The finished artifact is a tested personal-learning first release, not a complete multi-user cloud platform.

Upstream PGlite bundles produce Node-branch and eval warnings during Vite bundling. Actual production-browser runs of both engines passed. A worker deadline does not impose an OS memory quota. External sources were selected and key links researched; there is no claim that every external page was exhaustively audited or that the original question bank has had independent subject-matter certification.

## Operations

Content editing, build commands, Android usage, backup behavior and rollback are in README.md. No client secrets. Preserve `.openai/hosting.json` and stable content IDs. Cloud/RAG work must pass the separate evaluation, authentication and sandbox gates in docs/ARCHITECTURE.md before being labeled live.

