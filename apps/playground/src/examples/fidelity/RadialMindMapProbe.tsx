import React from "react";
import {
  Canvas,
  At,
  Title,
  Annotation,
  Card,
  Hexagon,
  RadialMindMap,
} from "@allen-saji/diagram-kit";

export type RadialMindMapProbeProps = {
  debug?: boolean;
};

/**
 * Probe for `RadialMindMap`. Hexagon hub at the canvas center with
 * six leaves arranged on a circle around it. Demonstrates the
 * primitive's auto-layout: starting at 12 o'clock and stepping
 * clockwise by 60 degrees per spoke.
 */
export const RadialMindMapProbe: React.FC<RadialMindMapProbeProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={900} debug={debug} theme="light">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="purple" rightSlot="diagram-kit · mind map">
            Observability Stack
          </Title>
        </div>
      </At>

      <At x={60} y={150}>
        <Annotation tone="gray" debugId="mm-note">
          One Hexagon hub, six leaves stepped 60 degrees apart starting at 12 o&apos;clock
        </Annotation>
      </At>

      <RadialMindMap
        centerAt={{ x: 800, y: 510 }}
        radius={260}
        center={
          <Hexagon
            debugId="mm-hub"
            color="purple"
            size={150}
            label="Observability"
          />
        }
        spokes={[
          {
            id: "logs",
            content: (
              <Card debugId="mm-logs" color="mint" title="Logs" subtitle="structured" />
            ),
          },
          {
            id: "metrics",
            content: (
              <Card debugId="mm-metrics" color="blue" title="Metrics" subtitle="time-series" />
            ),
          },
          {
            id: "traces",
            content: (
              <Card debugId="mm-traces" color="peach" title="Traces" subtitle="OTel spans" />
            ),
          },
          {
            id: "events",
            content: (
              <Card debugId="mm-events" color="pink" title="Events" subtitle="audit trail" />
            ),
          },
          {
            id: "alerts",
            content: (
              <Card debugId="mm-alerts" color="yellow" title="Alerts" subtitle="rule-based" />
            ),
          },
          {
            id: "dashboards",
            content: (
              <Card debugId="mm-dashboards" color="lavender" title="Dashboards" subtitle="Grafana" />
            ),
          },
        ]}
      />
    </Canvas>
  );
};
