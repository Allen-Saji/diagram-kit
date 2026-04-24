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

1. **Gather context** on the subject. If it's a known project, read `~/Brain/Projects/<name>/` (design docs, architecture notes) and consult memory. Pick the diagram type: sequence / architecture block / tree / flow.
2. **Draft composition** under `~/projects/diagram-kit/src/compositions/`. Use `projects/<Name>.tsx` for real-project diagrams (px402, Port Protocol, etc.) or `fidelity/<Name>.tsx` for BBG reference clones:
   - Accept `debug?: boolean` and thread into `Canvas`.
   - Compose with `Canvas` + `At` + kit primitives.
   - Give every placed primitive a unique `debugId`.
3. **Register** in `src/Root.tsx`: add `<Still>` (PNG) or `<Composition>` (MP4) in an appropriate folder. Also add a `<Still>` variant inside the `debug` folder with `defaultProps={{ debug: true }}`.
4. **Iterate with debug overlay:**
   ```bash
   scripts/iterate.sh <Name> --debug    # out/iter/<Name>.debug.png (0.5x, red bbox labels)
   ```
5. **Verify no collisions:**
   ```bash
   node scripts/check.mjs <Name>        # exits 1 on overlap; JSON report at out/iter/<Name>.report.json
   ```
6. **Render final:**
   - PNG: `scripts/render-png.sh <Name> hd` (2x retina)
   - MP4: `scripts/render-mp4.sh <Name> tweet-16x9`

Never skip step 5 on a new composition. Collisions are invisible until the checker flags them.

## Kit API reference

All kit primitives are exported from `~/projects/diagram-kit/src/kit/`. Import from `../kit` inside a composition.

### Canvas + At (layout)

```tsx
<Canvas w={1600} h={900} debug={debug}>
  <At x={60} y={40}><Title>...</Title></At>
  <At x={800} y={500} anchor="center"><Card .../></At>
</Canvas>
```

- `Canvas` — fixed-size absolute-positioning container. `w`, `h`, optional `debug`, `background`.
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
<Panel title="Write Path" debugId="write-panel" style={{ width: 700, height: 300 }}>
  {/* nested content, positioned absolutely inside */}
</Panel>
```

Props: `title`, `padding` (default 32), `radius` (default 20), `borderColor`, `debugId`, `style`.

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

Diagram headline with colored accent square + optional right brand slot.

```tsx
<Title accentColor="blue" rightSlot="px402 · allensaji.dev">
  Private Agent Payments on MagicBlock PER
</Title>
```

Props: `children` (required), `accentColor` (default `mint`), `rightSlot`, `size` (44), `style`.

### Palette

Import `palette`, `ink`, `frame`, `annotation` from `../kit`.

```ts
type PaletteColor = "mint" | "peach" | "blue" | "yellow" | "pink" | "purple" | "lavender" | "gray";
```

Each `palette[color]` has `{ bg, border, text }`. `ink` has `heading`, `body`, `muted`, `arrow`. Source of truth: `src/kit/palette.ts`.

### Fonts

`fonts.sans` (Inter), `fonts.sansItalic`, `fonts.mono` (JetBrains Mono — use for addresses, hashes, log fragments).

## Animation API

From `../animation`. Every primitive reads `useCurrentFrame()`. Never use CSS `transition`, `animation`, or Tailwind `animate-*` classes — they do not render correctly in Remotion.

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

Open `src/Root.tsx` and add two entries: one in the feature folder, one in the `debug` folder.

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
| `scripts/iterate.sh <Name> [--debug] [--full]` | Fast 0.5x preview | `out/iter/<Name>[.debug].png` |
| `node scripts/check.mjs <Name> [--min-area=N]` | Headless collision check | JSON report + exit 1 on overlap |
| `scripts/render-png.sh <Name> [blog\|hd\|ultra]` | Final PNG at 1x / 2x / 3x | `out/<Name>.png` |
| `scripts/render-mp4.sh <Name> [tweet-16x9\|tweet-sq\|tweet-9x16\|blog]` | Final MP4, H.264/yuv420p | `out/<Name>.mp4` |
| `npx remotion studio` | Live preview UI in browser | — |

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

Study these for patterns before writing a new diagram:

- `src/compositions/projects/Px402Static.tsx` — sequence diagram with lifelines, 1600x1000.
- `src/compositions/projects/Px402Animated.tsx` — 15s animated version of Px402Static. Shows `Appear` + `DrawArrow` + `Pulse` choreography, numbered badges on step arrows as Arrow labels.
- `src/compositions/projects/PortProtocolArch.tsx` — 3-panel with rule pipeline, pass/fail branch, arrow labels as flow semantics.
- `src/compositions/projects/DiagramKitArch.tsx` + `DiagramKitArchAnimated.tsx` — self-referential diagram about this kit.
- `src/compositions/fidelity/BTreeVsBPlus.tsx` — two-panel comparison, uses `Panel` + `TreeNode` + `Arrow`.
- `src/compositions/fidelity/LsmTrees.tsx` — multi-region block diagram with `FlowBox` chains.
- `src/compositions/fidelity/LsmCompaction.tsx` — stacked tier visualization.

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
- **Unicode in labels.** Avoid em dashes and fancy quotes in titles — stick to ASCII for portability across font stacks.

## Maintenance

This skill is a reference snapshot of the kit's surface area. When new primitives are added, new props land, or conventions change in `~/projects/diagram-kit/`, update this file. The kit's source of truth is the repo; this skill is the shortcut.
