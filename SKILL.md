---
name: diagram-kit
description: Generate ByteByteGo-style technical diagrams (static PNG or animated MP4) for Allen's projects using the React + Remotion toolkit at ~/projects/diagram-kit. Use when asked to "diagram", "visualize architecture", "animate this flow", "make a technical diagram", "BBG-style diagram", or when any project (px402, Port Protocol, ReceiptAI, Docket, AgentBazaar, etc.) needs an architecture visualization. Not for whiteboard-style sketches (use excalidraw-diagram instead).
metadata:
  tags: diagram, remotion, visualization, architecture, bytebytego, png, mp4
---

# diagram-kit

Allen's personal toolkit for generating ByteByteGo-style technical diagrams. One React + Remotion codebase produces both static PNGs (blog / Twitter hero) and animated MP4s (Twitter video) from the same kit primitives.

**Repo:** `~/projects/diagram-kit/` · **Remote:** github.com/Allen-Saji/diagram-kit

## When to invoke

- "diagram the [architecture / flow / sequence] of [project]"
- "visualize how X works"
- "make an animated MP4 of this"
- "BBG-style diagram"
- "turn this architecture note into a diagram"

**Do not invoke for:** whiteboard sketches, mind maps, flowcharts with loose layout — use `excalidraw-diagram` for those.

## Workflow

The repo is a pnpm monorepo:

```
~/projects/diagram-kit/
  packages/diagram-kit/   <- the library (@allen-saji/diagram-kit)
  apps/playground/        <- Remotion studio app, consumes the lib via workspace:*
  private/                <- Allen-only, gitignored: personal project diagrams + assets
  scripts/                <- iterate, check, render-png, render-mp4, render-via-api
```

1. **Gather context** on the subject. If it's a known project, read `~/Brain/Projects/<name>/` (design docs, architecture notes) and consult memory. Pick the diagram type: sequence / architecture block / tree / flow. Pick a theme: `"light"` (default, BBG-canonical pale-mint bg) for blog/Twitter heroes; `"dark"` for protocol/CLI/security topics where neon-on-dark reads better; `"legacy"` only when reproducing or extending a previously-published diagram whose look must match.
2. **Draft composition.** Two locations:
   - `apps/playground/src/examples/<Name>.tsx` — public, ships in the repo. Use this for fidelity probes, BBG reference clones, and any diagram intended for the OSS playground.
   - `private/projects/<Name>.tsx` — Allen-personal, gitignored. Use this for project-specific diagrams (px402, Port Protocol, ReceiptAI, Docket, AgentBazaar, etc.) where branding, audio, and Allen-owned imagery live.
   Inside the comp:
   - Accept `debug?: boolean` and thread into `Canvas`.
   - Compose with `Canvas` + `At` + kit primitives.
   - Give every placed primitive a unique `debugId`.
3. **Register** in `apps/playground/src/Root.tsx` (public examples) or `private/index.tsx` (private comps): add `<Still>` (PNG) or `<Composition>` (MP4) in an appropriate `<Folder>`. Also add a `<Still>` variant inside the `debug` folder with `defaultProps={{ debug: true }}`.
4. **Iterate with debug overlay:**
   ```bash
   bash scripts/iterate.sh <Name> --debug    # out/iter/<Name>.debug.png (0.5x, red bbox labels)
   ```
5. **Verify no collisions:**
   ```bash
   node scripts/check.mjs <Name>             # exits 1 on overlap; JSON report at out/iter/<Name>.report.json
   ```
6. **Render final:**
   - PNG: `bash scripts/render-png.sh <Name> hd` (2x retina; auto-routes to `out/<theme>/`)
   - MP4: `bash scripts/render-mp4.sh <Name> tweet-16x9`

Never skip step 5 on a new composition. Collisions are invisible until the checker flags them.

## Kit API reference

All kit primitives ship from `packages/diagram-kit/`. Inside any composition (public or private), import from the library entry:

```tsx
import { Canvas, At, Card, Arrow, Title /* ... */ } from "@allen-saji/diagram-kit";
```

`workspace:*` links the playground (and any other workspace) to the live source, so changes to the kit are picked up without a rebuild during dev.

### Canvas + At (layout)

```tsx
<Canvas w={1600} h={900} debug={debug} theme="light">
  <At x={60} y={40}><Title>...</Title></At>
  <At x={800} y={500} anchor="center"><Card .../></At>
</Canvas>
```

- `Canvas` — fixed-size absolute-positioning container. Props: `w`, `h`, `debug?`, `background?`, `theme?`.
- `theme` — `"light"` (default, recalibrated BBG saturation + pale-mint page bg), `"dark"` (neon-on-dark, BBG's Polling-vs-Webhooks aesthetic), `"legacy"` (original kit hex values + white page bg). Choose `"legacy"` to preserve a previously-published diagram's exact look.
- `background` — overrides the theme's page bg. Rare; usually leave it to the theme.
- `At` — places a child at `(x, y)`. `anchor`: `top-left` (default) | `top-center` | `top-right` | `center` | `bottom-*`.

### Card

Rectangular pastel card with title + optional subtitle.

```tsx
<Card color="blue" title="px402 server" subtitle="stateless" debugId="server" />
```

Props: `color` (PaletteColor, required), `title`, `subtitle`, `outline`, `radius`, `padding`, `align` (`center`|`left`), `titleSize` (default 22), `subtitleSize` (default 16), `style`, `debugId`.

### Panel

Framed section with a pill-label title at the top border.

```tsx
<Panel title="Write Path" style={{ width: 700, height: 300 }}>
  {/* nested content, positioned absolutely inside */}
</Panel>

<Panel title="Background Region" variant="dashed" style={{ width: 700, height: 300 }}>
  {/* dashed outline, transparent bg — for loose sub-region grouping */}
</Panel>
```

Props: `title`, `variant` (`"solid"` default — filled bg, solid border | `"dashed"` — transparent bg, dashed border for loose sub-region grouping), `padding` (default 32), `radius` (default 20), `borderColor`, `debugId`, `style`.

Use `dashed` when the cards inside the panel are the headline and the panel is just a soft outline marking the region — BBG uses this on multi-region reference diagrams. Use `solid` everywhere else.

### TreeNode

B-tree / B+ tree node with bold keys and optional subtext row.

```tsx
<TreeNode keys="25 | 50" subtext="5, 8, 10 → 15, 20 → 30, 40" debugId="root" />
```

Props: `color` (default `blue`), `keys` (required), `subtext`, `width`, `padding`, `keysSize` (22), `subtextSize` (15), `style`, `debugId`.

### FlowBox

Rounded fixed-size pill for sequence steps (Write → WAL → Memtable).

```tsx
<FlowBox color="peach" title="Memtable" subtitle="sorted in-memory" debugId="memtable" />
```

Props: `color` (required), `title` (required), `subtitle`, `width` (default 160), `height` (default 80), `radius`, `titleSize` (22), `subtitleSize` (14), `style`, `debugId`.

### Arrow

Straight or elbow arrow with optional inline label. Lives at canvas level (SVG overlay).

```tsx
<Arrow
  from={{ x: 200, y: 300 }}
  to={{ x: 600, y: 300 }}
  waypoints={[{ x: 400, y: 300 }]}
  label="x402 payment"
  labelT={0.5}
  labelOffset={-12}
  dashed
/>
```

Props: `from`, `to` (both required `{x, y}`), `waypoints`, `color` (default ink.arrow), `strokeWidth` (2), `headSize` (10), `arrowStart`, `arrowEnd` (default true), `label`, `labelT` (0..1 along first segment), `labelOffset` (perpendicular px), `labelBackground`, `labelColor`, `labelSize` (14), `labelWeight`, `dashed`, `progress` (0..1 for draw-in), `debugId`.

**Notes:**
- `Arrow` is placed directly inside `Canvas`, NOT inside `<At>`. `from`/`to` are absolute canvas coords.
- When `progress` is set (typically via `DrawArrow`), arrow heads and labels fade in with the line draw. At `progress=0` everything is invisible.
- `debugId` makes the arrow participate in `check.mjs` segment-vs-card intersection checks. Tag every arrow that should be layout-verified.

### Label

Non-italic section header / standalone text. Use for anything that isn't a `Title`, `Annotation` (italic), or part of a `Card`/`Panel`. Always tracked as a collision obstacle (debugId is required).

```tsx
<Label debugId="rules-header" size={15} weight={700} uppercase tracking={0.6}>
  Rule Pipeline
</Label>
```

Props: `children` (required), `size` (default 15), `weight` (700), `color` (ink.heading), `tracking` (0.2), `uppercase` (false), `align` (`left`), `style`, `debugId` (**required**).

**Rule:** never write a raw `<div>` or `<span>` for standalone text inside a composition. The orphan detector will flag it at check time; use `Label` (section header), `Annotation` (italic note), or `Title` (top headline) instead.

### Annotation

Italic side-note. Red for walkthrough callouts, gray for ambient notes.

```tsx
<Annotation tone="red" debugId="note-1">1. Agent requests resource</Annotation>
```

Props: `tone` (`red`|`gray`, default `red`), `size` (15), `weight` (500), `style`, `debugId`.

### Title

Diagram headline with colored accent + optional right brand slot.

```tsx
<Title accentColor="blue" accentShape="bar" rightSlot="px402 · allensaji.dev">
  Private Agent Payments on MagicBlock PER
</Title>
```

Props: `children` (required), `accentColor` (default `mint`), `accentShape` (`"bar"` default — BBG canon, vertical bar; `"square"` — original kit accent), `rightSlot`, `size` (44), `style`, `debugId?`.

### StepBadge

Circled number (or short label) used as an inline step indicator on numbered flows. BBG uses these on nearly every multi-step diagram.

```tsx
<StepBadge n={1} color="mint" size={32} variant="solid" debugId="step-1" />
<StepBadge n={2} color="blue" variant="outline" size={44} debugId="step-2" />
```

Props: `n` (required, number or string), `color` (PaletteColor, default `mint`), `size` (default 32), `variant` (`"solid"` filled | `"outline"` ring-only), `style`, `debugId?`.

### CodeBlock

Monospace snippet on a tinted pastel background — for SQL, shell, addresses, short code references inside a diagram. Use `TerminalCard` if you need full terminal chrome.

```tsx
<CodeBlock color="blue" lang="ts" width={720} debugId="code-poll">{`async function poll() {
  const res = await fetch("/inbox");
}`}</CodeBlock>
```

Props: `children` (string, required), `color` (PaletteColor, default `gray`), `lang?` (small uppercase tag in the corner), `size` (default 16), `width?`, `padding`, `radius`, `style`, `debugId?`.

### TerminalCard

Black terminal-window card with macOS-style traffic-light dots and a monospace body. Use for CLI output, shell sessions, log fragments.

```tsx
<TerminalCard title="poll.log" width={720} height={260} debugId="term-out">{`[12:00:00] GET /inbox -> 200
[12:00:05] GET /inbox -> 200`}</TerminalCard>
```

Props: `children` (string, required), `title?`, `size` (default 15), `width?`, `height?`, `padding`, `radius`, `style`, `debugId?`.

### SwimLanes

Sequence-diagram swim lanes — header cards per actor + dashed vertical lifelines. Place `Card`s, `Arrow`s, and `StepBadge`s inside the same Canvas using `lanes[i].x` to align with each lane.

```tsx
const LANE = { sarah: 280, db: 800, alex: 1320 };
<SwimLanes
  lanes={[
    { id: "sarah", title: "Sarah", subtitle: "writer A", color: "pink", x: LANE.sarah },
    { id: "db",    title: "Database", subtitle: "row v=1", color: "blue", x: LANE.db },
    { id: "alex",  title: "Alex",  subtitle: "writer B", color: "mint", x: LANE.alex },
  ]}
  headerY={150}
  lifeline={{ top: 230, bottom: 800 }}
/>
```

Props: `lanes` (required `SwimLane[]`), `headerY` (default 150), `lifeline` (required `{top, bottom}`), `lifelineColor?` (defaults to theme muted ink), `headerPadding`, `headerRadius`, `headerTitleSize`, `headerSubtitleSize`.

`SwimLane = { id, title, subtitle?, color: PaletteColor, x }` — `x` is the lane center (canvas coords).

Lifelines are rendered without `debugId` (they legitimately span the diagram height); on-lane cards must use solid fills, never `outline`, or the dashed line will show through.

### StageRail

Stage-rail layout — left column of icon+label tiles tied to right-side content bands. BBG uses this for the JVM, Load Balancer, and DoorDash architecture diagrams.

```tsx
<StageRail
  origin={{ x: 60, y: 200 }}
  width={1480}
  rowHeight={140}
  stages={[
    { id: "build", label: "Build", icon: <span>⚙</span>, color: "mint",
      content: <Card debugId="build-card" color="mint" title="javac" /> },
    { id: "load",  label: "Load",  icon: <span>↧</span>, color: "blue",
      content: <Card debugId="load-card" color="blue" title="ClassLoader" /> },
  ]}
/>
```

Props: `origin` (required `{x, y}` top-left), `width` (required total layout width), `rowHeight` (default 140), `railWidth` (default 140), `gap` (default 24), `stages` (required `Stage[]`), `tileBackground?`.

`Stage = { id, label, icon, color?: PaletteColor, content }` — `content` is rendered in the right band with a top-left origin.

### SubPanelGrid

N-by-M grid of independently-titled `Panel`s. BBG uses this for multi-concept reference cards ("4 caching strategies", "5 consensus protocols").

```tsx
<SubPanelGrid
  cols={2}
  panelHeight={240}
  style={{ width: 1480 }}
  panels={[
    { id: "a", title: "Cache Aside", content: <CardLayout /> },
    { id: "b", title: "Read Through", content: <CardLayout /> },
    { id: "c", title: "Write Through", content: <CardLayout /> },
    { id: "d", title: "Write Back", content: <CardLayout /> },
  ]}
/>
```

Props: `panels` (required `SubPanelGridItem[]`), `cols` (default 2), `gap` (default 32), `panelHeight` (default 240), `style` (must set `width`).

`SubPanelGridItem = { id, title, content, variant? }` — `variant` falls through to the underlying Panel (`solid` or `dashed`). The wrapper itself emits no BBOX; cell Panels register their pills as usual.

### BeforeAfterSplit

Two stacked `Panel`s separated by a labeled divider chip. Canonical "without/with" comparison layout.

```tsx
<BeforeAfterSplit
  width={1480}
  panelHeight={240}
  before={{ title: "Without batching", content: <Layout /> }}
  divider={{ label: "Apply request batching", color: "blue" }}
  after={{ title: "With batching", content: <Layout /> }}
/>
```

Props: `before`/`after` (`{ title, content }`), `divider` (`{ label, color?, showArrows? }`), `width` (required), `panelHeight` (default 280), `dividerHeight` (default 80), `style`.

The divider chip pulls colors from the supplied palette swatch and renders inline-SVG triangle markers (font-portable, no Unicode arrows). Set `divider.showArrows = false` for an unadorned chip.

### ComparisonTable

Feature-matrix table — left column lists dimensions with numbered `StepBadge` (outline) markers; remaining columns are option cells. Use for MCP-vs-Skills, Postgres-vs-MySQL, Claude-vs-OpenClaw posts.

```tsx
<ComparisonTable
  width={1480}
  labelWidth={280}
  rowHeight={92}
  columns={[
    { id: "claude", label: "Claude" },
    { id: "openclaw", label: "OpenClaw" },
  ]}
  rows={[
    {
      id: "control",
      label: "Browser control",
      cells: [
        <Card debugId="claude-ctrl" color="mint" title="Headless only" />,
        <Card debugId="oc-ctrl" color="blue" title="Real Chrome" />,
      ],
    },
  ]}
/>
```

Props: `columns` (required `ComparisonTableColumn[]`), `rows` (required `ComparisonTableRow[]`), `width` (required), `rowHeight` (default 80), `headerHeight` (default 60), `labelWidth` (default 240), `badgeColor` (default `mint`).

No `debugId` on the table itself (semantic container, like `Panel`); cells inside should carry their own `debugId` if they participate in collision checks.

### FanArrow

One source -> N targets, all branches sharing the same origin. Place at canvas top level (NOT inside `<At>`); coordinates are canvas-absolute.

```tsx
<FanArrow
  debugId="repl"
  from={{ x: 320, y: 420 }}
  targets={[
    { id: "a", to: { x: 1100, y: 240 } },
    { id: "b", to: { x: 1100, y: 420 }, label: "primary" },
    { id: "c", to: { x: 1100, y: 600 } },
  ]}
/>
```

Props: `from` (required), `targets` (required `FanArrowTarget[]`), `color`, `strokeWidth` (default 2), `headSize` (default 10), `progress`, `dashed`, `debugId`.

Each branch's `Arrow` gets `debugId = ${parentId}-${target.id}`, so the collision checker can distinguish branches.

### TagChip

Tight monospace pill for short uppercase verbs (HTTP methods, CRUD verbs, role markers).

```tsx
<TagChip color="mint">CREATE</TagChip>
<TagChip color="blue">READ</TagChip>
<TagChip color="peach">UPDATE</TagChip>
<TagChip color="pink">DELETE</TagChip>
```

Props: `children` (required string), `color` (required `PaletteColor`), `size` (default 13), `uppercase` (default true), `letterSpacing` (default 0.6), `style`, `debugId?`.

Use for category markers; use `RelationshipNode` instead for ER-style "has"/"owns" labels.

### IconBadge

Small colored disc with an arbitrary icon node inside. Differs from `StepBadge` (which carries a sequence number).

```tsx
<IconBadge icon="U" color="blue" />
<IconBadge icon={<svg>...</svg>} color="peach" variant="outline" size={40} />
```

Props: `icon` (required `ReactNode`), `color` (default `mint`), `size` (default 32), `variant` (`solid`|`outline`, default `solid`), `iconSize`, `style`, `debugId?`.

### StatusIcon

Inline SVG check / X / exclamation. Default colors stay consistent across themes since the semantics are universal; override via `color` prop.

```tsx
<StatusIcon status="ok" />
<StatusIcon status="fail" size={24} />
<StatusIcon status="warn" />
```

Props: `status` (required `"ok" | "fail" | "warn"`), `color`, `size` (default 20), `strokeWidth` (default 3), `style`, `debugId?`.

### LogoChip

Brand logo image with optional caption inside a soft theme-tinted frame. Accepts `staticFile()` paths, inline `data:` SVGs, or remote URLs.

```tsx
<LogoChip src={staticFile("logos/anthropic.svg")} caption="Anthropic" />
<LogoChip src="https://cdn.example.com/logo.png" width={120} framed={false} />
```

Props: `src` (required string), `caption`, `width` (default 80), `height` (default = `width`), `framed` (default true), `captionSize` (default 12), `alt`, `style`, `debugId?`.

Uses plain `<img>` rather than Remotion's `<Img>` so the kit stays runtime-agnostic. For remote URLs in Remotion renders, ensure the image is preloaded — `staticFile()` is the safest choice.

### AvatarChip

Round persona head + name label below. Falls back to a colored circle showing the first letter of `name` when no `src` is provided.

```tsx
<AvatarChip name="Sarah" subtitle="writer A" src={staticFile("avatars/sarah.png")} />
<AvatarChip name="Alex" color="blue" />  // fallback to colored circle with "A"
```

Props: `name` (required string), `src`, `color` (default `mint`), `size` (default 64), `subtitle`, `alt`, `style`, `debugId?`.

### RelationshipNode

Small oval pill for ER relationship labels ("has", "owns", "writes to"). Sentence-case sans-serif — visually distinct from `TagChip` (uppercase mono).

```tsx
<RelationshipNode>has</RelationshipNode>
<RelationshipNode tone="accent" color="mint">owns</RelationshipNode>
```

Props: `children` (required string), `tone` (`accent`|`neutral`, default `neutral`), `color` (default `gray`), `size` (default 14), `style`, `debugId?`.

Default `neutral` tone uses the theme's frame border (subdued, BBG canon for ER labels). `accent` uses a palette swatch when the relationship is the focal point.

### Cylinder

Stylized 3D database glyph rendered in SVG. Top ellipse rim, vertical body sides, front-arc-only bottom (the back of the bottom ellipse is hidden by the body).

```tsx
<Cylinder color="blue" label="Postgres" />
<Cylinder color="peach" label="Redis" width={60} height={80} />
```

Props: `color` (required `PaletteColor`), `width` (default 80), `height` (default 100), `rim` (default = `width * 0.18`, clamped to >= 8), `label`, `labelSize` (default 14), `style`, `debugId?`.

### IconNode

Single primitive lumping multiple "object" glyphs under a `shape` variant. Supports `"document"` and `"server-rack"`; new shapes drop in alongside the internal switch.

```tsx
<IconNode shape="document" color="peach" label="Spec" />
<IconNode shape="server-rack" color="purple" label="Production" />
```

Props: `shape` (required `IconNodeShape`), `color` (default `gray`), `width`/`height` (defaults vary by shape — document 60x80, server-rack 80x100), `label`, `labelSize` (default 14), `style`, `debugId?`.

### Hexagon

Regular hexagon with `flat` (default) or `pointy` orientation. SVG polygon with vertices computed from the chosen orientation; bounding-box width is fixed at `size` and height is derived (flat-top is wider than tall, pointy-top is the reverse).

```tsx
<Hexagon color="purple" size={120} label="Service A" />
<Hexagon color="peach" size={100} orientation="pointy" />
```

Props: `color` (required `PaletteColor`), `size` (default 80), `orientation` (`flat`|`pointy`, default `flat`), `label`, `labelSize` (default 14), `style`, `debugId?`.

Flat-top is BBG canon for radial mind-map hubs.

### RadialMindMap

Center hub plus 3-8 leaves arranged on a circle. Throws when the spoke count is outside `[3, 8]`. For arbitrary fan-out use `FanArrow` with manual leaf positions.

```tsx
<RadialMindMap
  centerAt={{ x: 800, y: 510 }}
  radius={260}
  center={<Hexagon color="purple" size={150} label="Observability" />}
  spokes={[
    { id: "logs", content: <Card color="mint" title="Logs" /> },
    { id: "metrics", content: <Card color="blue" title="Metrics" /> },
    { id: "traces", content: <Card color="peach" title="Traces" /> },
    { id: "events", content: <Card color="pink" title="Events" /> },
    { id: "alerts", content: <Card color="yellow" title="Alerts" /> },
    { id: "dashboards", content: <Card color="lavender" title="Dashboards" /> },
  ]}
/>
```

Props: `center` (required `ReactNode`), `centerAt` (required `{x, y}`, canvas-absolute), `spokes` (required `RadialMindMapSpoke[]`, length 3-8), `radius` (default 220), `startAngle` (default 270 — first leaf at 12 o'clock), `arrowColor`, `strokeWidth` (default 2), `progress`.

Spokes do **not** carry `debugId` — they intentionally pass through the hub at its center; flagging would false-positive every frame. Place at canvas top level (NOT inside `<At>`); the primitive lays out its own children.

### Venn

2 or 3 overlapping circles with translucent fills so overlaps blend visually. Caller supplies circle and intersection-label positions; auto-layout is intentionally deferred since "which point is inside an intersection" is composition-specific.

```tsx
<Venn
  width={460}
  height={300}
  circles={[
    { id: "front", label: "Frontend", color: "mint", cx: 160, cy: 130, r: 100 },
    { id: "back", label: "Backend", color: "blue", cx: 300, cy: 130, r: 100 },
    { id: "ops", label: "DevOps", color: "peach", cx: 230, cy: 230, r: 100 },
  ]}
  intersectionLabels={[
    { x: 230, y: 130, label: "Fullstack" },
    { x: 230, y: 175, label: "Generalist" },
  ]}
/>
```

Props: `width` (required), `height` (required), `circles` (required `VennCircle[]`, length 2-3), `intersectionLabels` (default `[]`), `fillOpacity` (default 0.45), `labelSize` (default 16), `intersectionLabelSize` (default 14), `style`, `debugId?`.

Labels use SVG `<text>` so they don't show up in the orphan walker and don't flag as obstacles for arrow checks.

### DotRating

N-of-M filled dots — compact rough-strength widget. Pairs cleanly with `ComparisonTable` cells when the comparison is rough rather than precise.

```tsx
<DotRating value={4} max={5} color="mint" label="Latency" labelPosition="left" />
<DotRating value={3} max={10} color="blue" />
```

Props: `value` (required, clamped to `[0, max]`), `max` (required), `color` (default `mint`), `size` (default 12), `gap` (default 4), `label`, `labelPosition` (`left`|`right`, default `right`), `labelSize` (default 14), `style`, `debugId?`.

### Palette + theme

```ts
type PaletteColor = "mint" | "peach" | "blue" | "yellow" | "pink" | "purple" | "lavender" | "gray";
```

Three palettes ship: `paletteLight` (default, recalibrated BBG saturation), `paletteDark` (neon-on-dark, mostly-hollow cards), `paletteLegacy` (original kit hex values). Each `palette[color]` is a `Swatch = { bg, border, text }`.

The active palette is selected by the `theme` prop on `<Canvas>`. **Don't import `palette`/`ink`/`frame` directly from `../kit` for use inside a primitive** — read them from theme context instead so the same component works under any theme:

```ts
import { useSwatch, useInk, useFrame, useAnnotation } from "../kit";

const p = useSwatch("blue");      // current theme's blue swatch
const ink = useInk();              // { heading, body, muted, arrow }
const frame = useFrame();          // { border, bg, pageBg }
const annot = useAnnotation();     // { red, gray, redMuted }
```

The bare `palette`, `ink`, `frame`, `annotation` exports still resolve to the light variants for back-compat. Source of truth: `packages/diagram-kit/src/kit/palette.ts` + `packages/diagram-kit/src/kit/theme.ts`.

### Fonts

`fonts.sans` (Inter), `fonts.sansItalic`, `fonts.mono` (JetBrains Mono — use for addresses, hashes, log fragments).

### Canvas presets

Named dimension sets for the publishing surfaces this kit targets. Spread directly into `<Canvas>`:

```tsx
import { canvasPresets } from "@allen-saji/diagram-kit";

<Canvas {...canvasPresets.bbgBlogInline} debug={debug}>
  ...
</Canvas>
```

| Preset | Dims (w x h) | Use |
|---|---|---|
| `bbgBlogInline` | 1456 x 819 | 16:9 hero asset for inline blog placement |
| `bbgTallPoster` | 2484 x 3002 | Tall poster format for vertical comparison posts |
| `bbgLandscapeArch` | 2472 x 1912 | Wide architecture diagrams (LB + JVM + storage stacks) |

Twitter/X MP4 presets stay in `render-mp4.sh` since those are render-time concerns (bitrate/aspect), not canvas dimensions.

## Animation API

Imported from the same `@allen-saji/diagram-kit` entry. Every primitive reads `useCurrentFrame()`. Never use CSS `transition`, `animation`, or Tailwind `animate-*` classes — they do not render correctly in Remotion.

```tsx
<Appear at={0.5} duration={0.45} slideY={16}><Card ... /></Appear>
<ScaleIn at={1.0} from={0.85}><Card ... /></ScaleIn>
<DrawArrow at={1.5} duration={0.5} from={...} to={...} />
<Pulse at={3.0} peak={1.08} pulses={1}><Card ... /></Pulse>
<Hold from={2.0} until={5.0}><Annotation>...</Annotation></Hold>
<Typewriter at={0} text="POST /pay" cps={30} cursor="_" />
```

All times are in **seconds from composition start**. `at`, `duration` in seconds. `fps` is read from `useVideoConfig()`.

## Registration pattern

Open `apps/playground/src/Root.tsx` (public) or `private/index.tsx` (Allen-only) and add two entries: one in the feature folder, one in the `debug` folder.

```tsx
<Folder name="<projectOrTopic>">
  <Still id="MyDiagram" component={MyDiagram} width={1600} height={900} />
  {/* OR for animated: */}
  <Composition
    id="MyDiagramAnimated"
    component={MyDiagramAnimated}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={15 * 30}
  />
</Folder>
<Folder name="debug">
  <Still id="MyDiagramDebug" component={MyDiagram} width={1600} height={900}
         defaultProps={{ debug: true }} />
</Folder>
```

The debug registration is what lets `iterate.sh MyDiagram --debug` find `MyDiagramDebug` automatically.

## Scripts reference

| Script | Usage | Output |
|---|---|---|
| `bash scripts/iterate.sh <Name> [--debug] [--full]` | Fast 0.5x preview | `out/iter/<Name>[.debug].png` |
| `node scripts/check.mjs <Name> [--min-area=N]` | Headless collision check | JSON report + exit 1 on overlap |
| `bash scripts/render-png.sh <Name> [blog\|hd\|4k\|ultra\|8k]` | Final PNG | `out/<theme>/<Name>-<preset>.png` |
| `bash scripts/render-mp4.sh <Name> [tweet-16x9\|tweet-sq\|tweet-9x16\|blog]` | Final MP4, H.264/yuv420p | `out/<theme>/<Name>-<preset>.mp4` |
| `node scripts/render-via-api.mjs <Name> <out-path> [scale]` | Node-API render fallback when CLI misbehaves | as specified |
| `pnpm dev` | Live preview UI (Remotion studio) | http://localhost:3000 |
| `pnpm test:check` | Run check.mjs against every public fidelity example | exit 1 on any overlap |

PNG resolution by preset (canvas → output):

| Preset | Multiplier | 1600×1100 canvas | 1920×1080 canvas | When to use |
|---|---|---|---|---|
| `blog` | 1× | 1600×1100 | 1920×1080 (FHD) | Inline blog asset, small embeds |
| `hd` | 2× | 3200×2200 | 3840×2160 (UHD) | Default Twitter/X hero, retina display |
| `4k` | auto | 3840×2640 | 3840×2160 | Guarantees ≥3840px wide regardless of canvas — use when posting to platforms that compress aggressively (Twitter, LinkedIn) |
| `ultra` | 3× | 4800×3300 | 5760×3240 | Print, ultra-wide displays |
| `8k` | auto | 7680×5280 | 7680×4320 | Archive / poster print |

Output is auto-routed to `out/<theme>/` based on the `theme="..."` prop detected in the comp's source. Pass an explicit output path to override.

MP4 presets:
- `tweet-16x9` — 1920x1080 @ 8 Mbps (landscape, default)
- `tweet-sq` — 1080x1080 @ 8 Mbps (square)
- `tweet-9x16` — 1080x1920 @ 12 Mbps (vertical)
- `blog` — 1280x720 @ 4 Mbps

## Conventions

- **Absolute layout only.** `Canvas` + `At` everywhere. No flex row/col across elements at the canvas level.
- **One font family per kind.** Inter for prose, JetBrains Mono for code/addresses/hashes.
- **Annotation tones.** Red italic for walkthrough steps, gray italic for ambient notes.
- **`debugId` on every placed primitive — except `Panel`.** `Panel` is a semantic container; cards intentionally sit inside it. Giving a `Panel` a `debugId` makes the collision checker flag every contained card as an overlap. Leave `Panel` unidentified; put `debugId` on the actual content.
- **Pick one palette family per semantic role.** e.g. if `blue` = server, don't also use `blue` for a data store elsewhere in the same diagram.
- **No CSS transitions.** All motion via `useCurrentFrame()` — enforced by Remotion's rendering model, not an aesthetic choice.
- **Mono font for technical strings.** Addresses, tx hashes, CLI output, endpoints.

## Reference compositions

Study these for patterns before writing a new diagram. Public examples live under `apps/playground/src/examples/`; Allen-personal project comps live under `private/projects/`.

Public (`apps/playground/src/examples/fidelity/`):
- `BTreeVsBPlus.tsx` — two-panel comparison, uses `Panel` + `TreeNode` + `Arrow`.
- `LsmTrees.tsx` — multi-region block diagram with `FlowBox` chains.
- `LsmCompaction.tsx` — stacked tier visualization.
- `DarkModeProbe.tsx` — `theme="dark"` reference: `StepBadge` + `CodeBlock` + `TerminalCard` on a single panel. Use as the canonical dark-mode template.
- `StepBadgeProbe.tsx` — `StepBadge` solid vs outline variants, `Title` bar accent.
- `SwimLanesProbe.tsx` — `SwimLanes` 3-lane sequence with numbered `StepBadge` markers.
- `PanelVariantsProbe.tsx` — `Panel` `variant="solid"` vs `variant="dashed"` side-by-side.
- `SubPanelGridProbe.tsx` — 2x2 grid of independently-titled Panels (caching strategies).
- `BeforeAfterSplitProbe.tsx` — stacked Panels with labeled divider chip (request batching).
- `ComparisonTableProbe.tsx` — feature matrix with numbered StepBadge rows.
- `FanArrowProbe.tsx` — leader -> three replicas, middle branch labeled.
- `ChipsAndIconsProbe.tsx` — TagChip / IconBadge / StatusIcon trio in three rows.
- `PersonaProbe.tsx` — LogoChip and AvatarChip variants (with image, fallback initial).
- `ErDiagramProbe.tsx` — User -> Document -> Postgres -> Server rack with RelationshipNode pills.
- `RadialMindMapProbe.tsx` — Hexagon hub + six leaves stepped 60 degrees apart.
- `ShapesAndRatingsProbe.tsx` — flat + pointy Hexagons, three-set Venn, DotRating rows.

Private (`private/projects/` — Allen-only):
- `Px402Static.tsx` — sequence diagram with lifelines, 1600x1000.
- `Px402Animated.tsx` — 15s animated version. Shows `Appear` + `DrawArrow` + `Pulse` choreography, numbered badges on step arrows as Arrow labels.
- `PortProtocolArch.tsx` — 3-panel with rule pipeline, pass/fail branch, arrow labels as flow semantics.
- `DiagramKitArch.tsx` + `DiagramKitArchAnimated.tsx` — self-referential diagram about this kit.

## Pitfalls

- **Forgetting the debug variant.** `iterate.sh --debug` will fail with "composition not found" until you register `<Name>Debug` in the `debug` folder.
- **`Arrow` inside `<At>`.** Arrows use canvas-absolute coords in `from`/`to`. Wrapping in `<At>` double-offsets them.
- **Animating with CSS.** `transition: all 0.3s` renders as a static snapshot. Use `Appear`, `ScaleIn`, or raw `useCurrentFrame()` + `interpolate()`.
- **Skipping `check.mjs`.** Two cards can look fine in a still preview and still overlap by 2px; only the checker catches it deterministically.
- **Arrows passing through cards.** `check.mjs` flags these only when the arrow has a `debugId`. Untagged arrows are not checked. Always tag diagram arrows with `debugId` to get coverage. The checker shrinks card rects by 5px before testing, so arrows that simply touch a card edge don't false-positive, but arrows whose endpoints sit >5px inside another card's interior will be flagged.
- **Arrows passing through raw `<div>` text.** Don't author raw `<div>` for standalone text inside a composition — `check.mjs` has an orphan text walker that emits `ORPHAN::` rects for any text not inside a kit primitive, and those rects participate in arrow intersection. An arrow crossing an orphan text block will be flagged at check time. Always use `Label` (section header), `Annotation` (italic note), or `Title` (page headline) instead of a bare `<div>`.
- **Lifelines visible through on-lane cards.** Sequence-diagram lifelines (dashed vertical lines) are rendered without `debugId` since they legitimately span the full diagram height. But any `Card` placed *on* a lane (e.g. "Crank11 pops queue" on the PER lane) must have a **solid fill** — do NOT use `outline` mode for lane cards, because `outline` sets the card background to transparent and the dashed lifeline will show through the card body. The checker can't catch this geometrically; it's a rendering-order issue. Rule of thumb: `outline` cards only for elements *off* the lanes.
- **Canvas dimensions must match the render preset.** Setting `<Canvas w=1600 h=1000>` and rendering via `render-mp4.sh <comp> tweet-16x9` (which targets 1920x1080) causes Remotion to letterbox or pad the mismatch, producing empty space in the final video. Match canvas dims to the intended preset from the start: `tweet-16x9` → 1920x1080, `tweet-sq` → 1080x1080, `tweet-9x16` → 1080x1920, `blog` PNG → any 16:10-ish ratio is fine. For static PNGs, any dims work since the composition is rendered at its native size. For MP4s, always pick canvas dims that match a preset.
- **Animated compositions render at final frame for checks.** `check.mjs` automatically uses `composition.durationInFrames - 1` when durationInFrames > 1. This avoids spurious collisions from in-flight `Appear` / `ScaleIn` translates during the first few frames. For still compositions, it renders frame 0.
- **Long text overflowing `FlowBox`.** `FlowBox` is fixed `width` × `height`. Use `Card` (inline-flex, sizes to content) when content is variable-length.
- **`check.mjs` does NOT catch text-on-text overlap inside arrow labels.** Arrow labels (and any element marked `data-dk-skip`) are excluded from collision detection because labels legitimately float on arrow paths. If your arrow label is a multi-element group (label pill + sublabel below it, or label + inline badge), the checker won't notice when the elements overlap each other or sit on top of nearby cards. Always **visually verify** zoomed renders of any custom multi-line label group. Common breakage: making the main label pill taller (border, larger padding, pill radius) without re-spacing the sublabel that sits at `labelAt.y + 22` — the new pill engulfs the sublabel. Fix: top-anchor the sublabel (`transform: "translate(-50%, 0)"`) and bump the y offset to clear the pill's actual rendered height. Also confirm the whole label group sits in empty space — `labelAt.y` close to a card's top will push a top-anchored sublabel into the card.
- **Unicode in labels.** Avoid em dashes and fancy quotes in titles — stick to ASCII for portability across font stacks.

## Maintenance

This skill is a reference snapshot of the kit's surface area. When new primitives are added, new props land, or conventions change in `~/projects/diagram-kit/`, update this file **and** mirror it to `~/projects/diagram-kit/SKILL.md` so the OSS repo's skill stays in sync. The kit's source of truth is the repo; this skill is the shortcut.
