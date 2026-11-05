# Dataforge

Dataforge is an Android-first daily practice workspace for learning data engineering. The current release is a responsive, installable web app with local progress, authored learning material, and SQL execution on the device. It serves learners moving from first principles toward production judgment through short, repeatable sessions.

## Product promise

Make the next useful practice session easy to start, and make its feedback worth reading. Learners recall a concept, apply it, inspect the evidence, and revisit gaps. Practical depth and accurate explanations take priority over decorative gamification. A solved exercise records practice; it does not certify professional proficiency.

## Current experience

- **Today:** a five-question daily mission, actual progress and streak data, suggested SQL challenges, and an incident entry point.
- **Learning path:** 22 open tracks grouped into Foundation, Build, and Operate. The pipeline map connects these stages without locking learners into a sequence.
- **Knowledge practice:** 122 authored questions, explanations, filtered practice, and review scheduling.
- **SQL workbench:** 30 challenges across Foundations, Intermediate, Advanced, and Professional depths. PostgreSQL executes through PGlite and SQLite through sql.js in workers. Eight language choices include these two executable engines and six clearly marked reference curricula. The editor supports saved drafts, schema inspection, sample data, hints, solutions, result inspection, and grading against multiple datasets.
- **Incident room:** six authored simulations with 18 decisions that connect evidence to operational judgment.
- **Field guide and resource library:** 46 local guide entries and 91 curated resources, with search, bookmarks, notes, and source links where provided.
- **Projects:** thirteen portfolio-oriented briefs with local completion checklists.
- **Progress and settings:** attempts, XP, levels, review items, daily goal, personal settings, validated export/import, and local reset controls.

Counts describe the release documented on 2026-11-06; the content modules and rendered counts remain authoritative as the collection changes.

## Core journey

Choose a daily mission or a skill gap → answer a question or execute SQL → inspect the result and explanation → record the attempt → return to due review or a related project. The interface keeps the next action close to the evidence. First use begins with zero activity rather than sample achievements.

## Trust and boundaries

Progress is saved in this browser on this device. Export/import provides a portable backup; authenticated account synchronization uses the hosting platform identity and per-user D1 snapshots with revision conflict checks. Google Drive remains an optional OAuth backup. PDFs stay device-local. Offline access depends on assets and engines having been cached. External resource pages require their own network access.

The Llama tutor retrieves local guide and imported PDF/text excerpts, then can generate structured cited claims through a configured local Ollama or compatible hosted service. Exact source quotes are checked, and physical PDF pages can be rendered for verification. BM25 retrieval runs in a cancellable browser worker. Browser Python executes through Pyodide; it is trusted-user practice, not a hostile-code sandbox. Distributed labs supply local Docker instructions; remote runtimes are not provisioned. Drive OAuth and Llama runtime setup are required. Incident exercises are simulations, not live infrastructure access.

XP, streaks, and completion markers support consistent learning. They must remain tied to recorded activity, with assisted attempts and unique completion rewards handled by the progress model. Never invent leaderboard participants, learner counts, testimonials, or mastery claims.

## Voice and visual direction

Use concrete engineering language, short actionable prompts, and explanations that identify the relevant mechanism. Be encouraging without pressure, inflated promises, or childish reward language. The selected visual direction is a light workshop notebook: a green-grey frame, white working sheet, restrained teal details, warm incident surfaces, and a pipeline-shaped curriculum map. IBM Plex Sans supports reading; IBM Plex Mono identifies code and technical evidence.

## Quality expectations

Keep answer keys, explanations, sources, and SQL fixtures mutually consistent. Preserve honest distinctions between implemented and planned functionality. Validate real SQL outcomes, wrong-answer and error paths, reward idempotence, review scheduling, backup behavior, offline reload, keyboard access, and narrow-screen reflow. Visual checks should include the home and workbench views at phone, tablet, and desktop sizes.

The source of truth for visual values and responsive behavior is `src/style.css`, documented in `DESIGN.md`. `BUILD_NOTES.md` records the implementation contract.

