import React from "react";
import {
  Annotation,
  Arrow,
  At,
  Canvas,
  Card,
  FeatureCard,
  FlowBox,
  Glyph,
  Label,
  Panel,
  Title,
  ink,
} from "@allen-saji/diagram-kit";

export type DiagramKitArchitectureProps = {
  debug?: boolean;
};

const exactBox = {
  boxSizing: "border-box",
} as const;

export const DiagramKitArchitecture: React.FC<DiagramKitArchitectureProps> = ({
  debug = false,
}) => (
  <Canvas w={1600} h={900} debug={debug} theme="light">
    <At x={60} y={42}>
      <Title
        accentColor="mint"
        rightSlot="Agent skill + React + Remotion"
        style={{ width: 1480 }}
      >
        How Diagram Kit turns intent into verified visuals
      </Title>
    </At>
    <At x={120} y={108}>
      <Label
        debugId="architecture-subtitle"
        size={17}
        weight={500}
        color={ink.muted}
      >
        Reusable agent skills author one composition, then the same source
        renders diagrams and marketing-video scenes.
      </Label>
    </At>

    <At x={50} y={180}>
      <Panel
        title="1. Reusable agent skills"
        style={{ width: 390, height: 580 }}
      />
    </At>
    <At x={80} y={240}>
      <FeatureCard
        debugId="diagram-kit-skill"
        title="Diagram Kit skill"
        color="mint"
        width={330}
        height={170}
        bulletSize={15}
        bullets={[
          "Component API + layout rules",
          "Debug IDs + verification loop",
        ]}
        mediaWidth={76}
        media={<Glyph name="agent" color="mint" size={72} />}
      />
    </At>
    <At x={80} y={500}>
      <FeatureCard
        debugId="marketing-video-skill"
        title="Marketing-video skill"
        color="peach"
        width={330}
        height={170}
        bulletSize={15}
        bullets={[
          "Story, narration, and timing",
          "Diagram Kit scenes inside Remotion",
        ]}
        mediaWidth={76}
        media={<Glyph name="report" color="peach" size={72} />}
      />
    </At>

    <At x={470} y={180}>
      <Panel title="2. Diagram as code" style={{ width: 620, height: 580 }} />
    </At>
    <At x={525} y={245}>
      <Card
        debugId="agent-author"
        color="purple"
        title="The agent authors a React composition"
        subtitle="Canvas + At place every element deterministically"
        style={{ ...exactBox, width: 500, height: 90 }}
      />
    </At>

    <At x={515} y={405}>
      <FlowBox
        debugId="kit-primitives"
        color="blue"
        title="Primitives"
        subtitle="cards, arrows, glyphs"
        width={170}
        height={95}
        titleSize={19}
        style={exactBox}
      />
    </At>
    <At x={715} y={405}>
      <FlowBox
        debugId="kit-themes"
        color="yellow"
        title="Themes"
        subtitle="light, dark, sketch"
        width={170}
        height={95}
        titleSize={19}
        style={exactBox}
      />
    </At>
    <At x={915} y={405}>
      <FlowBox
        debugId="kit-motion"
        color="pink"
        title="Motion"
        subtitle="appear, draw, pulse"
        width={140}
        height={95}
        titleSize={19}
        style={exactBox}
      />
    </At>

    <At x={650} y={555}>
      <Card
        debugId="remotion-composition"
        color="lavender"
        title="Remotion composition"
        subtitle="one source of truth"
        style={{ ...exactBox, width: 270, height: 90 }}
      />
    </At>
    <At x={610} y={700}>
      <Annotation tone="gray" debugId="composition-rule">
        Absolute layout + reusable primitives make renders reproducible.
      </Annotation>
    </At>

    <At x={1130} y={180}>
      <Panel title="3. Render + verify" style={{ width: 420, height: 580 }} />
    </At>
    <At x={1175} y={235}>
      <FlowBox
        debugId="debug-render"
        color="lavender"
        title="Remotion debug render"
        subtitle="headless Chromium"
        width={330}
        height={80}
        titleSize={19}
        style={exactBox}
      />
    </At>
    <At x={1175} y={365}>
      <FlowBox
        debugId="debug-telemetry"
        color="blue"
        title="Layout telemetry"
        subtitle="BBOX + ARROW + ORPHAN"
        width={330}
        height={80}
        titleSize={19}
        style={exactBox}
      />
    </At>
    <At x={1175} y={495}>
      <FlowBox
        debugId="collision-checker"
        color="yellow"
        title="check.mjs"
        subtitle="collision gate"
        width={330}
        height={80}
        titleSize={19}
        style={exactBox}
      />
    </At>
    <At x={1175} y={650}>
      <FlowBox
        debugId="png-output"
        color="mint"
        title="PNG"
        subtitle="docs + social"
        width={150}
        height={80}
        titleSize={20}
        style={exactBox}
      />
    </At>
    <At x={1355} y={650}>
      <FlowBox
        debugId="mp4-output"
        color="peach"
        title="MP4"
        subtitle="animated stories"
        width={150}
        height={80}
        titleSize={20}
        style={exactBox}
      />
    </At>

    <Arrow
      debugId="diagram-skill-to-author"
      from={{ x: 410, y: 325 }}
      to={{ x: 525, y: 275 }}
      waypoints={[
        { x: 450, y: 325 },
        { x: 450, y: 275 },
      ]}
    />
    <Arrow
      debugId="marketing-skill-to-author"
      from={{ x: 410, y: 585 }}
      to={{ x: 525, y: 315 }}
      waypoints={[
        { x: 485, y: 585 },
        { x: 485, y: 315 },
      ]}
    />

    <Arrow
      debugId="author-to-primitives"
      from={{ x: 775, y: 335 }}
      to={{ x: 600, y: 405 }}
    />
    <Arrow
      debugId="author-to-themes"
      from={{ x: 775, y: 335 }}
      to={{ x: 800, y: 405 }}
    />
    <Arrow
      debugId="author-to-motion"
      from={{ x: 775, y: 335 }}
      to={{ x: 985, y: 405 }}
    />

    <Arrow
      debugId="primitives-to-composition"
      from={{ x: 600, y: 500 }}
      to={{ x: 710, y: 555 }}
    />
    <Arrow
      debugId="themes-to-composition"
      from={{ x: 800, y: 500 }}
      to={{ x: 785, y: 555 }}
    />
    <Arrow
      debugId="motion-to-composition"
      from={{ x: 985, y: 500 }}
      to={{ x: 860, y: 555 }}
    />

    <Arrow
      debugId="composition-to-debug-render"
      from={{ x: 920, y: 600 }}
      to={{ x: 1175, y: 275 }}
      waypoints={[
        { x: 1105, y: 600 },
        { x: 1105, y: 275 },
      ]}
      label="bundle"
      labelOffset={-14}
    />
    <Arrow
      debugId="render-to-telemetry"
      from={{ x: 1340, y: 315 }}
      to={{ x: 1340, y: 365 }}
    />
    <Arrow
      debugId="telemetry-to-check"
      from={{ x: 1340, y: 445 }}
      to={{ x: 1340, y: 495 }}
    />
    <Arrow
      debugId="check-to-png"
      from={{ x: 1340, y: 575 }}
      to={{ x: 1250, y: 650 }}
      waypoints={[{ x: 1250, y: 610 }]}
    />
    <Arrow
      debugId="check-to-mp4"
      from={{ x: 1340, y: 575 }}
      to={{ x: 1430, y: 650 }}
      waypoints={[{ x: 1430, y: 610 }]}
    />
    <Arrow
      debugId="checker-feedback-loop"
      from={{ x: 1175, y: 535 }}
      to={{ x: 525, y: 290 }}
      waypoints={[
        { x: 1110, y: 535 },
        { x: 1110, y: 810 },
        { x: 485, y: 810 },
        { x: 485, y: 290 },
      ]}
      dashed
      color={ink.muted}
    />
  </Canvas>
);
