# Learning roadmap

The `#roadmap` route extends the existing workshop interface with 24 sequential, expandable milestones. Existing learning tracks remain available at `#path`; the mobile quick navigation leads to the roadmap. All milestones stay open: ordering is guidance, not an enforced prerequisite graph.

Each point explains its purpose, topics, expected capability, suggested build exercise and publisher sources. Learners choose Not started, Pending, Learning or Done and can record evidence or their next action. Search matches title, summary and topics; status filtering narrows the displayed sequence. Original milestone numbers remain stable under filtering.

## Persistence and sync

Status uses `Progress.notes['roadmap.status:'+id]`; evidence uses `Progress.notes['roadmap.evidence:'+id]`. Stable content IDs preserve state if titles change. Missing or unrecognized status defaults to Not started. Explicitly resetting status writes Not started rather than deleting it, so a subsequent merge preserves the reset under the existing local-wins policy.

No progress schema migration or D1 migration is required. Existing local persistence, JSON export/import, account snapshots and optional Drive backups carry the notes map. Cloud sync remains explicit save/load. As with other notes, a conflict merge keeps this device's value for the same key; selecting the account snapshot replaces it. Evidence is limited to 10,000 characters by the editor, below the existing 20,000-character per-note validation limit. Marking Done awards no XP and claims no independently verified proficiency.

## Content boundaries

Resources are learning links, not indexed RAG evidence. No remote pages or videos are silently scraped. Internal practice links navigate within the same app; publisher links open separately. Suggested external build work is not executed by the roadmap. The source review and freshness caveats are in [ROADMAP_SOURCES.md](ROADMAP_SOURCES.md).

## Validation

Unit tests cover backup round-trip, cloud merge, explicit reset, legacy empty progress, unique milestone IDs, source URL shape and substantive exercise fields. Existing SQL, cloud and citation tests remain part of the suite. Visual and interaction verification is recorded separately from these contract checks.

### Release checks — 9 November 2026

- TypeScript compilation, all 23 Vitest tests and the production client/Worker build passed. Existing large-bundle/PGlite externalization warnings remain; no new dependency was added.
- Deployed application source: `8b6449d9c94c26fcf7cf916acba72d539e5bc1ba`. The native Sites operation reported successful private publication with the existing access policy preserved.
- The signed-in production browser opened and expanded a milestone; a Pending status and evidence note survived reload. QA values were restored to Not started and empty afterward. Existing 200 XP progress was preserved. Search returned matching architecture points, and the Done filter displayed the explicit empty state.
- No horizontal overflow at 320, 390, 768 or 1440 pixels in the tested light/dark states. Captures: `qa/roadmap-light-390.jpg` and `qa/roadmap-dark-1440.jpg`. No browser error logs were recorded during the production check.
- Local preview was unreachable from the in-app browser, so interaction/render checks used the private deployed app. No physical Android, screen-reader or new automated accessibility scan was performed in this change. Unit tests verify roadmap backup/merge compatibility; a new live cross-device cloud sync cycle was not performed.
- Independent screenshot/source review returned **ship** for the two reviewed captures. It found no material visual/usability blocker and confirmed use of the incumbent design tokens. Its scope excludes independent lower-page rendering, measured contrast, keyboard and screen-reader testing; no automated design detector ran. Preserve `DESIGN.md` and its tokens for this extension.
