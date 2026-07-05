import React from "react";
import {
  Canvas,
  At,
  Title,
  Label,
  Annotation,
  PillTitle,
  BulletList,
  FeatureCard,
  MiniChart,
  Glyph,
  Panel,
} from "@allen-saji/diagram-kit";

export type PagePrimitivesProbeProps = {
  debug?: boolean;
};

/**
 * Probe for the page-format primitives: `PillTitle` (numbered black /
 * accent pills), `BulletList` markers, `FeatureCard` (pill + bullets +
 * media), and `MiniChart` (narrative line curves with a dashed marker,
 * plus outlined bars). Together these are the anatomy of BBG listicle
 * posters and product one-pagers.
 */
export const PagePrimitivesProbe: React.FC<PagePrimitivesProbeProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={1240} debug={debug} theme="light">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="peach" rightSlot="diagram-kit · page primitives">
            Page Primitives
          </Title>
        </div>
      </At>

      {/* PillTitle row */}
      <At x={60} y={160}>
        <Label debugId="pill-label" size={15}>
          PillTitle — numbered section pills
        </Label>
      </At>
      <At x={60} y={205}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <PillTitle debugId="pill-ink" number={1}>
            Splitting Early
          </PillTitle>
          <PillTitle debugId="pill-mint" tone="mint">
            Context Engineering
          </PillTitle>
          <PillTitle debugId="pill-blue" number={4} tone="blue" size={18}>
            Chatty Services
          </PillTitle>
          <PillTitle debugId="pill-peach" tone="peach" size={18}>
            Agentic RAG
          </PillTitle>
        </div>
      </At>

      {/* BulletList row */}
      <At x={60} y={300}>
        <Label debugId="bullets-label" size={15}>
          BulletList — dot / dash / check markers
        </Label>
      </At>
      <At x={60} y={348}>
        <div style={{ display: "flex", gap: 70 }}>
          <BulletList
            debugId="bullets-dot"
            color="mint"
            items={["Skills as reusable workflows", "Built in vs external skills", "Chaining multi-step automations"]}
          />
          <BulletList
            debugId="bullets-dash"
            color="blue"
            marker="dash"
            items={["Vector database", "Tools + APIs", "MCP servers"]}
          />
          <BulletList
            debugId="bullets-check"
            color="peach"
            marker="check"
            items={["Live on devnet", "203 tests green", "Docs shipped"]}
          />
        </div>
      </At>

      {/* FeatureCard */}
      <At x={60} y={520}>
        <Label debugId="card-label" size={15}>
          FeatureCard — pill + bullets + media slot
        </Label>
      </At>
      <At x={60} y={568}>
        <FeatureCard
          debugId="feature-card"
          title="MCP & Agentic Tooling"
          color="mint"
          width={680}
          bullets={[
            "MCP server and client architecture",
            "Browser automation workflows",
            "Tool calling reliability",
            "Hook lifecycle management",
          ]}
          media={
            <div
              style={{
                width: "100%",
                height: 190,
                background: "#DFF1E7",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Glyph name="api" color="mint" size={96} />
            </div>
          }
        />
      </At>

      {/* MiniChart line — anti-patterns "splitting early" clone */}
      <At x={800} y={520}>
        <Label debugId="chart-label" size={15}>
          MiniChart — narrative line + outlined bars
        </Label>
      </At>
      <At x={800} y={568}>
        <Panel variant="dashed" style={{ width: 740, height: 330, position: "relative", padding: 0 }}>
          <At x={30} y={20}>
            <MiniChart
              debugId="chart-line"
              variant="line"
              w={420}
              h={280}
              series={[
                { label: "cost to change", color: "pink", points: [1, 1.6, 5.4, 7.8] },
                { label: "what we know", color: "mint", points: [0.6, 1.1, 4.2, 6.2] },
              ]}
              xLabels={["Early", "Mature"]}
              marker={{ at: 0.22, label: "split here", color: "mint" }}
            />
          </At>
          <At x={490} y={20}>
            <MiniChart
              debugId="chart-bar"
              variant="bar"
              w={220}
              h={280}
              bars={[
                { label: "p50", value: 12, color: "mint" },
                { label: "p95", value: 34, color: "yellow" },
                { label: "p99", value: 71, color: "pink" },
              ]}
            />
          </At>
        </Panel>
      </At>

      <At x={60} y={1160}>
        <Annotation tone="gray" debugId="note">
          FeatureCard media slot takes any node — a Glyph, an image, or a scaled-down nested composition.
          MiniChart is for narrative charts inside posters, not data viz.
        </Annotation>
      </At>
    </Canvas>
  );
};
