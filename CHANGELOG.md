# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-05-07

BBG-fidelity primitive expansion — sixteen new primitives + canvas
presets. The kit's surface now covers most ByteByteGo diagram styles
out of the box (multi-concept reference cards, before/after
comparisons, feature matrices, ER diagrams, radial mind maps,
Venn diagrams, persona/brand chips).

### Added

- `Panel` accepts `variant="solid" | "dashed"`. `dashed` renders a
  dashed border on a transparent background — for loose sub-region
  grouping where the contained cards are the headline.
- `SubPanelGrid` — N-by-M grid of independently-titled `Panel`s for
  multi-concept reference cards.
- `BeforeAfterSplit` — two stacked `Panel`s separated by a labeled
  divider chip with optional directional triangles.
- `ComparisonTable` — feature-matrix table with left-column numbered
  `StepBadge` markers and per-row option cells.
- `FanArrow` — one source -> N targets with shared origin; per-branch
  `debugId`s derived from the parent.
- `TagChip` — tight monospace pill for short uppercase verbs (HTTP
  methods, CRUD verbs, role markers).
- `IconBadge` — colored disc with arbitrary icon node; `solid` and
  `outline` variants.
- `StatusIcon` — inline SVG check / X / exclamation with default
  green / red / orange that stay consistent across themes.
- `LogoChip` — image + optional caption inside a soft theme-tinted
  frame; accepts `staticFile()` paths, `data:` URLs, or remote URLs.
- `AvatarChip` — round persona head + name; falls back to a colored
  circle showing the first letter of `name` when no `src` is given.
- `RelationshipNode` — small oval pill for ER relationships ("has",
  "owns"); sentence-case sans-serif, distinct from `TagChip`.
- `Cylinder` — stylized 3D database glyph in SVG.
- `IconNode` — single primitive lumping `shape="document"` and
  `shape="server-rack"` glyphs; new shapes drop in alongside.
- `Hexagon` — regular hexagon with `flat` (default) or `pointy`
  orientation.
- `RadialMindMap` — center hub + 3-8 leaves arranged on a circle;
  throws when the spoke count is outside `[3, 8]`.
- `Venn` — 2 or 3 overlapping circles with translucent fills and
  user-positioned intersection labels.
- `DotRating` — N-of-M filled-dot scoring widget.
- `canvasPresets` — exported constants: `bbgBlogInline` (1456x819),
  `bbgTallPoster` (2484x3002), `bbgLandscapeArch` (2472x1912).
- Ten new fidelity probes — `PanelVariantsProbe`, `SubPanelGridProbe`,
  `BeforeAfterSplitProbe`, `ComparisonTableProbe`, `FanArrowProbe`,
  `ChipsAndIconsProbe`, `PersonaProbe`, `ErDiagramProbe`,
  `RadialMindMapProbe`, `ShapesAndRatingsProbe`. All pass
  `pnpm test:check` with 0 collisions.

### Fixed

- Pinned `@remotion/bundler` and `@remotion/renderer` to `4.0.451`
  to match the rest of the Remotion packages; the previous
  `^4.0.451` ranges were drifting bundler/renderer to a newer minor
  while the CLI stayed pinned, breaking webpack alias passthrough.
- `apps/playground/remotion.config.ts` now uses `process.cwd()`
  rather than `__dirname` to derive the app root. Under pnpm the
  Remotion CLI evaluated the TS config from inside its own dist
  directory, leaving `__dirname` pointing at `@remotion/cli/dist`.
- `tsup` `outExtension` forces `.mjs` (ESM) and `.cjs` (CJS) so
  emitted files match `package.json`'s `exports` map. Previously
  `package.json` pointed at `dist/index.mjs` while tsup emitted
  `dist/index.js`.
- `@allen-saji/diagram-kit` resolves to the kit's source via webpack
  alias in `remotion.config.ts`, `scripts/check.mjs`, and
  `scripts/render-via-api.mjs`. Compositions outside
  `apps/playground/` (the gitignored `private/projects/`) couldn't
  resolve the workspace package via webpack's natural walk-up.
- Hoisted Remotion `bundler` / `renderer` / `tailwind-v4` plus
  `react` / `react-dom` / `remotion` peers to root devDeps so
  `scripts/check.mjs` and `scripts/render-via-api.mjs` resolve their
  imports under pnpm strict isolation.
- Added `@types/react` to root devDeps so private files outside
  `apps/playground/` find the JSX runtime types via TypeScript's
  walk-up.

## [0.1.0] - 2026-05-07

Initial public release.

### Added

- `Canvas` + `At` absolute-positioning primitives.
- Themed kit components: `Card`, `Panel`, `TreeNode`, `FlowBox`, `Arrow`,
  `Annotation`, `Title`, `Label`, `StepBadge`, `CodeBlock`, `TerminalCard`,
  `SwimLanes`, `StageRail`.
- Three palettes (`light`, `dark`, `legacy`) selected via the `theme` prop
  on `Canvas`, plus theme hooks (`useSwatch`, `useInk`, `useFrame`,
  `useAnnotation`).
- Animation helpers (`Appear`, `ScaleIn`, `DrawArrow`, `Pulse`, `Hold`,
  `Typewriter`) driven by `useCurrentFrame()`.
- Render pipeline scripts: `iterate.sh` (fast preview), `render-png.sh`
  (multiple DPI presets including `4k` and `8k`), `render-mp4.sh`
  (Twitter-spec presets), `render-via-api.mjs` (Node-API workaround
  for the CLI under pnpm), and `check.mjs` (deterministic collision
  checker with arrow / orphan-text intersection).
- Six fidelity example compositions: `BTreeVsBPlus`, `LsmTrees`,
  `LsmCompaction`, `DarkModeProbe`, `StepBadgeProbe`, `SwimLanesProbe`.
- Monorepo layout with `pnpm` workspaces — `packages/diagram-kit/`
  (publishable library) and `apps/playground/` (Remotion studio app).
- MIT license, CONTRIBUTING guide, Code of Conduct, security policy,
  CI workflow, issue + PR templates.

[Unreleased]: https://github.com/Allen-Saji/diagram-kit/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/Allen-Saji/diagram-kit/releases/tag/v0.2.0
[0.1.0]: https://github.com/Allen-Saji/diagram-kit/releases/tag/v0.1.0
