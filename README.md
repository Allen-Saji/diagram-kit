# diagram-kit

Reusable React + Remotion toolkit for generating ByteByteGo-style technical
diagrams as PNGs and animated MP4s from the same component library.

## Why

Off-the-shelf tools (Mermaid, D2, Graphviz) don't produce the ByteByteGo
aesthetic — pastel cards, pill-labelled panels, typography-heavy layouts.
That look is typically hand-crafted in draw.io. This repo brings it back
into code: one set of React components, one palette, static PNG and
animated MP4 out of the same source.

## Stack

- [Remotion](https://remotion.dev) 4.0.x for programmatic rendering
- React 19 + Tailwind v4 (`@remotion/tailwind-v4`) for styling
- `@remotion/google-fonts` for Inter + JetBrains Mono
- H.264 / yuv420p MP4 output tuned for Twitter/X specs

## Quickstart

```bash
npm install
npx remotion studio                  # live preview
```

Render a still to PNG:

```bash
scripts/render-png.sh Px402Static
scripts/render-png.sh Px402Static tweet-sq
```

Render an animated composition to MP4:

```bash
scripts/render-mp4.sh Px402Animated
scripts/render-mp4.sh Px402Animated tweet-sq
```

Outputs land in `out/`.

## Presets

**PNG** (`scripts/render-png.sh`):

| Preset       | Dimensions    | Use                            |
|--------------|---------------|--------------------------------|
| `blog`       | 1600 x 900    | Blog embed (default, 16:9)     |
| `blog-2x`    | 3200 x 1800   | Retina/high-density            |
| `tweet-sq`   | 1080 x 1080   | Twitter/X square card          |
| `tweet-tall` | 1200 x 1800   | Twitter/X tall card (2:3)      |
| `ultra`      | 3200 x 1800   | Extra-crisp blog hero          |

**MP4** (`scripts/render-mp4.sh`):

| Preset       | Dimensions    | Bitrate | Use                          |
|--------------|---------------|---------|------------------------------|
| `tweet-16x9` | 1920 x 1080   | 8 Mbps  | Twitter/X landscape (default)|
| `tweet-sq`   | 1080 x 1080   | 8 Mbps  | Twitter/X square             |
| `tweet-9x16` | 1080 x 1920   | 12 Mbps | Twitter/X vertical           |
| `blog`       | 1280 x 720    | 4 Mbps  | Embedded in blog post        |

Non-premium X upload limits: <=140 s, <=512 MB, H.264/AAC MP4.

## Project layout

```
src/
  kit/                        design system
    palette.ts                pastel bg/border/text swatches
    fonts.ts                  Inter + JetBrains Mono
    Canvas.tsx                fixed-size absolute-positioning canvas
    Panel.tsx                 framed section with pill-label title
    Card.tsx                  colored rounded card (title + subtitle)
    TreeNode.tsx              B-tree / B+ tree node
    FlowBox.tsx               rounded flow step
    Arrow.tsx                 straight/elbow arrows with optional label + draw-in
    Annotation.tsx            red/gray italic side notes
    Title.tsx                 headline with color accent + right slot
  animation/
    primitives.tsx            Appear, ScaleIn, DrawArrow, Pulse, Hold, Typewriter
  compositions/
    BTreeVsBPlus.tsx          fidelity-test clone (ByteByteGo reference)
    Px402Static.tsx           px402 architecture, static sequence diagram
    Px402Animated.tsx         px402 architecture, 15s MP4 version
  Root.tsx                    registers Still / Composition
  index.ts                    Remotion entry point

scripts/
  render-png.sh               preset-based PNG render
  render-mp4.sh               preset-based MP4 render (H.264, yuv420p)
```

## Adding a new diagram

1. Create `src/compositions/MyDiagram.tsx`. Compose with `Canvas`,
   `At`, `Card`, `TreeNode`, `FlowBox`, `Arrow`, `Annotation`, `Title`.
2. Register it in `src/Root.tsx` as a `<Still>` (for PNG) or
   `<Composition>` (for MP4), or both.
3. Render: `scripts/render-png.sh MyDiagram blog` /
   `scripts/render-mp4.sh MyDiagram tweet-16x9`.

For animated variants: wrap elements in `Appear`, `DrawArrow`,
`Pulse`, or `ScaleIn` from `src/animation`. All animation must go
through `useCurrentFrame()`. CSS `transition`/`animation` and
Tailwind `animate-*` classes don't render correctly in Remotion.

## Palette

Six pastel families sampled from ByteByteGo reference diagrams:
mint, peach, blue, yellow, pink, purple, plus lavender and gray
neutrals. Each family exposes matching `bg`, `border`, and `text`
colors designed to read together. See `src/kit/palette.ts`.

## Conventions

- **No CSS animations.** Every moving thing reads `useCurrentFrame()`.
- **Absolute layout.** `Canvas` + `At` give you deterministic control
  over every pixel, the way ByteByteGo diagrams are hand-placed.
- **One font family active.** Inter for prose, JetBrains Mono for
  addresses / hashes / log fragments.
- **Annotation tones.** Red italic for walkthroughs. Gray italic for
  ambient notes.

## License

Remotion: free for teams of up to 3, otherwise see
[remotion.dev/license](https://www.remotion.dev/docs/license).
Everything else in this repo: MIT.
