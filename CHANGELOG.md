# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
  (Twitter-spec presets), and `check.mjs` (deterministic collision
  checker with arrow / orphan-text intersection).
- Six fidelity example compositions: `BTreeVsBPlus`, `LsmTrees`,
  `LsmCompaction`, `DarkModeProbe`, `StepBadgeProbe`, `SwimLanesProbe`.
- Monorepo layout with `pnpm` workspaces — `packages/diagram-kit/`
  (publishable library) and `apps/playground/` (Remotion studio app).
- MIT license, CONTRIBUTING guide, CI workflow, issue + PR templates.

[Unreleased]: https://github.com/Allen-Saji/diagram-kit/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/Allen-Saji/diagram-kit/releases/tag/v0.1.0
