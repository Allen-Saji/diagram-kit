import React from "react";
import { Panel } from "./Panel";

export type SubPanelGridItem = {
  /** Stable identifier — surfaced in debug logs via the child Panel pill. */
  id: string;
  /** Pill title rendered on the panel's top border. */
  title: string;
  /** Inner content. Position children absolutely inside a relative wrapper. */
  content: React.ReactNode;
  /** Override frame style for this panel. Default `solid`. */
  variant?: "solid" | "dashed";
};

type SubPanelGridProps = {
  panels: SubPanelGridItem[];
  /** Number of columns. Default 2 (BBG multi-concept reference layout). */
  cols?: number;
  /** Gap between panels in px. Default 32. */
  gap?: number;
  /** Uniform panel height in px. Default 240. */
  panelHeight?: number;
  /**
   * Outer wrapper style — must include `width` for the grid to lay out
   * predictably. Place via `<At>` to position on the canvas.
   */
  style?: React.CSSProperties;
};

/**
 * Grid of independently-titled `Panel`s. BBG uses this on multi-concept
 * reference cards (e.g. "5 caching strategies", "4 consensus protocols")
 * where each cell is a self-contained mini-diagram.
 *
 * Panels emit their own pill BBOX via `Panel`; this wrapper does not
 * register as a debug obstacle. Place absolutely-positioned content
 * inside each cell using a `position: relative; height: 100%` shim
 * paired with `<At>`.
 */
export const SubPanelGrid: React.FC<SubPanelGridProps> = ({
  panels,
  cols = 2,
  gap = 32,
  panelHeight = 240,
  style,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap,
        ...style,
      }}
    >
      {panels.map((p) => (
        <Panel
          key={p.id}
          title={p.title}
          variant={p.variant ?? "solid"}
          style={{ height: panelHeight }}
        >
          {p.content}
        </Panel>
      ))}
    </div>
  );
};
