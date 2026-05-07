import React from "react";
import {
  Canvas,
  At,
  Card,
  Title,
  Annotation,
  ComparisonTable,
} from "@allen-saji/diagram-kit";

export type ComparisonTableProbeProps = {
  debug?: boolean;
};

/**
 * Probe for `ComparisonTable`. Left-column dimension labels with
 * numbered `StepBadge` markers; remaining columns are option cells
 * holding `Card`s. Used by feature-matrix posts (MCP vs Skills,
 * Claude vs OpenClaw) where the reader scans the row number plus
 * dimension to anchor a comparison.
 */
export const ComparisonTableProbe: React.FC<ComparisonTableProbeProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={760} debug={debug} theme="light">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="mint" rightSlot="diagram-kit · comparison">
            Cache vs DB Reads
          </Title>
        </div>
      </At>

      <At x={60} y={150}>
        <Annotation tone="gray" debugId="cmp-note">
          Numbered rows on the left, two option columns, cells are Cards
        </Annotation>
      </At>

      <At x={60} y={210}>
        <ComparisonTable
          width={1480}
          labelWidth={280}
          rowHeight={92}
          badgeColor="mint"
          columns={[
            { id: "cache", label: "In-memory cache" },
            { id: "db", label: "Direct DB read" },
          ]}
          rows={[
            {
              id: "latency",
              label: "Latency",
              cells: [
                <Card
                  key="cache-latency"
                  debugId="cache-latency"
                  color="mint"
                  title="< 1 ms"
                  subtitle="local memory"
                />,
                <Card
                  key="db-latency"
                  debugId="db-latency"
                  color="peach"
                  title="5 - 50 ms"
                  subtitle="network + disk"
                />,
              ],
            },
            {
              id: "cost",
              label: "Cost per read",
              cells: [
                <Card
                  key="cache-cost"
                  debugId="cache-cost"
                  color="mint"
                  title="$0"
                  subtitle="amortized RAM"
                />,
                <Card
                  key="db-cost"
                  debugId="db-cost"
                  color="peach"
                  title="$"
                  subtitle="connection + IO"
                />,
              ],
            },
            {
              id: "freshness",
              label: "Freshness",
              cells: [
                <Card
                  key="cache-fresh"
                  debugId="cache-fresh"
                  color="peach"
                  title="Stale"
                  subtitle="bounded by TTL"
                />,
                <Card
                  key="db-fresh"
                  debugId="db-fresh"
                  color="mint"
                  title="Authoritative"
                  subtitle="last committed"
                />,
              ],
            },
          ]}
        />
      </At>
    </Canvas>
  );
};
