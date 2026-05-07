import React from "react";
import {
  Canvas,
  At,
  Card,
  Title,
  Annotation,
  FanArrow,
} from "@allen-saji/diagram-kit";

export type FanArrowProbeProps = {
  debug?: boolean;
};

/**
 * Probe for `FanArrow` — one source, three targets, branches sharing
 * a common origin. Mimics BBG "writes to N replicas" / "broadcasts to
 * subscribers" patterns. The middle branch carries an inline label;
 * the outer branches are bare.
 */
export const FanArrowProbe: React.FC<FanArrowProbeProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={780} debug={debug} theme="light">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="blue" rightSlot="diagram-kit · fan arrow">
            Replicated Write
          </Title>
        </div>
      </At>

      <At x={60} y={150}>
        <Annotation tone="gray" debugId="fan-note">
          One leader -&gt; three replicas, all sharing the same origin
        </Annotation>
      </At>

      <At x={220} y={420} anchor="center">
        <Card
          debugId="leader"
          color="blue"
          title="Leader"
          subtitle="commits write"
        />
      </At>

      <At x={1200} y={240} anchor="center">
        <Card debugId="replica-a" color="mint" title="Replica A" subtitle="us-east" />
      </At>
      <At x={1200} y={420} anchor="center">
        <Card debugId="replica-b" color="mint" title="Replica B" subtitle="eu-west" />
      </At>
      <At x={1200} y={600} anchor="center">
        <Card debugId="replica-c" color="mint" title="Replica C" subtitle="ap-south" />
      </At>

      <FanArrow
        debugId="repl"
        from={{ x: 320, y: 420 }}
        targets={[
          { id: "a", to: { x: 1100, y: 240 } },
          {
            id: "b",
            to: { x: 1100, y: 420 },
            label: "primary path",
            labelOffset: -16,
          },
          { id: "c", to: { x: 1100, y: 600 } },
        ]}
      />
    </Canvas>
  );
};
