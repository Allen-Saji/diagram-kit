import React from "react";
import {
  Canvas,
  At,
  Card,
  Title,
  Annotation,
  BeforeAfterSplit,
} from "@allen-saji/diagram-kit";

export type BeforeAfterSplitProbeProps = {
  debug?: boolean;
};

/**
 * Probe for `BeforeAfterSplit`. Two stacked panels separated by a
 * labeled divider chip — the canonical BBG "without/with" layout.
 */
export const BeforeAfterSplitProbe: React.FC<BeforeAfterSplitProbeProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={900} debug={debug} theme="light">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="blue" rightSlot="diagram-kit · before / after">
            Request Batching
          </Title>
        </div>
      </At>

      <At x={60} y={150}>
        <Annotation tone="gray" debugId="ba-note">
          Two stacked Panels, divider chip in between with directional arrows
        </Annotation>
      </At>

      <At x={60} y={210}>
        <BeforeAfterSplit
          width={1480}
          panelHeight={240}
          dividerHeight={80}
          before={{
            title: "Without batching",
            content: (
              <div style={{ position: "relative", height: "100%" }}>
                <At x={40} y={40}>
                  <Card
                    debugId="before-client-1"
                    color="peach"
                    title="Client"
                    subtitle="POST /event"
                  />
                </At>
                <At x={300} y={40}>
                  <Card
                    debugId="before-client-2"
                    color="peach"
                    title="Client"
                    subtitle="POST /event"
                  />
                </At>
                <At x={560} y={40}>
                  <Card
                    debugId="before-client-3"
                    color="peach"
                    title="Client"
                    subtitle="POST /event"
                  />
                </At>
                <At x={1000} y={40}>
                  <Card
                    debugId="before-server"
                    color="pink"
                    title="Server"
                    subtitle="3 inserts, 3 fsyncs"
                  />
                </At>
              </div>
            ),
          }}
          divider={{
            label: "Apply request batching",
            color: "blue",
          }}
          after={{
            title: "With batching",
            content: (
              <div style={{ position: "relative", height: "100%" }}>
                <At x={40} y={40}>
                  <Card
                    debugId="after-client-1"
                    color="peach"
                    title="Client"
                    subtitle="POST /event"
                  />
                </At>
                <At x={300} y={40}>
                  <Card
                    debugId="after-client-2"
                    color="peach"
                    title="Client"
                    subtitle="POST /event"
                  />
                </At>
                <At x={560} y={40}>
                  <Card
                    debugId="after-client-3"
                    color="peach"
                    title="Client"
                    subtitle="POST /event"
                  />
                </At>
                <At x={760} y={40}>
                  <Card
                    debugId="after-batcher"
                    color="mint"
                    title="Batcher"
                    subtitle="N requests"
                  />
                </At>
                <At x={1000} y={40}>
                  <Card
                    debugId="after-server"
                    color="blue"
                    title="Server"
                    subtitle="1 insert, 1 fsync"
                  />
                </At>
              </div>
            ),
          }}
        />
      </At>
    </Canvas>
  );
};
