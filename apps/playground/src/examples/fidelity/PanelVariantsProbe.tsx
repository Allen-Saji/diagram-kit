import React from "react";
import {
  Canvas,
  At,
  Card,
  Panel,
  Title,
  Annotation,
} from "@allen-saji/diagram-kit";

export type PanelVariantsProbeProps = {
  debug?: boolean;
};

/**
 * Probe for `Panel` `variant="solid"` vs `variant="dashed"`.
 *
 * Solid is the canonical BBG panel — filled background, solid border,
 * cards visually contained inside.
 *
 * Dashed is for loose grouping — transparent background and a dashed
 * border so the cards underneath still read as the primary content.
 * BBG uses this on multi-region reference diagrams to mark sub-areas
 * without obscuring them.
 */
export const PanelVariantsProbe: React.FC<PanelVariantsProbeProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={780} debug={debug} theme="light">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="blue" rightSlot="diagram-kit · panel variants">
            Panel Frame Variants
          </Title>
        </div>
      </At>

      <At x={60} y={170}>
        <Annotation tone="gray" debugId="solid-note">
          variant: solid (default) — filled bg, solid border, cards live inside
        </Annotation>
      </At>

      <At x={60} y={220}>
        <Panel
          title="Write Path"
          style={{ width: 720, height: 320 }}
        >
          <div style={{ position: "relative", height: "100%" }}>
            <At x={40} y={40}>
              <Card debugId="solid-wal" color="blue" title="WAL" subtitle="durable" />
            </At>
            <At x={260} y={40}>
              <Card debugId="solid-mem" color="mint" title="Memtable" subtitle="sorted" />
            </At>
            <At x={500} y={40}>
              <Card debugId="solid-sst" color="peach" title="SSTable" subtitle="flushed" />
            </At>
            <At x={40} y={150}>
              <Card debugId="solid-bg" color="purple" title="Background compactor" />
            </At>
          </div>
        </Panel>
      </At>

      <At x={820} y={170}>
        <Annotation tone="gray" debugId="dashed-note">
          variant: dashed — transparent bg, dashed border, content reads through
        </Annotation>
      </At>

      <At x={820} y={220}>
        <Panel
          title="Background Region"
          variant="dashed"
          style={{ width: 720, height: 320 }}
        >
          <div style={{ position: "relative", height: "100%" }}>
            <At x={40} y={40}>
              <Card debugId="dashed-job-1" color="purple" title="Compactor" subtitle="L0 -> L1" />
            </At>
            <At x={260} y={40}>
              <Card debugId="dashed-job-2" color="purple" title="Compactor" subtitle="L1 -> L2" />
            </At>
            <At x={500} y={40}>
              <Card debugId="dashed-job-3" color="purple" title="Tombstone GC" />
            </At>
            <At x={40} y={150}>
              <Card debugId="dashed-aux" color="lavender" title="Stats sampler" />
            </At>
          </div>
        </Panel>
      </At>

      <At x={60} y={620}>
        <Annotation tone="red" debugId="usage-tip">
          Use dashed for sub-region grouping where the cards are the headline
          and the panel is just a soft outline around them.
        </Annotation>
      </At>
    </Canvas>
  );
};
