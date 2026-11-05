# Research workspace and account-sync verification

Date: 2026-11-06, Asia/Manila. Deployed source:20df83eb297839fce1fa1c9f0efb1c2ebaa3e318. Hosting project and audience were preserved.

## Production account sync — verified

Through the signed-in deployed app, the existing learning progress was saved as account revision1. A second tab loaded that cloud snapshot. The first tab saved revision2 without changing the learning payload; the stale second tab's save was rejected with the explicit newer-progress conflict message. The first tab then loaded and applied the account snapshot successfully. Existing local learning progress was preserved.

This establishes live authenticated save/load and stale-write protection in two app tabs, not physical Android or independent-account testing. Unit tests separately cover two user IDs, anonymous denial401, cross-origin denial403, invalid payload400, stale revision409 and successful revision increments using SQLite-backed D1-compatible statements.

## Retrieval and source proof — verified

- 21 Vitest tests pass, including both SQL engines and citation-page chunk boundaries.
- Citation contract checks reject fabricated quotes, missing citations and invalid source numbers. An empty-claim answer can explicitly abstain.
- Tutor HTTP contract checks pass against a mock compatible model. This validates orchestration and response validation, not real Llama factuality.
- A real two-page PDF fixture was imported, persisted in IndexedDB, retrieved on physical page2, and rendered from its original bytes beside the citation. Generated-answer UI was tested with an explicitly mocked structured response validated against that excerpt. Screenshot rendering waits for the actual PDF canvas to finish.
- BM25 runs in a cancellable20-second worker. Context is bounded to five retrieved excerpts, with at most two from one document.
- The six-source catalog distinguishes the two bundled unchanged primary PDFs from four external references whose downloads failed. The app never labels a catalog link as indexed. Live import of the PostgreSQL reference successfully indexed pages1–100 of3156 physical pages in the signed-in browser. Page range and SHA-256 bind each indexed excerpt to its source snapshot.
- The deployed browser also indexed pages1–100 of489 in *Computer Networks: A Systems Approach*, open release6.1. A live PDF-only search for transactions returned PostgreSQL physical page57; opening its source proof rendered that actual retained page (`data-ready=true`) beside the indexed transaction excerpt and SHA-256 prefix `9c6af8d2c8f0eda1`. This production check used the bundled publisher PDF, in addition to the local two-page fixture above.

## Visual and browser checks — verified

The neutral charcoal theme replaces the rejected green surfaces. Browser checks covered all16 routes at320/390/768/1440px in light and dark themes: no horizontal page overflow. Axe WCAG2 A/AA scans on the mobile routes reported zero violations after status/destructive-action contrast fixes. No browser runtime errors were captured in `qa/research-report.json`.

An independent screenshot reviewer returned ship, with no material visual findings in the reviewed research, proof, library and phone captures. Compact metadata and physical-device testing remain usability follow-ups. The unavailable impeccable binary was not presented as a completed automated design check.

The hosting origin is removed from visible setup copy. Browser address bars still show the hosting domain; a custom domain requires the owner's domain and DNS configuration.

## Still not established

- Actual Llama inference: no installed/configured model was available on this machine. The deployed frontend can retrieve and verify sources immediately; generated answers require the companion model service. No mock response is served to real learners.
- Google Drive authorization: optional backup still requires a Google OAuth web client ID and interactive consent. Account cloud sync above works without that integration.
- Cloud PDF/document synchronization: PDF bytes and indexes intentionally stay in each browser; only progress, notes, status labels and drafts synchronize by account.
- Semantic entailment: an exact quote match does not prove the generated claim follows from it, and immutable page proof does not prove the publisher's remote version is unchanged.
- Physical Android/TalkBack, independent accounts and a real multi-device network scenario have not been tested. Desktop/Android packaging remains deferred until the owner approves the experience.

## Reproduction

Run `node node_modules/typescript/bin/tsc -b`, `node node_modules/vitest/vitest.mjs run`, `node scripts/citation-test.mjs`, and `node scripts/tutor-test.mjs`. For the client, build then run Vite preview on4180 and `node scripts/research-qa.mjs`. Account endpoints require the signed-in deployed platform or a local Worker environment with explicitly controlled test identity; static Vite preview correctly does not claim cloud storage.
