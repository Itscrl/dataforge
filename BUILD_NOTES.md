# Dataforge build contract

Android-first personal practice app. A usable first release plus researched system design, not a claim to implement every cloud service today.

Primary journey: choose a daily mission → attempt a question or execute SQL → inspect evidence and explanation → record learning → revisit due topics.

Objects: 20 skill tracks, authored questions with option-level explanations, executable SQL challenges, case-study incidents, sourced guide entries, local attempts, review schedules, unique completion rewards, project checklists.
New accounts show zero activity. All dashboard counts derive from content and stored attempts. No fictional learners, rankings, or proficiency claims.

Design alternatives: dark operations console versus light workshop notebook. Choose light framed-sheet (seed 710236810) for daylight phone practice and sustained reading. IBM Plex Sans with Plex Mono for SQL. Green-grey frame, white sheet, teal data, warm neutral learning map. Signature: a pipeline-shaped skill route linking foundation, build, and operate stages. Questions answered: Today—what should I practice? SQL lab—why did my result differ? Path—what should I learn next? Field guide—what evidence explains this? Progress—what have I actually practiced?

Implementation: React/TypeScript/Vite; sql.js SQLite and PGlite PostgreSQL in disposable workers; fixed and seeded fixtures; localStorage progress with validated backups; service worker static cache; no credentials. SQLite and PostgreSQL are genuine executable engines. Other dialects are comparison references, explicitly labelled. Field guide is deterministic local retrieval, not a simulated LLM. Hosted private through Sites when supported.

Release criteria: build/typecheck pass; content contract tests; all reference SQL passes all fixtures; wrong/syntax/timeout paths; reward idempotence; review due logic; mobile overflow and core journey checks; keyboard and accessibility scan; offline reload. Cloud RAG, accounts, synced progress, Python sandboxes, and multi-engine execution are planned in architecture.

