import React from "react";
import {
  Canvas,
  At,
  PageHeader,
  PageFooter,
  BandStack,
  IconGrid,
  TagChip,
} from "@allen-saji/diagram-kit";

export type BandStackPageExampleProps = {
  debug?: boolean;
};

/**
 * `BandStack` page — the enterprise architecture slide anatomy
 * (Salesforce-style): left-aligned two-tone headline, stacked layer
 * bands with a "System of X" label rail and leader lines, an IconGrid
 * band, and a chip-row trust layer. Single-hue (all blue) on purpose —
 * that's what makes it read corporate instead of BBG.
 */
export const BandStackPageExample: React.FC<BandStackPageExampleProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1920} h={1080} debug={debug} theme="light">
      <At x={80} y={56}>
        <PageHeader
          debugId="bs-header"
          align="left"
          width={1760}
          titleSize={46}
          title={
            <>
              Agentic <span style={{ color: "#2E78BC" }}>Enterprise</span> Architecture
            </>
          }
        />
      </At>
      <At x={80} y={180}>
        <BandStack
          debugId="bs-stack"
          width={1760}
          railWidth={300}
          bands={[
            {
              rail: "System of engagement",
              color: "blue",
              height: 130,
              title: "Chat Surface",
              content: (
                <div style={{ display: "flex", gap: 10 }}>
                  <TagChip color="blue">MESSAGING</TagChip>
                  <TagChip color="blue">SEARCH</TagChip>
                  <TagChip color="blue">CANVAS</TagChip>
                  <TagChip color="blue">VOICE</TagChip>
                </div>
              ),
            },
            {
              rail: "System of agency",
              color: "blue",
              height: 130,
              title: "Customer & Employee Agents",
              content: (
                <div style={{ display: "flex", gap: 10 }}>
                  <TagChip color="lavender">BUILDER</TagChip>
                  <TagChip color="lavender">SCRIPTS</TagChip>
                  <TagChip color="lavender">OBSERVABILITY</TagChip>
                  <TagChip color="lavender">ORCHESTRATION</TagChip>
                </div>
              ),
            },
            {
              rail: "System of work",
              color: "blue",
              height: 200,
              title: "Business 360",
              content: (
                <IconGrid
                  cols={8}
                  cellWidth={110}
                  iconSize={44}
                  color="blue"
                  items={[
                    { icon: "report", caption: "Sales" },
                    { icon: "chat", caption: "Service" },
                    { icon: "wallet", caption: "Commerce" },
                    { icon: "gauge", caption: "Revenue" },
                    { icon: "server", caption: "IT & HR" },
                    { icon: "coin", caption: "FinServ" },
                    { icon: "shield", caption: "PubSec" },
                    { icon: "clock", caption: "Comms" },
                  ]}
                />
              ),
            },
            {
              rail: "System of context",
              color: "blue",
              height: 130,
              title: "Data 360",
              content: (
                <div style={{ display: "flex", gap: 10 }}>
                  <TagChip color="blue">CDP</TagChip>
                  <TagChip color="blue">FEDERATION</TagChip>
                  <TagChip color="blue">ZERO COPY</TagChip>
                  <TagChip color="blue">REAL-TIME</TagChip>
                </div>
              ),
            },
            {
              rail: "Trust layer",
              height: 110,
              content: (
                <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
                  <TagChip color="gray">OPENAI</TagChip>
                  <TagChip color="gray">ANTHROPIC</TagChip>
                  <TagChip color="gray">GEMINI</TagChip>
                  <TagChip color="gray">LLAMA</TagChip>
                  <TagChip color="gray">OPEN SOURCE</TagChip>
                </div>
              ),
            },
          ]}
        />
      </At>
      <At x={80} y={984}>
        <PageFooter
          debugId="bs-footer"
          width={1760}
          left={<>◆ diagram-kit · BandStack</>}
          right={<>single-hue palette = enterprise register</>}
        />
      </At>
    </Canvas>
  );
};
