---
name: diagram-kit
description: Model and render professional software-engineering diagrams, animated explainers, and narrated marketing/demo videos with the React and Remotion toolkit at ~/projects/diagram-kit. Select the correct viewpoint and diagram type, build a typed semantic model, then produce checked PNG or MP4 output. Use for system context, container, component, deployment, sequence, data-flow, threat-model, ERD, state, workflow, network, identity, resilience, architecture, technical explainer, ByteByteGo-style, and product-video requests. Not for editable whiteboards (use excalidraw-diagram instead).
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
- "make a one-pager / poster / pamphlet / carousel / infographic for X"
- "create a product video / marketing video / narrated demo using Diagram Kit"

**Do not invoke for:** interactive/editable whiteboard files, mind maps, flowcharts with loose layout - use `excalidraw-diagram` for those. (A hand-drawn _look_ in a rendered PNG is covered here by `theme="sketch"`.)

## Professional diagram workflow

A professional diagram is a view over a model. It answers one engineering
question for one audience. Do not begin layout, styling, or animation until the
semantic model is coherent.

### 1. Write the diagram contract

Record this internal `DiagramSpec` before composing:

```yaml
question: What must the reader understand or decide?
audience: Who will use this view?
diagram_type: C4 container, sequence, deployment, DFD, ERD, state, etc.
notation: C4, UML, BPMN, IDEF1X, informal-but-declared, etc.
scope: System of interest and explicit inside/outside boundary
abstraction: conceptual, logical, implementation, runtime, or deployment
time_reference: AS-IS, TO-BE, or scenario-specific
evidence: Files, code, infrastructure, APIs, and primary sources inspected
assumptions: Facts not yet verified
omissions: Details intentionally excluded
nodes:
  - id: stable-id
    type: person, system, container, component, process, store, entity, etc.
    name: Exact source-backed name
    responsibility: One short purpose
    technology: Include only when the selected view requires it
    boundary: Owning system, trust zone, network, runtime, or team
edges:
  - from: stable-id
    to: stable-id
    type: call, event, data-flow, dependency, transition, association, etc.
    label: Precise direction-compatible phrase
    protocol: Include when relevant at this abstraction
boundaries:
  - id: stable-boundary-id
    type: system, ownership, trust, network, deployment, or region
    contains: [stable-id]
legend: Meanings of non-obvious shapes, colors, borders, and line styles
```

Never invent a component, interaction, protocol, datastore, boundary, metric,
failure path, or deployment fact to make the canvas look complete. Mark an
assumption or ask for missing evidence when it would materially change the
model.

### 2. Select the view from the reader's question

Use the smallest purposeful set of views. If the question or audience changes,
create another coordinated diagram instead of overloading one canvas.

| Reader question                                          | Primary view                     | Required content                                                                                                                | Exclude                                                |
| -------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Who uses the system, and what is outside it?             | C4 system context                | System as one black box, people, external systems, labeled relationships, explicit scope boundary                               | Internal services, classes, deployment nodes           |
| What runnable units and stores make up one system?       | C4 container                     | Applications and datastores, responsibilities, technologies, labeled communication                                              | Classes, replicas, detailed request chronology         |
| How is one container internally structured?              | C4 or UML component              | One container boundary, components, interfaces, responsibilities, dependencies                                                  | Cloud topology and unrelated systems                   |
| What happens during one runtime scenario?                | UML-style sequence or C4 dynamic | Participants, top-to-bottom order, calls, events, returns when useful, alternatives, retries, failures                          | Static ownership hierarchy                             |
| Where does software run?                                 | Deployment                       | Environments, regions, nodes, execution runtimes, deployed artifacts or instances, network paths                                | Business workflow                                      |
| How is the network segmented and connected?              | Network topology                 | Internet ingress/egress, accounts, regions, VPC/VNet, subnets, gateways, east-west or north-south paths                         | Application internals unrelated to connectivity        |
| How does data enter, transform, rest, and leave?         | DFD or data lineage              | External entities, processes, stores, named data flows, classifications, trust-boundary crossings                               | Control-flow order and decision diamonds               |
| What data facts and constraints persist?                 | ERD                              | Entities, keys, relevant attributes, relationships, cardinality, optionality                                                    | Servers, cloud regions, request order                  |
| What states can one subject occupy?                      | State machine                    | Initial state, stable conditions, event/guard/action transitions, terminal states                                               | Components joined by generic flow arrows               |
| What decisions and parallel steps form a workflow?       | Activity or flowchart            | Verb-led actions, decisions, labeled branches, forks/joins, explicit outcomes                                                   | Deployment topology                                    |
| Which independent business participants exchange work?   | BPMN collaboration               | Pools as participants, lanes as partitions, events, activities, gateways, sequence flow inside pools, message flow across pools | Data models and infrastructure                         |
| What goals does an external role expect from the system? | Use-case                         | Actors as roles, system boundary, externally valuable behaviors                                                                 | Screen order and implementation steps                  |
| What static code types or modules relate?                | UML class, package, or module    | Typed static relationships, attributes/operations only when useful, multiplicity where relevant                                 | Runtime calls presented as static dependencies         |
| What does a user do across interfaces and services?      | User journey or user flow        | Persona, steps, touchpoints, decisions, pain points, service handoffs                                                           | Low-level infrastructure unless it affects the journey |
| How do failure and recovery work?                        | Resilience view                  | Failure domains, redundancy, failover paths, degraded modes, RPO/RTO where verified                                             | Unrelated happy-path detail                            |
| Where are identity and authorization decisions made?     | Identity/access flow             | Principal, token issuer, policy decision/enforcement points, credential/token movement, trust changes                           | Generic system arrows with no auth semantics           |

Use C4 system context and container views as the default pair for general
software architecture. Add component, dynamic, deployment, security, data, or
resilience views only when they answer a distinct question.

### 3. Build and lint the semantic model

Apply these checks before choosing coordinates:

- **Viewpoint purity.** Keep one primary concern and one abstraction level.
  Reuse neighboring-level elements only as clearly marked context.
- **Typed elements.** Give every node a type, stable ID, exact name, and short
  responsibility. Do not let a generic `Card` erase what the element means.
- **Directed relationships.** Use one arrow per direction. Label non-obvious
  edges with a precise verb phrase, data noun, event, protocol, dependency, or
  transition. Avoid vague labels such as `uses` and `talks to`.
- **Real boundaries.** Group only by actual system, ownership, trust, network,
  deployment, region, or process boundaries. Decorative grouping is not a
  boundary.
- **Evidence.** Trace every factual node, edge, boundary, metric, and claim to
  inspected evidence or mark it as an assumption.
- **Completeness for the stated question.** Include relevant entry, success,
  failure, retry, timeout, async consumer, external dependency, and
  system-of-record behavior. Do not add unrelated detail.
- **Cross-view consistency.** Reuse IDs, names, responsibilities, and boundary
  ownership across structural, runtime, deployment, data, and security views.
- **Notation honesty.** Use `C4`, `UML`, `BPMN`, or `IDEF1X` in the title only
  when their semantics are followed. Otherwise label the view as
  `C4-style`, `UML-style`, `BPMN-style`, or `informal architecture`.

Type-specific invariants:

- **C4:** Do not mix system, container, component, and code levels. Context
  treats the system as a black box. Containers are independently runnable or
  deployable applications and datastores, not arbitrary modules. State
  responsibility and technology where known.
- **Sequence:** Time runs downward, but vertical distance does not imply
  duration. Keep events ordered per participant. Distinguish synchronous calls,
  async messages, and replies. Make `alt`, `opt`, `loop`, retry, timeout, and
  failure behavior explicit when relevant.
- **Deployment:** Nest artifacts or instances inside the nodes that execute
  them. Keep type-level and instance-level views distinct. Label environment,
  network/trust boundaries, direction, and protocol where known.
- **DFD:** Distinguish external entity, process, store, and data flow. Name
  arrows with data, not control verbs. Do not imply chronology, decisions, or
  concurrency. Parent and child levels must preserve external inputs/outputs.
- **ERD:** Use singular-noun data entities, not servers or workflows. Show keys,
  relevant attributes, relationship cardinality, and optionality at both ends.
  Resolve many-to-many relationships in logical or physical models.
- **State machine:** Name states as stable conditions, not actions. Label
  transitions as `event [guard] / effect`. Show initial and terminal behavior.
  Do not substitute a workflow when lifecycle semantics are the question.
- **Activity/process:** Name work as verb phrases and decisions as questions.
  Label every outgoing branch. Pair forks with joins and give every path an
  explicit outcome. Do not assume page position creates execution order.
- **BPMN:** Sequence flow stays within one pool; message flow crosses between
  pools. Pools are independent participants, lanes are partitions, and
  gateways control routing rather than perform work.
- **Static code views:** Distinguish dependency, association, implementation,
  inheritance, aggregation, composition, and containment. Do not use a runtime
  message arrow for a static relationship.

### 4. Derive layout from semantics

- Pick one dominant reading direction. Use left-to-right for pipelines and
  request/data flow, top-to-bottom for hierarchy and decomposition, and
  top-to-bottom lifelines for temporal interaction.
- Keep the primary path monotonic. Put elements at the same logical stage on
  the same rank.
- Order nodes to reduce edge crossings and edge length before adding waypoints.
  Increase spacing before shrinking text.
- Use orthogonal elbows for block, network, and deployment topology. Use direct
  lines for simple flows. Do not mix routing styles unless the styles carry
  declared meaning.
- Route around nodes, labels, and boundaries. Connect at the nearest sensible
  edge, not through the center of unrelated content.
- Use containment only for real ownership or execution. Use proximity for
  association, alignment for equivalence or stage, and whitespace to separate
  concerns.
- Keep conceptual diagrams vendor-neutral. Use current official icons and exact
  service names only in provider-specific implementation or deployment views.
  Never stretch, recolor, rotate, or substitute vendor marks for generic
  concepts.
- Use color as redundant reinforcement, never as the only semantic channel.
  Add a compact legend whenever color, shape, border, arrowhead, or line style
  carries meaning.
- Split the view when the main question, audience, abstraction, relationship
  semantics, or reading direction stops being singular.

### 5. Run professional review gates

A render is deliverable only when all gates pass:

1. **Intent gate:** The title states diagram type and scope. The audience,
   question, time reference, evidence, assumptions, and omissions are known.
2. **Modeling gate:** The selected view answers the question. Typed nodes,
   relationships, and boundaries pass the general and type-specific checks.
3. **Abstraction gate:** Mixed levels or multiple primary concerns have been
   split into coordinated views.
4. **Notation gate:** Shapes and edges follow the declared notation. The legend
   explains every non-obvious visual encoding.
5. **Geometry gate:** Every placed primitive and meaningful arrow has a unique
   `debugId`; `node scripts/check.mjs <Name>` passes. This proves geometry only.
6. **Visual gate:** Inspect the final render at native size and intended
   publishing size. Confirm reading order, labels, arrow direction, boundary
   containment, contrast, and legibility.
7. **Delivery gate:** Record the diagram type, evidence basis, freshness,
   assumptions, and output path. Retire or update views that no longer answer
   their stated question accurately.

## Build and render workflow

The repo is a pnpm monorepo:

```
~/projects/diagram-kit/
  packages/diagram-kit/   <- the library (@allen-saji/diagram-kit)
  apps/playground/        <- Remotion studio app, consumes the lib via workspace:*
  private/                <- Allen-only, gitignored: personal project diagrams + assets
  scripts/                <- iterate, check, render-png, render-mp4, render-via-api
```

1. **Gather evidence and complete the `DiagramSpec`.** If it's a known project, read `~/Brain/Projects/<name>/` (design docs, architecture notes) and inspect the implementation or deployment sources that support the view. Select the theme only after the semantic model is stable: `"light"` (default, BBG-canonical pale-mint bg) for blog/Twitter heroes; `"dark"` for protocol/CLI/security topics where neon-on-dark reads better; `"sketch"` for hand-drawn explainers (graph paper, hand font, wobbly borders); `"legacy"` only when reproducing or extending a previously-published diagram whose look must match.
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

Never skip the semantic review or step 5 on a new composition. `check.mjs`
detects geometry defects; it cannot prove that the diagram type, abstraction,
edge meaning, boundaries, chronology, cardinality, or architecture are correct.

## Marketing-video workflow

Use this workflow when the user asks for a product video, launch video, demo
video, narrated walkthrough, or social clip. Diagram Kit supplies reusable
visual scenes inside a direct Remotion composition; it does not replace the
product's real interface or brand.

1. **Inspect before scripting.** Read the product README, landing-page theme,
   real flows, verified metrics, and existing media. Do not invent traction or
   performance claims.
2. **Lock the story.** Define one viewer, one action, the problem, the product
   reveal, proof, CTA, target platform, aspect ratio, and maximum duration.
3. **Write narration first.** Keep the script fast and concrete. Generate or
   record the voice track before scene animation, then derive scene starts from
   actual audio timestamps. ElevenLabs word or character alignment can be
   stored as JSON and consumed by Remotion.
4. **Build with the product's visual system.** Reuse its colors, type, logo,
   screenshots, and copy. Use Diagram Kit `FeatureCard`, `FlowBox`,
   `TerminalCard`, `StepBadge`, `Glyph`, `Arrow`, and animation primitives for
   architecture, flow, verification, terminal, and metric scenes.
5. **Keep motion deterministic.** Use `useCurrentFrame()`, Diagram Kit motion
   primitives, and Remotion sequences or transitions. Never use CSS animation.
6. **Treat captions as opt-in.** Do not burn captions into the video unless the
   user explicitly requests them. A separate SRT can be generated when needed.
7. **Store video work centrally.** Put source and outputs under a shared video
   workspace such as `~/projects/project-demos/<project-name>/`, never inside
   the product source repository. Reuse one pnpm workspace and package store.
8. **Verify delivery.** Inspect representative frames, run TypeScript checks,
   probe the final media for resolution, frame rate, codecs, duration, and
   audio/video start and end alignment, then open the final MP4 for review.

For a typical 60-90 second product demo, use a problem-demo-result structure:

```text
Hook -> Problem -> Product reveal -> Working flow -> Verification -> Proof -> CTA
```

Prefer one visual idea per scene and change the screen every 4-10 seconds. Use
faster changes during the working flow and longer holds only for proof or CTA
frames that need to be read.

## Kit API reference

All kit primitives ship from `packages/diagram-kit/`. Inside any composition (public or private), import from the library entry:

```tsx
import {
  Canvas,
  At,
  Card,
  Arrow,
  Title /* ... */,
} from "@allen-saji/diagram-kit";
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
<FlowBox
  color="peach"
  title="Memtable"
  subtitle="sorted in-memory"
  debugId="memtable"
/>
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
<Annotation tone="red" debugId="note-1">
  1. Agent requests resource
</Annotation>
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
<CodeBlock
  color="blue"
  lang="ts"
  width={720}
  debugId="code-poll"
>{`async function poll() {
  const res = await fetch("/inbox");
}`}</CodeBlock>
```

Props: `children` (string, required), `color` (PaletteColor, default `gray`), `lang?` (small uppercase tag in the corner), `size` (default 16), `width?`, `padding`, `radius`, `style`, `debugId?`.

### TerminalCard

Black terminal-window card with macOS-style traffic-light dots and a monospace body. Use for CLI output, shell sessions, log fragments.

```tsx
<TerminalCard
  title="poll.log"
  width={720}
  height={260}
  debugId="term-out"
>{`[12:00:00] GET /inbox -> 200
[12:00:05] GET /inbox -> 200`}</TerminalCard>
```

Props: `children` (string, required), `title?`, `size` (default 15), `width?`, `height?`, `padding`, `radius`, `style`, `debugId?`.

### SwimLanes

Sequence-diagram swim lanes — header cards per actor + dashed vertical lifelines. Place `Card`s, `Arrow`s, and `StepBadge`s inside the same Canvas using `lanes[i].x` to align with each lane.

```tsx
const LANE = { sarah: 280, db: 800, alex: 1320 };
<SwimLanes
  lanes={[
    {
      id: "sarah",
      title: "Sarah",
      subtitle: "writer A",
      color: "pink",
      x: LANE.sarah,
    },
    {
      id: "db",
      title: "Database",
      subtitle: "row v=1",
      color: "blue",
      x: LANE.db,
    },
    {
      id: "alex",
      title: "Alex",
      subtitle: "writer B",
      color: "mint",
      x: LANE.alex,
    },
  ]}
  headerY={150}
  lifeline={{ top: 230, bottom: 800 }}
/>;
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
    {
      id: "build",
      label: "Build",
      icon: <span>B</span>,
      color: "mint",
      content: <Card debugId="build-card" color="mint" title="javac" />,
    },
    {
      id: "load",
      label: "Load",
      icon: <span>L</span>,
      color: "blue",
      content: <Card debugId="load-card" color="blue" title="ClassLoader" />,
    },
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

### Glyph

Lineal-color topic icon — the BBG-style icon illustrations. Fixed 80x80 viewBox artwork in a locked house style (near-black ink outlines, accent + light fills from the active swatch), so the same glyph recolors per semantic section.

```tsx
<Glyph name="llm" color="mint" size={72} label="LLM" />
<Glyph name="vector-db" color="blue" size={28} />   {/* inline next to a label */}
```

Props: `name` (required `GlyphName`), `color` (default `gray`), `size` (default 64), `label`, `labelSize` (default 14), `style`, `debugId?`.

Registry (`GLYPH_NAMES` exports the list):

- Actors, AI, and existing concepts: `user`, `user-query`, `agent`, `llm`, `embedding`, `vector-db`, `knowledge-graph`, `doc`, `retrieval`, `filter`, `api`, `chat`, `report`, `server`, `lock`, `shield`, `coin`, `gauge`, `clock`, `wallet`, `chain`.
- Clients and interfaces: `browser`, `mobile`, `terminal`, `code`.
- Compute and runtime: `cloud`, `container`, `cluster`, `function`, `worker`.
- Data and storage: `database`, `storage`, `object-storage`, `cache`.
- Messaging and integration: `queue`, `topic`, `event-bus`, `webhook`.
- Networking and delivery: `internet`, `dns`, `api-gateway`, `load-balancer`, `cdn`, `firewall`.
- Engineering workflow: `repository`, `git-branch`, `pull-request`, `pipeline`, `package`, `test-suite`.
- Observability: `logs`, `metrics`, `traces`, `alert`.
- Configuration and identity: `config`, `secret`, `identity`.

**Glyph policy.** Three asset classes, never mixed: house glyphs for _concepts_ (this registry), `BrandIcon` for _companies_ (real trademark SVGs), `StatusIcon`/`StepBadge` for micro-marks. Nouns and actors get glyphs; verbs and flows stay arrows with labels. One glyph per card: hero size (56-96) inside step/feature cards, small (20-32) inline, none in dense text panels. When a composition needs a missing noun, add its renderer to the matching category module under `kit/glyphs/` following the style spec in `Glyph.tsx` (4px ink outlines, 3px inner details, 2.5px fine lines at 0.45 opacity, rounded joins) and it joins the registry.

### BrandIcon

Real trademark logo tile. The kit takes the `{path, hex, title}` shape — install `simple-icons` in the consuming app and pass its exports straight through. Never hand-draw a trademark.

```tsx
import { siGithub } from "simple-icons";
<BrandIcon icon={siGithub} label="GitHub" size={34} />          // white chip tile, brand color
<BrandIcon icon={siGithub} chip={false} color="#242A35" />      // bare mark, single ink
```

Props: `icon` (required `BrandIconData = {path, hex?, title?}`), `size` (default 28), `chip` (default true), `color` (default brand hex, else ink), `label`, `labelSize` (default 13), `style`, `debugId?`.

### PillTitle

Solid rounded pill headline — BBG's numbered listicle-panel titles and layer titles. Place standalone, or straddle a `Panel`'s top border with `At` + `anchor="center"` (Panels carry no debugId, so the overlap doesn't trip the checker).

```tsx
<PillTitle number={1}>Splitting Early</PillTitle>          {/* black pill */}
<PillTitle tone="mint">Context Engineering</PillTitle>     {/* accent pill */}
```

Props: `children` (required), `number`, `tone` (`"ink"` (default) | `PaletteColor`), `size` (default 22), `style`, `debugId?`.

### BulletList

Feature-card bullet copy — short lines with a small colored marker.

```tsx
<BulletList color="mint" items={["Skills as reusable workflows", "Built in vs external skills"]} />
<BulletList color="peach" marker="check" items={["Live on devnet", "203 tests green"]} />
```

Props: `items` (required `ReactNode[]`), `color` (default `mint`), `marker` (`dot` (default) | `dash` | `check`), `size` (default 16), `gap` (default 10), `width`, `style`, `debugId?`.

### FeatureCard

Product one-pager card: pill title + bullets + optional media thumbnail on a white surface with a soft border. Six of these in a grid + `PageHeader`/`PageFooter` is a complete promo page.

```tsx
<FeatureCard
  title="MCP & Agentic Tooling"
  color="mint"
  width={680}
  bullets={["MCP server and client architecture", "Tool calling reliability"]}
  media={
    <div
      style={{
        width: "100%",
        height: 190,
        background: "#DFF1E7",
        borderRadius: 12,
      }}
    >
      ...
    </div>
  }
/>
```

Props: `title` (required), `number`, `color` (default `mint`), `pillTone` (defaults to `color`; pass `"ink"` for black pills), `bullets`, `children`, `media` (any node — a Glyph tile, an image, a scaled-down composition), `mediaPosition` (`right` (default) | `bottom`), `mediaWidth` (default 45% of width), `width` (required), `height`, `padding` (default 22), `bulletSize` (default 16), `style`, `debugId?`.

### PageHeader / PageFooter

Page-format headline and closing bands. Use `Title` for diagram headlines with the accent bar; use these for pamphlet / one-pager / poster pages.

```tsx
<PageHeader
  width={1500}
  title={<>Build With <span style={{ color: "#C8431F" }}>Claude Code</span></>}
  subtitle="2-Day Intensive · Cohort-Based Course"
/>
<PageFooter width={1500} left={<>◆ diagram-kit</>} right={<>github.com/Allen-Saji/diagram-kit</>} />
```

PageHeader props: `title` (required), `subtitle`, `align` (`center` (default) | `left`), `width` (required), `titleSize` (default 52), `subtitleSize` (default 21), `style`, `debugId?`.
PageFooter props: `left`, `right`, `width` (required), `size` (default 19), `divider` (default true), `style`, `debugId?`.

### IconGrid

Captioned icon grid — the "Customer 360" treatment: many small icons, tiny captions, tight grid. String items resolve through the Glyph registry; pass nodes for brand logos.

```tsx
<IconGrid
  cols={8}
  color="blue"
  items={[
    { icon: "report", caption: "Sales" },
    { icon: "chat", caption: "Service" },
    {
      icon: <BrandIcon icon={siGithub} chip={false} size={32} />,
      caption: "GitHub",
    },
  ]}
/>
```

Props: `items` (required `{icon: GlyphName | ReactNode, caption}[]`), `cols` (required), `cellWidth` (default 104), `color` (default `gray`), `iconSize` (default 40), `captionSize` (default 13), `gapX` (default 8), `gapY` (default 18), `style`, `debugId?`.

**Container debugId rule:** when an `IconGrid` (or any tracked primitive) sits _inside_ a `BandStack`/`FeatureCard` that already has a debugId, give only one of them the id - parent + child both tracked reads as a collision.

### BandStack

Horizontal layer bands with an optional left label rail + leader lines — the enterprise architecture slide layout ("System of engagement / agency / work / context"). Single-hue palettes (all bands one color) give the corporate register; mixed palettes read BBG.

```tsx
<BandStack
  width={1760}
  railWidth={300}
  bands={[
    {
      rail: "System of engagement",
      color: "blue",
      height: 130,
      title: "Chat Surface",
      content: <>...</>,
    },
    { rail: "Trust layer", height: 110, content: <>...</> }, // no color = white surface
  ]}
/>
```

Props: `bands` (required `Band[] = {rail?, title?, content?, color?, height?}`), `width` (required), `railWidth` (default 220; 0 hides the rail), `gap` (default 18), `bandPadding` (default 18), `railSize` (default 19), `style`, `debugId?`.

### MiniChart

Small annotated narrative chart — the "cost to change vs what we know" curve panels. Deliberately minimal: no ticks or gridlines, two end labels, smooth ease curves, optional dashed marker. Not a data-viz tool.

```tsx
<MiniChart
  variant="line" w={420} h={280}
  series={[
    { label: "cost to change", color: "pink", points: [1, 1.6, 5.4, 7.8] },
    { label: "what we know", color: "mint", points: [0.6, 1.1, 4.2, 6.2] },
  ]}
  xLabels={["Early", "Mature"]}
  marker={{ at: 0.2, label: "split here", color: "mint" }}
/>
<MiniChart variant="bar" w={220} h={280} bars={[{ label: "p50", value: 12, color: "mint" }]} />
```

Props: `variant` (`line` (default) | `bar`), `w`/`h` (required), `series` (`{label?, color, points: number[]}[]`; values auto-normalize to the global max), `bars` (`{label?, value, color?}[]`), `xLabels` (`[start, end]`), `marker` (`{at: 0..1, label, color?}` — dashed vline + pill + dots where it crosses each series), `showValues` (bar variant, default true), `legend` (default on when >1 labeled series), `style`, `debugId?`.

Keep line series to 3-5 points — each point adds an ease step, and too many reads as wobble instead of a sweep.

### Page templates

Full-page compositions that own their `Canvas`. Import from the same entry.

**ListiclePoster** — "Top N Anti-Patterns" pages: title row + dashed panel grid, numbered pills straddling each panel's top border.

```tsx
<ListiclePoster
  w={1600}
  h={1560}
  title="Top Anti-Patterns in Service Architecture"
  rightSlot="brand"
  cols={2}
  panels={[
    {
      title: "Splitting Early",
      content: (box) => <>{/* At coords are panel-local */}</>,
    },
  ]}
/>
```

Props: `title`, `accentColor` (default `mint`), `rightSlot`, `panels` (`{title, number? (auto), tone?, content: ReactNode | (box) => ReactNode}[]`), `cols` (default 2), `w`/`h`, `theme`, `debug`, `margin` (default 48), `gap` (default 56).

**ProductOnePager** — promo page: centered `PageHeader`, FeatureCard grid, `PageFooter`.

```tsx
<ProductOnePager
  w={1600} h={1400}
  header={{ title: <>Ship Diagrams <span style={{ color: "#C8431F" }}>as Code</span></>, subtitle: "..." }}
  features={[{ title: "Glyph Registry", color: "mint", bullets: [...], media: <>...</> }]}
  footer={{ left: <>◆ diagram-kit</>, right: <>github.com/...</> }}
/>
```

Props: `header` (required), `features` (required `OnePagerFeature[]` — FeatureCard props minus width/height), `cols` (default 2), `footer`, `accentColor` (default `mint`), `w`/`h`, `theme`, `debug`, `margin` (default 50), `gap` (default 28).

**ComparisonColumns** — "RAG vs Agentic RAG vs Graph RAG" pages: accent pill per column, pale wash of the same accent behind each column's content. Tint each column's glyphs to the column color.

```tsx
<ComparisonColumns
  w={1600}
  h={1150}
  columns={[{ title: "RAG", color: "blue", content: (box) => <>...</> }]}
/>
```

Props: `columns` (required `{title, color, content}[]`), `w`/`h`, `theme`, `debug`, `margin` (default 40), `gap` (default 36), `washOpacity` (default 0.42).

### Palette + theme

```ts
type PaletteColor =
  | "mint"
  | "peach"
  | "blue"
  | "yellow"
  | "pink"
  | "purple"
  | "lavender"
  | "gray";
```

Four themes ship: `light` (default, recalibrated BBG saturation), `dark` (neon-on-dark, mostly-hollow cards), `legacy` (original kit hex values), and `sketch` (light palette on a graph-paper page, hand-drawn font swapped in via CSS variables, wobbly asymmetric border radius on `Card`/`Panel`/`FlowBox`/`FeatureCard` — see `sketchRadius()` in theme.ts). Each `palette[color]` is a `Swatch = { bg, border, text }`.

The active palette is selected by the `theme` prop on `<Canvas>`. **Don't import `palette`/`ink`/`frame` directly from `../kit` for use inside a primitive** — read them from theme context instead so the same component works under any theme:

```ts
import { useSwatch, useInk, useFrame, useAnnotation } from "../kit";

const p = useSwatch("blue"); // current theme's blue swatch
const ink = useInk(); // { heading, body, muted, arrow }
const frame = useFrame(); // { border, bg, pageBg }
const annot = useAnnotation(); // { red, gray, redMuted }
```

The bare `palette`, `ink`, `frame`, `annotation` exports still resolve to the light variants for back-compat. Source of truth: `packages/diagram-kit/src/kit/palette.ts` + `packages/diagram-kit/src/kit/theme.ts`.

### Fonts

`fonts.sans` (Inter), `fonts.sansItalic`, `fonts.mono` (JetBrains Mono — use for addresses, hashes, log fragments), `fonts.hand` (Patrick Hand — the sketch-theme face).

`fonts.sans`/`fonts.sansItalic` resolve through CSS variables (`var(--dk-font-sans, Inter)`), which is how `theme="sketch"` swaps every primitive to the hand font by setting the variable at the Canvas root — no primitive opts in individually. `fontFamilies` exports the raw loaded family names without the indirection.

### Canvas presets

Named dimension sets for the publishing surfaces this kit targets. Spread directly into `<Canvas>`:

```tsx
import { canvasPresets } from "@allen-saji/diagram-kit";

<Canvas {...canvasPresets.bbgBlogInline} debug={debug}>
  ...
</Canvas>;
```

| Preset             | Dims (w x h) | Use                                                    |
| ------------------ | ------------ | ------------------------------------------------------ |
| `bbgBlogInline`    | 1456 x 819   | 16:9 hero asset for inline blog placement              |
| `bbgTallPoster`    | 2484 x 3002  | Tall poster format for vertical comparison posts       |
| `bbgLandscapeArch` | 2472 x 1912  | Wide architecture diagrams (LB + JVM + storage stacks) |
| `poster`           | 1600 x 2000  | Listicle / layered-arch poster pages                   |
| `slide`            | 1920 x 1080  | 16:9 presentation slide / video-frame page             |
| `carousel`         | 1080 x 1350  | LinkedIn / X carousel card (4:5 portrait)              |
| `a4`               | 1240 x 1754  | A4 at 150dpi - render `hd` (2x) for print-ready 300dpi |

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

| Script                                                                       | Usage                                               | Output                            |
| ---------------------------------------------------------------------------- | --------------------------------------------------- | --------------------------------- |
| `bash scripts/iterate.sh <Name> [--debug] [--full]`                          | Fast 0.5x preview                                   | `out/iter/<Name>[.debug].png`     |
| `node scripts/check.mjs <Name> [--min-area=N]`                               | Headless collision check                            | JSON report + exit 1 on overlap   |
| `bash scripts/render-png.sh <Name> [blog\|hd\|4k\|ultra\|8k]`                | Final PNG                                           | `out/<theme>/<Name>-<preset>.png` |
| `bash scripts/render-mp4.sh <Name> [tweet-16x9\|tweet-sq\|tweet-9x16\|blog]` | Final MP4, H.264/yuv420p                            | `out/<theme>/<Name>-<preset>.mp4` |
| `node scripts/render-via-api.mjs <Name> <out-path> [scale]`                  | Node-API render fallback when CLI misbehaves        | as specified                      |
| `pnpm dev`                                                                   | Live preview UI (Remotion studio)                   | http://localhost:3000             |
| `pnpm test:check`                                                            | Run check.mjs against every public fidelity example | exit 1 on any overlap             |

PNG resolution by preset (canvas → output):

| Preset  | Multiplier | 1600x1100 canvas | 1920x1080 canvas | When to use                                                                                                                  |
| ------- | ---------- | ---------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `blog`  | 1x         | 1600x1100        | 1920x1080 (FHD)  | Inline blog asset, small embeds                                                                                              |
| `hd`    | 2x         | 3200x2200        | 3840x2160 (UHD)  | Default Twitter/X hero, retina display                                                                                       |
| `4k`    | auto       | 3840x2640        | 3840x2160        | Guarantees >=3840px wide regardless of canvas - use when posting to platforms that compress aggressively (Twitter, LinkedIn) |
| `ultra` | 3x         | 4800x3300        | 5760x3240        | Print, ultra-wide displays                                                                                                   |
| `8k`    | auto       | 7680x5280        | 7680x4320        | Archive / poster print                                                                                                       |

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
- **Glyph policy.** Concepts get `Glyph` (house lineal-color registry), companies get `BrandIcon` (never hand-draw a trademark), micro-marks get `StatusIcon`/`StepBadge`. Nouns/actors get glyphs; verbs/flows stay arrows. One glyph per card - hero size (56-96) in step/feature cards, small (20-32) inline. Missing a noun? Add it to the matching category module under `kit/glyphs/` per the style spec in `Glyph.tsx`.
- **One tracked container per region.** `IconGrid` inside a `BandStack` (or similar nesting): give the debugId to one of them, not both — parent + child both tracked reads as a collision, same reason `Panel` takes no debugId.
- **No CSS transitions.** All motion via `useCurrentFrame()` — enforced by Remotion's rendering model, not an aesthetic choice.
- **Mono font for technical strings.** Addresses, tx hashes, CLI output, endpoints.

## Component fidelity probes and project compositions

Use these to learn component APIs, layout mechanics, and rendering patterns.
They are visual probes, not semantic modeling authorities. Build and review the
`DiagramSpec` independently before copying any arrangement or claim. Public
examples live under `apps/playground/src/examples/`; Allen-personal project
compositions live under `private/projects/`.

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
- **Lifelines visible through on-lane cards.** Sequence-diagram lifelines (dashed vertical lines) are rendered without `debugId` since they legitimately span the full diagram height. But any `Card` placed _on_ a lane (e.g. "Crank11 pops queue" on the PER lane) must have a **solid fill** - do NOT use `outline` mode for lane cards, because `outline` sets the card background to transparent and the dashed lifeline will show through the card body. The checker can't catch this geometrically; it's a rendering-order issue. Rule of thumb: `outline` cards only for elements _off_ the lanes.
- **Canvas dimensions must match the render preset.** Setting `<Canvas w=1600 h=1000>` and rendering via `render-mp4.sh <comp> tweet-16x9` (which targets 1920x1080) causes Remotion to letterbox or pad the mismatch, producing empty space in the final video. Match canvas dims to the intended preset from the start: `tweet-16x9` → 1920x1080, `tweet-sq` → 1080x1080, `tweet-9x16` → 1080x1920, `blog` PNG → any 16:10-ish ratio is fine. For static PNGs, any dims work since the composition is rendered at its native size. For MP4s, always pick canvas dims that match a preset.
- **Animated compositions render at final frame for checks.** `check.mjs` automatically uses `composition.durationInFrames - 1` when durationInFrames > 1. This avoids spurious collisions from in-flight `Appear` / `ScaleIn` translates during the first few frames. For still compositions, it renders frame 0.
- **Long text overflowing `FlowBox`.** `FlowBox` is fixed `width` × `height`. Use `Card` (inline-flex, sizes to content) when content is variable-length.
- **`check.mjs` does NOT catch text-on-text overlap inside arrow labels.** Arrow labels (and any element marked `data-dk-skip`) are excluded from collision detection because labels legitimately float on arrow paths. If your arrow label is a multi-element group (label pill + sublabel below it, or label + inline badge), the checker won't notice when the elements overlap each other or sit on top of nearby cards. Always **visually verify** zoomed renders of any custom multi-line label group. Common breakage: making the main label pill taller (border, larger padding, pill radius) without re-spacing the sublabel that sits at `labelAt.y + 22` — the new pill engulfs the sublabel. Fix: top-anchor the sublabel (`transform: "translate(-50%, 0)"`) and bump the y offset to clear the pill's actual rendered height. Also confirm the whole label group sits in empty space — `labelAt.y` close to a card's top will push a top-anchored sublabel into the card.
- **Unicode in labels.** Avoid em dashes and fancy quotes in titles — stick to ASCII for portability across font stacks.

## Maintenance

This skill is a reference snapshot of the kit's surface area. When new primitives are added, new props land, or conventions change in `~/projects/diagram-kit/`, update this file **and** mirror it to `~/projects/diagram-kit/SKILL.md` so the OSS repo's skill stays in sync. The kit's source of truth is the repo; this skill is the shortcut.
