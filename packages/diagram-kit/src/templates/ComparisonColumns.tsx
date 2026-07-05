import React from "react";
import { Canvas, At } from "../kit/Canvas";
import { PillTitle } from "../kit/PillTitle";
import { PaletteColor } from "../kit/palette";
import { useSwatch, type Theme } from "../kit/theme";

export type ComparisonColumn = {
  title: React.ReactNode;
  color: PaletteColor;
  /**
   * Column body. Pass a function to receive the column's inner box
   * `{w, h}`; the box is a positioned container, so `At` coords are
   * column-local.
   */
  content: React.ReactNode | ((box: { w: number; h: number }) => React.ReactNode);
};

type ComparisonColumnsProps = {
  columns: ComparisonColumn[];
  w: number;
  h: number;
  theme?: Theme;
  debug?: boolean;
  margin?: number;
  gap?: number;
  /** Wash opacity of each column's tinted background. Default 0.42. */
  washOpacity?: number;
};

const ColumnWash: React.FC<{
  color: PaletteColor;
  width: number;
  height: number;
  washOpacity: number;
  children: React.ReactNode;
}> = ({ color, width, height, washOpacity, children }) => {
  const p = useSwatch(color);
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 22,
        border: `2.5px solid ${p.border}`,
        position: "relative",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: p.bg,
          opacity: washOpacity,
        }}
      />
      <div style={{ position: "absolute", inset: 0 }}>{children}</div>
    </div>
  );
};

/**
 * Side-by-side tinted comparison columns — the "RAG vs Agentic RAG vs
 * Graph RAG" page anatomy: one accent-colored pill header per column,
 * a pale wash of the same accent behind each column's content. Keep
 * one palette family per column and tint the column's glyphs to match.
 */
export const ComparisonColumns: React.FC<ComparisonColumnsProps> = ({
  columns,
  w,
  h,
  theme = "light",
  debug = false,
  margin = 40,
  gap = 36,
  washOpacity = 0.42,
}) => {
  const headerH = 64;
  const colW = (w - margin * 2 - gap * (columns.length - 1)) / columns.length;
  const colH = h - margin - headerH - margin;
  const pad = 16;
  return (
    <Canvas w={w} h={h} debug={debug} theme={theme}>
      {columns.map((col, i) => {
        const x = margin + i * (colW + gap);
        const box = { w: colW - pad * 2, h: colH - pad * 2 };
        return (
          <React.Fragment key={i}>
            <At x={x + colW / 2} y={margin} anchor="top-center">
              <PillTitle tone={col.color} size={26} debugId={`col-pill-${i}`}>
                {col.title}
              </PillTitle>
            </At>
            <At x={x} y={margin + headerH}>
              <ColumnWash color={col.color} width={colW} height={colH} washOpacity={washOpacity}>
                <div style={{ position: "absolute", left: pad, top: pad, width: box.w, height: box.h }}>
                  {typeof col.content === "function" ? col.content(box) : col.content}
                </div>
              </ColumnWash>
            </At>
          </React.Fragment>
        );
      })}
    </Canvas>
  );
};
