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
import {
  Appear,
  ScaleIn,
  DrawArrow,
  Pulse,
  Hold,
} from "../../animation";
import {
  PANEL_Y,
  PANEL_H,
  PANEL_W,
  COL,
  ROW,
  innerX,
} from "./DiagramKitArch";

export type DiagramKitArchAnimatedProps = {
  debug?: boolean;
};

const CARD_W = 360;

/**
 * diagram-kit architecture — animated. 15s MP4.
 *
 * Same 3-column layout as DiagramKitArch, staggered in over time:
 *   0.0  title
 *   0.8  Source panel + cards
 *   2.6  arrow to Scripts
 *   2.9  Scripts panel + cards
 *   4.7  arrow to Remotion
 *   5.0  Remotion panel + cards
 *   6.8  output flowboxes
 *   7.5  renderStill/Media → output arrows
 *   8.5  dashed debug loop arrow
 *   9.0  loop annotation
 *  10.0  pulse on output boxes
 */
export const DiagramKitArchAnimated: React.FC<DiagramKitArchAnimatedProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={1000} debug={debug}>
      {/* Title */}
      <Appear at={0.0} duration={0.5} slideY={-10}>
        <At x={60} y={40}>
          <div style={{ width: 1480 }}>
            <Title accentColor="blue" rightSlot="diagram-kit · allensaji.dev">
              diagram-kit Architecture
            </Title>
          </div>
        </At>
      </Appear>
      <Appear at={0.3} duration={0.4}>
        <At x={120} y={106}>
          <Label debugId="subtitle" size={17} weight={500} color={ink.muted}>
            React + Remotion kit. One source tree, static PNG and animated MP4 out.
          </Label>
        </At>
      </Appear>

      {/* Source panel */}
      <Appear at={0.8} duration={0.4} slideY={0}>
        <At x={COL.source} y={PANEL_Y}>
          <Panel
            title="Source (src/)"
            style={{ width: PANEL_W, height: PANEL_H }}
          />
        </At>
      </Appear>

      {/* Source cards, staggered */}
      <Appear at={1.1} duration={0.4}>
        <At x={innerX("source")} y={ROW.a}>
          <Card
            color="purple"
            title="compositions/"
            subtitle="Px402Static, LsmTrees, MyDiagram..."
            align="left"
            style={{ width: CARD_W }}
            debugId="src-compositions"
          />
        </At>
      </Appear>
      <Appear at={1.4} duration={0.4}>
        <At x={innerX("source")} y={ROW.b}>
          <Card
            color="blue"
            title="kit/"
            subtitle="Canvas, Card, Panel, Arrow, TreeNode..."
            align="left"
            style={{ width: CARD_W }}
            debugId="src-kit"
          />
        </At>
      </Appear>
      <Appear at={1.7} duration={0.4}>
        <At x={innerX("source")} y={ROW.c}>
          <Card
            color="peach"
            title="animation/"
            subtitle="Appear, DrawArrow, Pulse, Hold, Typewriter"
            align="left"
            style={{ width: CARD_W }}
            debugId="src-animation"
          />
        </At>
      </Appear>
      <Appear at={2.0} duration={0.4}>
        <At x={innerX("source")} y={ROW.d}>
          <Card
            color="mint"
            title="palette + fonts"
            subtitle="pastel swatches, Inter + JetBrains Mono"
            align="left"
            style={{ width: CARD_W }}
            debugId="src-palette"
          />
        </At>
      </Appear>
      <Appear at={2.3} duration={0.4}>
        <At x={innerX("source")} y={ROW.e}>
          <Card
            color="yellow"
            title="Root.tsx"
            subtitle="register <Still> / <Composition>"
            align="left"
            style={{ width: CARD_W }}
            debugId="src-root"
          />
        </At>
      </Appear>

      {/* Source → Scripts arrow */}
      <DrawArrow
        debugId="src-to-scripts"
        at={2.6}
        duration={0.5}
        from={{ x: COL.source + PANEL_W, y: 480 }}
        to={{ x: COL.scripts, y: 480 }}
        label="author writes"
        labelOffset={-16}
      />

      {/* Scripts panel */}
      <Appear at={2.9} duration={0.4}>
        <At x={COL.scripts} y={PANEL_Y}>
          <Panel
            title="Scripts"
            style={{ width: PANEL_W, height: PANEL_H }}
          />
        </At>
      </Appear>

      <Appear at={3.2} duration={0.4}>
        <At x={innerX("scripts")} y={ROW.a}>
          <Card
            color="mint"
            title="iterate.sh"
            subtitle="fast 0.5x preview, --debug overlay"
            align="left"
            style={{ width: CARD_W }}
            debugId="script-iterate"
          />
        </At>
      </Appear>
      <Appear at={3.5} duration={0.4}>
        <At x={innerX("scripts")} y={ROW.b}>
          <Card
            color="peach"
            title="check.mjs"
            subtitle="headless bbox collision checker"
            align="left"
            style={{ width: CARD_W }}
            debugId="script-check"
          />
        </At>
      </Appear>
      <Appear at={3.8} duration={0.4}>
        <At x={innerX("scripts")} y={ROW.c}>
          <Card
            color="blue"
            title="render-png.sh"
            subtitle="blog / hd / ultra DPI"
            align="left"
            style={{ width: CARD_W }}
            debugId="script-png"
          />
        </At>
      </Appear>
      <Appear at={4.1} duration={0.4}>
        <At x={innerX("scripts")} y={ROW.d}>
          <Card
            color="pink"
            title="render-mp4.sh"
            subtitle="tweet-16x9 / sq / 9x16 / blog"
            align="left"
            style={{ width: CARD_W }}
            debugId="script-mp4"
          />
        </At>
      </Appear>

      {/* Scripts → Remotion arrow */}
      <DrawArrow
        debugId="scripts-to-remotion"
        at={4.7}
        duration={0.5}
        from={{ x: COL.scripts + PANEL_W, y: 480 }}
        to={{ x: COL.remotion, y: 480 }}
        label="invokes"
        labelOffset={-16}
      />

      {/* Remotion panel */}
      <Appear at={5.0} duration={0.4}>
        <At x={COL.remotion} y={PANEL_Y}>
          <Panel
            title="Remotion runtime"
            style={{ width: PANEL_W, height: PANEL_H }}
          />
        </At>
      </Appear>

      <Appear at={5.3} duration={0.4}>
        <At x={innerX("remotion")} y={ROW.a}>
          <Card
            color="lavender"
            title="@remotion/bundler"
            subtitle="esbuild the composition"
            align="left"
            style={{ width: CARD_W }}
            debugId="remo-bundler"
          />
        </At>
      </Appear>
      <Appear at={5.6} duration={0.4}>
        <At x={innerX("remotion")} y={380}>
          <Card
            color="mint"
            title="renderStill"
            subtitle="snapshot"
            align="left"
            style={{ width: 170 }}
            debugId="remo-still"
          />
        </At>
      </Appear>
      <Appear at={5.9} duration={0.4}>
        <At x={innerX("remotion") + 190} y={380}>
          <Card
            color="peach"
            title="renderMedia"
            subtitle="encode"
            align="left"
            style={{ width: 170 }}
            debugId="remo-media"
          />
        </At>
      </Appear>

      {/* Output FlowBoxes directly below each render primitive */}
      <ScaleIn at={6.8} duration={0.5}>
        <At x={innerX("remotion") + 15} y={500}>
          <Pulse at={10.0} duration={0.8} peak={1.08}>
            <FlowBox
              color="blue"
              title=".png"
              subtitle="static"
              width={140}
              height={80}
              debugId="out-png"
            />
          </Pulse>
        </At>
      </ScaleIn>
      <ScaleIn at={7.0} duration={0.5}>
        <At x={innerX("remotion") + 205} y={500}>
          <Pulse at={10.4} duration={0.8} peak={1.08}>
            <FlowBox
              color="pink"
              title=".mp4"
              subtitle="animated"
              width={140}
              height={80}
              debugId="out-mp4"
            />
          </Pulse>
        </At>
      </ScaleIn>

      {/* renderStill → .png / renderMedia → .mp4 (direct vertical) */}
      <DrawArrow
        debugId="still-to-png"
        at={7.5}
        duration={0.4}
        from={{ x: innerX("remotion") + 85, y: 452 }}
        to={{ x: innerX("remotion") + 85, y: 500 }}
      />
      <DrawArrow
        debugId="media-to-mp4"
        at={7.7}
        duration={0.4}
        from={{ x: innerX("remotion") + 275, y: 452 }}
        to={{ x: innerX("remotion") + 275, y: 500 }}
      />

      {/* Debug loop arrow */}
      <DrawArrow
        debugId="debug-loop"
        at={8.5}
        duration={1.0}
        from={{ x: COL.scripts + PANEL_W / 2, y: PANEL_Y + PANEL_H + 10 }}
        to={{ x: COL.source + PANEL_W / 2, y: PANEL_Y + PANEL_H + 10 }}
        waypoints={[
          { x: COL.scripts + PANEL_W / 2, y: PANEL_Y + PANEL_H + 60 },
          { x: COL.source + PANEL_W / 2, y: PANEL_Y + PANEL_H + 60 },
        ]}
        dashed
        color={ink.muted}
      />

      {/* Debug loop annotation */}
      <Hold from={9.0}>
        <Appear at={9.0} duration={0.5}>
          <At x={450} y={PANEL_Y + PANEL_H + 80}>
            <Annotation tone="gray" debugId="note-debug-loop">
              self-correction loop — DebugOverlay emits BBOX::… logs, check.mjs
              flags overlaps, author fixes the composition
            </Annotation>
          </At>
        </Appear>
      </Hold>
    </Canvas>
  );
};
