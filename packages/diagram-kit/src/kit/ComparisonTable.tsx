import React from "react";
import { useFrame, useInk } from "./theme";
import { fonts } from "./fonts";
import { StepBadge } from "./StepBadge";
import { PaletteColor } from "./palette";

export type ComparisonTableColumn = {
  /** Stable identifier; used as the React key for the column. */
  id: string;
  /** Header text shown at the top of the column. */
  label: string;
};

export type ComparisonTableRow = {
  /** Stable identifier; used as the React key for the row. */
  id: string;
  /** Dimension being compared (e.g. "Latency", "Cost"). */
  label: string;
  /**
   * One cell per column, in the same order as `columns`. ReactNode so
   * cells can hold `Card`, `Annotation`, raw strings via `<Label>`, etc.
   */
  cells: React.ReactNode[];
};

type ComparisonTableProps = {
  columns: ComparisonTableColumn[];
  rows: ComparisonTableRow[];
  /** Total table width in px. Required for column math. */
  width: number;
  /** Row height in px. Default 80. */
  rowHeight?: number;
  /** Header height in px. Default 60. */
  headerHeight?: number;
  /** Width of the leftmost dimension column in px. Default 240. */
  labelWidth?: number;
  /** Color of the per-row numbered `StepBadge`. Default mint. */
  badgeColor?: PaletteColor;
  style?: React.CSSProperties;
};

/**
 * Feature-matrix table — left column lists dimensions with numbered
 * `StepBadge` markers, remaining columns are option cells. Used by
 * BBG comparison posts (MCP-vs-Skills, Postgres-vs-MySQL) where the
 * reader scans the dimension name plus row number to anchor a quick
 * visual lookup.
 *
 * No `debugId` on the table itself (semantic container, like `Panel`);
 * cells inside should carry their own `debugId` if they participate
 * in arrow / overlap checks. The dimension labels are rendered inside
 * a styled `<span>` so the orphan walker does not flag them.
 */
export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  columns,
  rows,
  width,
  rowHeight = 80,
  headerHeight = 60,
  labelWidth = 240,
  badgeColor = "mint",
  style,
}) => {
  const frame = useFrame();
  const ink = useInk();
  const remainingWidth = width - labelWidth;
  const cellWidth = columns.length > 0 ? remainingWidth / columns.length : 0;
  return (
    <div
      style={{
        width,
        fontFamily: fonts.sans,
        color: ink.body,
        background: frame.bg,
        border: `2px solid ${frame.border}`,
        borderRadius: 12,
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          height: headerHeight,
          borderBottom: `2px solid ${frame.border}`,
        }}
      >
        <div style={{ width: labelWidth }} />
        {columns.map((col) => (
          <div
            key={col.id}
            style={{
              width: cellWidth,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 18,
              color: ink.heading,
              borderLeft: `2px solid ${frame.border}`,
            }}
          >
            <span>{col.label}</span>
          </div>
        ))}
      </div>
      {/* Rows */}
      {rows.map((row, ix) => (
        <div
          key={row.id}
          style={{
            display: "flex",
            height: rowHeight,
            borderBottom:
              ix < rows.length - 1
                ? `1px solid ${frame.border}`
                : undefined,
          }}
        >
          <div
            style={{
              width: labelWidth,
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "0 18px",
            }}
          >
            <StepBadge
              n={ix + 1}
              color={badgeColor}
              variant="outline"
              size={32}
            />
            <span style={{ fontWeight: 600, fontSize: 16 }}>{row.label}</span>
          </div>
          {row.cells.map((cell, jx) => (
            <div
              key={columns[jx]?.id ?? `cell-${jx}`}
              style={{
                width: cellWidth,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderLeft: `2px solid ${frame.border}`,
                padding: "0 12px",
                textAlign: "center",
              }}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
