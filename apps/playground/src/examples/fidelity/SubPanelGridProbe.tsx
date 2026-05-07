import React from "react";
import {
  Canvas,
  At,
  Card,
  Title,
  Annotation,
  SubPanelGrid,
} from "@allen-saji/diagram-kit";

export type SubPanelGridProbeProps = {
  debug?: boolean;
};

/**
 * Probe for `SubPanelGrid`. Renders a 2x2 grid of independently-titled
 * `Panel`s, mimicking BBG "4 caching strategies" reference layouts.
 * Each cell is a relative-positioned wrapper with absolute children
 * placed via `<At>`.
 */
export const SubPanelGridProbe: React.FC<SubPanelGridProbeProps> = ({
  debug = false,
}) => {
  const cellInset = (cardId: string, color: "mint" | "blue" | "peach" | "purple", title: string, subtitle: string) => (
    <div style={{ position: "relative", height: "100%" }}>
      <At x={20} y={20}>
        <Card debugId={cardId} color={color} title={title} subtitle={subtitle} />
      </At>
    </div>
  );
  return (
    <Canvas w={1600} h={780} debug={debug} theme="light">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="purple" rightSlot="diagram-kit · sub-panel grid">
            Caching Strategies
          </Title>
        </div>
      </At>

      <At x={60} y={150}>
        <Annotation tone="gray" debugId="grid-note">
          2 columns x 2 rows — each cell is an independently-titled Panel
        </Annotation>
      </At>

      <At x={60} y={210}>
        <SubPanelGrid
          cols={2}
          gap={32}
          panelHeight={220}
          style={{ width: 1480 }}
          panels={[
            {
              id: "cache-aside",
              title: "Cache Aside",
              content: cellInset(
                "cache-aside-card",
                "mint",
                "Read miss",
                "App fetches from DB, fills cache",
              ),
            },
            {
              id: "read-through",
              title: "Read Through",
              content: cellInset(
                "read-through-card",
                "blue",
                "Cache fetches",
                "Cache reads from DB on miss",
              ),
            },
            {
              id: "write-through",
              title: "Write Through",
              content: cellInset(
                "write-through-card",
                "peach",
                "Sync to DB",
                "Cache writes both layers",
              ),
            },
            {
              id: "write-back",
              title: "Write Back",
              content: cellInset(
                "write-back-card",
                "purple",
                "Async to DB",
                "Cache flushes on schedule",
              ),
            },
          ]}
        />
      </At>
    </Canvas>
  );
};
