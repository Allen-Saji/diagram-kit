import React from "react";
import {
  Canvas,
  At,
  Card,
  Panel,
  FlowBox,
  Arrow,
  Annotation,
  Title,
  Label,
  ink,
} from "../../kit";

export type DiagramKitArchProps = {
  /** Toggle the debug overlay (red bbox outlines + labels on every kit element). */
  debug?: boolean;
};

/**
 * diagram-kit architecture — static.
 *
 * Canvas is 1600x1000. Three column panels:
 *   1. Source (author writes)
 *   2. Scripts (invoke Remotion)
 *   3. Remotion runtime (renders PNG / MP4)
 * With a dashed debug loop arrow feeding back from Scripts to Source.
 */
export const DiagramKitArch: React.FC<DiagramKitArchProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={1000} debug={debug}>
      {/* Title bar */}
      <At x={60} y={40}>
        <div style={{ width: 1480 }}>
          <Title accentColor="blue" rightSlot="diagram-kit · allensaji.dev">
            diagram-kit Architecture
          </Title>
        </div>
      </At>
      <At x={120} y={106}>
        <Label debugId="subtitle" size={17} weight={500} color={ink.muted}>
          React + Remotion kit. One source tree, static PNG and animated MP4 out.
        </Label>
      </At>

      <Body />
    </Canvas>
  );
};

// ------- Body shared between static + animated variants -------

export const PANEL_Y = 180;
export const PANEL_H = 620;

export const COL = {
  source: 60,
  scripts: 580,
  remotion: 1100,
} as const;

export const PANEL_W = 440;

// Cards sit 40px inside the panel horizontally and at these y anchors:
export const ROW = { a: 260, b: 360, c: 460, d: 560, e: 660 } as const;

const CARD_W = 360;

type SlotProps = { x: number; y: number; children: React.ReactNode };
const Slot: React.FC<SlotProps> = ({ x, y, children }) => (
  <At x={x} y={y}>{children}</At>
);

// Inner-x for a given column (panel x + 40 padding)
export const innerX = (col: keyof typeof COL) => COL[col] + 40;

export const Body: React.FC = () => (
  <>
    {/* Panel frames */}
    <Slot x={COL.source} y={PANEL_Y}>
      <Panel
        title="Source (src/)"
        style={{ width: PANEL_W, height: PANEL_H }}
      />
    </Slot>
    <Slot x={COL.scripts} y={PANEL_Y}>
      <Panel
        title="Scripts"
        style={{ width: PANEL_W, height: PANEL_H }}
      />
    </Slot>
    <Slot x={COL.remotion} y={PANEL_Y}>
      <Panel
        title="Remotion runtime"
        style={{ width: PANEL_W, height: PANEL_H }}
      />
    </Slot>

    {/* Source column cards */}
    <Slot x={innerX("source")} y={ROW.a}>
      <Card
        color="purple"
        title="compositions/"
        subtitle="Px402Static, LsmTrees, MyDiagram..."
        align="left"
        style={{ width: CARD_W }}
        debugId="src-compositions"
      />
    </Slot>
    <Slot x={innerX("source")} y={ROW.b}>
      <Card
        color="blue"
        title="kit/"
        subtitle="Canvas, Card, Panel, Arrow, TreeNode..."
        align="left"
        style={{ width: CARD_W }}
        debugId="src-kit"
      />
    </Slot>
    <Slot x={innerX("source")} y={ROW.c}>
      <Card
        color="peach"
        title="animation/"
        subtitle="Appear, DrawArrow, Pulse, Hold, Typewriter"
        align="left"
        style={{ width: CARD_W }}
        debugId="src-animation"
      />
    </Slot>
    <Slot x={innerX("source")} y={ROW.d}>
      <Card
        color="mint"
        title="palette + fonts"
        subtitle="pastel swatches, Inter + JetBrains Mono"
        align="left"
        style={{ width: CARD_W }}
        debugId="src-palette"
      />
    </Slot>
    <Slot x={innerX("source")} y={ROW.e}>
      <Card
        color="yellow"
        title="Root.tsx"
        subtitle="register <Still> / <Composition>"
        align="left"
        style={{ width: CARD_W }}
        debugId="src-root"
      />
    </Slot>

    {/* Scripts column cards */}
    <Slot x={innerX("scripts")} y={ROW.a}>
      <Card
        color="mint"
        title="iterate.sh"
        subtitle="fast 0.5x preview, --debug overlay"
        align="left"
        style={{ width: CARD_W }}
        debugId="script-iterate"
      />
    </Slot>
    <Slot x={innerX("scripts")} y={ROW.b}>
      <Card
        color="peach"
        title="check.mjs"
        subtitle="headless bbox collision checker"
        align="left"
        style={{ width: CARD_W }}
        debugId="script-check"
      />
    </Slot>
    <Slot x={innerX("scripts")} y={ROW.c}>
      <Card
        color="blue"
        title="render-png.sh"
        subtitle="blog / hd / ultra DPI"
        align="left"
        style={{ width: CARD_W }}
        debugId="script-png"
      />
    </Slot>
    <Slot x={innerX("scripts")} y={ROW.d}>
      <Card
        color="pink"
        title="render-mp4.sh"
        subtitle="tweet-16x9 / sq / 9x16 / blog"
        align="left"
        style={{ width: CARD_W }}
        debugId="script-mp4"
      />
    </Slot>

    {/* Remotion column — bundler full-width, then two render pipelines side-by-side */}
    <Slot x={innerX("remotion")} y={ROW.a}>
      <Card
        color="lavender"
        title="@remotion/bundler"
        subtitle="esbuild the composition"
        align="left"
        style={{ width: CARD_W }}
        debugId="remo-bundler"
      />
    </Slot>
    <Slot x={innerX("remotion")} y={380}>
      <Card
        color="mint"
        title="renderStill"
        subtitle="snapshot"
        align="left"
        style={{ width: 170 }}
        debugId="remo-still"
      />
    </Slot>
    <Slot x={innerX("remotion") + 190} y={380}>
      <Card
        color="peach"
        title="renderMedia"
        subtitle="encode"
        align="left"
        style={{ width: 170 }}
        debugId="remo-media"
      />
    </Slot>

    {/* Output FlowBoxes directly below each render primitive */}
    <Slot x={innerX("remotion") + 15} y={500}>
      <FlowBox
        color="blue"
        title=".png"
        subtitle="static"
        width={140}
        height={80}
        debugId="out-png"
      />
    </Slot>
    <Slot x={innerX("remotion") + 205} y={500}>
      <FlowBox
        color="pink"
        title=".mp4"
        subtitle="animated"
        width={140}
        height={80}
        debugId="out-mp4"
      />
    </Slot>

    {/* Source → Scripts */}
    <Arrow
      debugId="src-to-scripts"
      from={{ x: COL.source + PANEL_W, y: 480 }}
      to={{ x: COL.scripts, y: 480 }}
      label="author writes"
      labelOffset={-16}
    />
    {/* Scripts → Remotion */}
    <Arrow
      debugId="scripts-to-remotion"
      from={{ x: COL.scripts + PANEL_W, y: 480 }}
      to={{ x: COL.remotion, y: 480 }}
      label="invokes"
      labelOffset={-16}
    />

    {/* renderStill → .png / renderMedia → .mp4 (direct vertical, no card crossings) */}
    <Arrow
      debugId="still-to-png"
      from={{ x: innerX("remotion") + 85, y: 452 }}
      to={{ x: innerX("remotion") + 85, y: 500 }}
    />
    <Arrow
      debugId="media-to-mp4"
      from={{ x: innerX("remotion") + 275, y: 452 }}
      to={{ x: innerX("remotion") + 275, y: 500 }}
    />

    {/* Debug loop: Scripts bottom → back to Source bottom */}
    <Arrow
      debugId="debug-loop"
      from={{ x: COL.scripts + PANEL_W / 2, y: PANEL_Y + PANEL_H + 10 }}
      to={{ x: COL.source + PANEL_W / 2, y: PANEL_Y + PANEL_H + 10 }}
      waypoints={[
        { x: COL.scripts + PANEL_W / 2, y: PANEL_Y + PANEL_H + 60 },
        { x: COL.source + PANEL_W / 2, y: PANEL_Y + PANEL_H + 60 },
      ]}
      dashed
      color={ink.muted}
    />
    <At x={450} y={PANEL_Y + PANEL_H + 80}>
      <Annotation tone="gray" debugId="note-debug-loop">
        self-correction loop — DebugOverlay emits BBOX::… logs, check.mjs
        flags overlaps, author fixes the composition
      </Annotation>
    </At>
  </>
);
