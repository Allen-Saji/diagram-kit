import React from "react";
import {
  At,
  Card,
  Glyph,
  GlyphName,
  ComparisonColumns,
  PaletteColor,
} from "@allen-saji/diagram-kit";

export type ComparisonColumnsExampleProps = {
  debug?: boolean;
};

type Step = { glyph?: GlyphName; card?: [string, string?] };

const columnFlow = (
  color: PaletteColor,
  steps: Step[],
  prefix: string,
): ((box: { w: number; h: number }) => React.ReactNode) => {
  const Flow = (box: { w: number; h: number }) => {
    const cx = box.w / 2;
    const pitch = box.h / steps.length;
    return (
      <>
        {/* spine behind the steps */}
        <svg
          width={box.w}
          height={box.h}
          style={{ position: "absolute", left: 0, top: 0 }}
          aria-hidden="true"
        >
          <line
            x1={cx}
            y1={pitch * 0.5}
            x2={cx}
            y2={box.h - pitch * 0.5}
            stroke="#242A35"
            strokeWidth={2.5}
            strokeDasharray="6 6"
            opacity={0.55}
          />
        </svg>
        {steps.map((step, i) => (
          <At key={i} x={cx} y={pitch * (i + 0.5)} anchor="center">
            {step.glyph ? (
              <Glyph
                name={step.glyph}
                color={color}
                size={68}
                debugId={`${prefix}-g-${i}`}
              />
            ) : (
              <Card
                debugId={`${prefix}-c-${i}`}
                color={color}
                title={step.card?.[0]}
                subtitle={step.card?.[1]}
              />
            )}
          </At>
        ))}
      </>
    );
  };
  return Flow;
};

/**
 * `ComparisonColumns` template fidelity clone — the "RAG vs Agentic
 * RAG vs Graph RAG" page anatomy: accent pill per column, pale wash of
 * the same accent behind each flow, glyphs tinted to the column color.
 */
export const ComparisonColumnsExample: React.FC<ComparisonColumnsExampleProps> = ({
  debug = false,
}) => {
  return (
    <ComparisonColumns
      w={1600}
      h={1150}
      debug={debug}
      columns={[
        {
          title: "RAG",
          color: "blue",
          content: columnFlow(
            "blue",
            [
              { glyph: "user-query" },
              { card: ["Embedding model", "Query → Vector"] },
              { glyph: "vector-db" },
              { card: ["Context augmentation", "Prompt + Top K chunks"] },
              { glyph: "llm" },
              { card: ["Response"] },
            ],
            "rag",
          ),
        },
        {
          title: "Agentic RAG",
          color: "peach",
          content: columnFlow(
            "peach",
            [
              { glyph: "user-query" },
              { glyph: "agent" },
              { card: ["Retrieval", "Vector DB · Tools · MCP"] },
              { glyph: "gauge" },
              { card: ["Pass or re-retrieve?"] },
              { glyph: "llm" },
              { card: ["Response"] },
            ],
            "agentic",
          ),
        },
        {
          title: "Graph RAG",
          color: "mint",
          content: columnFlow(
            "mint",
            [
              { glyph: "user-query" },
              { card: ["Query classification", "Local vs global search"] },
              { glyph: "knowledge-graph" },
              { card: ["Context augmentation", "Entities + relationships"] },
              { glyph: "llm" },
              { card: ["Response"] },
            ],
            "graph",
          ),
        },
      ]}
    />
  );
};
