---
name: Dataforge
description: A light engineering practice workspace with a framed working sheet.
colors:
  ground: "#eef2f1"
  surface: "#fff"
  raised: "#f5f7f6"
  text: "#182724"
  muted: "#606c68"
  border: "#e1e7e4"
  accent: "#1b6c69"
  positive: "#206b4e"
  negative: "#a43c34"
  action: "#213d32"
  action-hover: "#325647"
  mission: "#f1f5f2"
  incident: "#faf8f3"
  incident-border: "#eae6db"
  navigation-active: "#dde5e1"
  focus: "#47877d"
typography:
  headline:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "36px"
    fontWeight: 600
    lineHeight: 1.22
    letterSpacing: "-1px"
  title:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.22
    letterSpacing: "-0.3px"
  body:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  button:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "13px"
    fontWeight: 500
  code:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "12px"
    lineHeight: 1.8
rounded:
  chip: "4px"
  control: "6px"
  navigation: "7px"
  track: "10px"
  panel: "12px"
  sheet: "16px"
spacing:
  compact: "8px"
  inline: "12px"
  control: "16px"
  panel: "24px"
  sheet: "36px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "10px 17px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  mission:
    backgroundColor: "{colors.mission}"
    rounded: "{rounded.panel}"
    padding: "25px 28px"
  incident:
    backgroundColor: "{colors.incident}"
    rounded: "{rounded.panel}"
    padding: "24px"
  sheet:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sheet}"
    padding: "36px 36px 0"
---

# Design System: Dataforge

## Overview

The selected direction is the **light workshop notebook**, implemented as a framed sheet (seed 710236810). A green-grey navigation rail and top bar form an L around a white working surface. Calm typography and subtle dividers support sustained reading, SQL practice, and evidence inspection.

The interface is a personal tool with real progress data. Its signature is a connected pipeline learning map, supported by a softly tinted daily mission and a warm incident panel. Avoid turning these working surfaces into promotional hero sections.

Key characteristics: restrained color, clear task hierarchy, flat surfaces, compact supporting metadata, and generous space around the current problem.

## Colors

The palette combines cool green-grey structure with forest-green actions and restrained teal technical details. The frontmatter preserves the CSS values; `src/style.css` is the implementation source.

- `ground` surrounds the sheet and fills desktop navigation and the mobile top bar.
- `surface`, `raised`, and `border` establish working surfaces and boundaries.
- `text` and `muted` distinguish primary instructions from context and metadata.
- `accent` identifies selected technical details, links, icons, and native control accents. Primary buttons use the darker `action` color.
- `mission` groups the daily session. `incident` and `incident-border` distinguish simulation entry points without implying an active emergency.
- `positive` and `negative` communicate feedback alongside text and icons. Color alone must not carry the outcome.

## Typography

IBM Plex Sans is locally bundled at weights 400, 500, and 600. IBM Plex Mono is bundled at weight 400 for SQL, logs, and code. Headings use balanced wrapping and a compact 1.22 line-height; body copy starts at 14px/1.5, with longer article text increasing to 15–16px and up to 1.85 line-height.

The personal home headline is 36px on desktop, 32px at 980px and below, and 31px on phones. Compact page headings are 29px, becoming 27px on phones. The daily mission heading is 29px/1.17 by default and adapts by breakpoint. Section headings generally use 16–22px. Metadata is often 11–12px; this is a documented density tradeoff, not a target size for primary instructions. Progress figures use tabular numerals.

## Layout

Desktop navigation is fixed at 228px wide; the main frame offsets by that amount. A 66px top bar sits above the white sheet. The sheet has a maximum width of 1700px, 36px horizontal padding, a 1px border, and a 16px radius. Its outside right and bottom margins are 8px. The main gutter is 24px.

The home mission/stat grid uses `minmax(0,1.8fr) minmax(260px,1fr)`. The pipeline map has three equal stages separated by borders. Content grids typically show three columns. The lower home area uses 1.3fr/1fr. SQL separates challenge selection from the working area until the tablet breakpoint.

- At **1600px and above**, sheet padding increases to 42px 48px and the home grid becomes 2fr/1fr.
- At **1200px and below**, navigation shrinks to 210px; sheet padding becomes 28px 24px; content grids become two columns.
- At **980px and below**, navigation is 190px; the home, pipeline, SQL, incident, progress, and settings areas stack. SQL challenges become a horizontal scroller. The practice aside is hidden. The home mission retains its deliberate headline break.
- At **760px and below**, the desktop rail becomes an expandable menu below a sticky 56px top bar. A fixed five-item bottom navigation includes safe-area padding. The sheet loses its outer border and radius and uses 26px 20px padding. Content grids become one column; primary session actions fill their container.
- At **360px and below**, sheet padding becomes 22px 15px, the menu becomes one column, and SQL editor actions wrap.

Keep horizontal scrolling confined to intentional structures such as SQL results, logs, and the challenge selector. Text and page containers must reflow without viewport overflow.

## Elevation & Depth

The implementation uses no box-shadow vocabulary. Depth comes from tinted regions, 1px borders, and the inset white sheet. Hover states change fill or text color; they do not lift cards. Overlays such as toast feedback use fixed positioning and a dark fill, not decorative shadows.

Motion is limited to 150ms button background transitions, 300ms progress-width changes, and a 1.1s alternating loading indicator. `prefers-reduced-motion: reduce` disables animations, transitions, and smooth scrolling.

## Shapes

Panels use 12px corners; tracks use 10px; controls use 6px; navigation rows use 7px; chips use 4px. The desktop sheet uses 16px corners and becomes edge-to-edge on mobile. Circular stage numbers, avatars, and small status dots serve specific navigational or state roles. Borders and compact radii make panels feel like working sections rather than floating tiles.

## Components

**Buttons.** Primary buttons use the dark action fill, white type, 10px 17px padding, and a 42px minimum height. Hover darkens the visual emphasis with `action-hover`. Secondary buttons are white with a thin border. Text actions use green text and underline on hover. Disabled buttons use 0.52 opacity and a not-allowed cursor. SQL controls deliberately compact at narrow widths; do not assume every control is 44px tall.

**Focus.** Buttons, links, inputs, selects, textareas, and summaries share a visible 3px focus outline with a 3px offset. Preserve it on every interactive extension. The skip link becomes visible when focused.

**Fields.** Inputs and selects are white, bordered, 6px rounded, and at least 42px high. Search fields pair an icon with a borderless internal input. Mobile search rows expand to full width. SQL uses a mono textarea with nearby run, submit, reset, hint, and solution controls; result tabs and tables remain inspectable below it.

**Panels and lists.** Mission and incident panels use their specific tints; most other content is white. Resource entries and challenge rows rely on separators rather than an enclosing card. Guides use readable article widths, and project cards reserve a restrained illustration area for pipeline diagrams.

**Navigation.** Desktop rows are 43px minimum height with an active green-grey fill. Mobile quick navigation provides Today, Path, SQL lab, Practice, and Progress; the expanded menu exposes the broader toolkit. Use icons with text labels, not unlabeled decorative glyphs.

**Pipeline map.** Three clickable stages represent Foundation, Build, and Operate. Each combines a numbered circle, title, supporting topics, and track count. At tablet widths, horizontal separators replace vertical separators as the stages stack.

**Learning feedback.** Explanations, result differences, assistance markers, and source links support learning from an attempt. Use semantic text and icons with state colors. Empty, loading, unavailable-engine, offline, and storage-error states must be explicit.

## Do's and Don'ts

- **Do** preserve the green-grey frame, white working sheet, and calm reading hierarchy.
- **Do** derive progress and completion displays from stored activity.
- **Do** distinguish executable database engines from reference curricula.
- **Do** keep feedback, schema, and explanations close to the active exercise.
- **Do** test deliberate headline breaks and flexible action rows at tablet as well as phone widths.
- **Don't** replace restrained panels with gradients, glass effects, heavy shadows, or repetitive promotional cards.
- **Don't** present reference mode, static guides, or simulated incidents as live services.
- **Don't** remove focus rings, rely on color alone, or make secondary 11px metadata the model for main lesson text.
- **Don't** add invented learner statistics, certification claims, or gamification disconnected from practice.

## Version 0.2 themes and feedback

The optional dark theme lives in src/upgrades.css: ground #16201c, surface #1e2923, raised #26352c, text #e2ebe3, muted #acbcb0, border #3b4b40, accent #94c8ac. System theme follows prefers-color-scheme; explicit light/dark choices persist. Background/color transitions take220ms; answer feedback uses a200ms clip reveal. Reduced-motion disables transitions/animations. Navigation is scrollable with the expanded tools. Dark mobile nav ink #b5c8bb, active #c3efd2. New components include evidence excerpts, resource status selects, certification checklists, Python editor, source-linked track actions and a manual snapshot conflict review.
