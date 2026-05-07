import React from "react";
import {
  Canvas,
  At,
  Card,
  Arrow,
  Title,
  StepBadge,
  Annotation,
} from "@allen-saji/diagram-kit";

export type StepBadgeProbeProps = {
  debug?: boolean;
};

/**
 * Phase B probe: light theme + StepBadge in solid + outline variants
 * + Title with the new bar accent default.
 */
export const StepBadgeProbe: React.FC<StepBadgeProbeProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={780} debug={debug} theme="light">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="peach" rightSlot="diagram-kit · step badges">
            Numbered Flow
          </Title>
        </div>
      </At>

      {/* Solid badges row */}
      <At x={120} y={220}>
        <Annotation tone="gray" debugId="row-1-note">
          variant: solid (default) — used for inline arrow steps
        </Annotation>
      </At>

      <At x={140} y={290} anchor="center">
        <StepBadge debugId="solid-1" n={1} color="mint" />
      </At>
      <At x={340} y={290} anchor="center">
        <Card debugId="solid-card-1" color="mint" title="Request" subtitle="POST /resource" />
      </At>
      <Arrow
        debugId="solid-flow-1"
        from={{ x: 440, y: 290 }}
        to={{ x: 600, y: 290 }}
      />

      <At x={650} y={290} anchor="center">
        <StepBadge debugId="solid-2" n={2} color="blue" />
      </At>
      <At x={850} y={290} anchor="center">
        <Card debugId="solid-card-2" color="blue" title="Validate" subtitle="signature + nonce" />
      </At>
      <Arrow
        debugId="solid-flow-2"
        from={{ x: 950, y: 290 }}
        to={{ x: 1110, y: 290 }}
      />

      <At x={1160} y={290} anchor="center">
        <StepBadge debugId="solid-3" n={3} color="purple" />
      </At>
      <At x={1380} y={290} anchor="center">
        <Card debugId="solid-card-3" color="purple" title="Settle" subtitle="commit on PER" />
      </At>

      {/* Outline badges row */}
      <At x={120} y={460}>
        <Annotation tone="gray" debugId="row-2-note">
          variant: outline — used for sidebar / margin enumerations
        </Annotation>
      </At>

      <At x={140} y={550} anchor="center">
        <StepBadge debugId="outline-1" n={1} color="mint" variant="outline" size={44} />
      </At>
      <At x={340} y={550} anchor="center">
        <Card debugId="outline-card-1" color="mint" title="Inbox triage" />
      </At>

      <At x={650} y={550} anchor="center">
        <StepBadge debugId="outline-2" n={2} color="blue" variant="outline" size={44} />
      </At>
      <At x={850} y={550} anchor="center">
        <Card debugId="outline-card-2" color="blue" title="Daily log" />
      </At>

      <At x={1160} y={550} anchor="center">
        <StepBadge debugId="outline-3" n={3} color="purple" variant="outline" size={44} />
      </At>
      <At x={1380} y={550} anchor="center">
        <Card debugId="outline-card-3" color="purple" title="Ship recap" />
      </At>
    </Canvas>
  );
};
