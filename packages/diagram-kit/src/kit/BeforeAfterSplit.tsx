import React from "react";
import { Panel } from "./Panel";
import { useSwatch } from "./theme";
import { fonts } from "./fonts";
import { PaletteColor } from "./palette";

export type BeforeAfterPanel = {
  /** Pill title for the panel. */
  title: string;
  /** Inner content. */
  content: React.ReactNode;
};

export type BeforeAfterDivider = {
  /** Centered label inside the divider chip. */
  label: string;
  /** Palette color for the divider chip. Default `blue`. */
  color?: PaletteColor;
  /**
   * Show the directional triangle markers on either side of the label.
   * Default true. Set false for a plain pill divider (BBG sometimes
   * uses an unadorned chip when the direction is implied by layout).
   */
  showArrows?: boolean;
};

type BeforeAfterSplitProps = {
  before: BeforeAfterPanel;
  after: BeforeAfterPanel;
  divider: BeforeAfterDivider;
  /** Total layout width. Required so the divider chip can center cleanly. */
  width: number;
  /** Each panel's height in px. Default 280. */
  panelHeight?: number;
  /** Vertical band between the panels reserved for the divider. Default 80. */
  dividerHeight?: number;
  style?: React.CSSProperties;
};

/**
 * Two stacked `Panel`s separated by a labeled divider chip. Used for
 * "without/with" comparisons — the canonical BBG `Cache Aside` /
 * `Read Through` before/after layout.
 *
 * The divider is purely decorative; both panels emit their own pill
 * BBOX via `Panel`. The chip's label text is wrapped in a `<span>`
 * inside the chip container so the orphan walker does not flag it.
 */
export const BeforeAfterSplit: React.FC<BeforeAfterSplitProps> = ({
  before,
  after,
  divider,
  width,
  panelHeight = 280,
  dividerHeight = 80,
  style,
}) => {
  const swatch = useSwatch(divider.color ?? "blue");
  const showArrows = divider.showArrows ?? true;
  return (
    <div
      style={{
        position: "relative",
        width,
        ...style,
      }}
    >
      <Panel title={before.title} style={{ height: panelHeight }}>
        {before.content}
      </Panel>
      <div
        style={{
          height: dividerHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fonts.sans,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 24px",
            background: swatch.bg,
            border: `2px solid ${swatch.border}`,
            borderRadius: 999,
            color: swatch.text,
            fontWeight: 700,
            fontSize: 16,
            lineHeight: 1.2,
          }}
        >
          {showArrows ? <DownTriangle color="currentColor" /> : null}
          <span>{divider.label}</span>
          {showArrows ? <DownTriangle color="currentColor" /> : null}
        </div>
      </div>
      <Panel title={after.title} style={{ height: panelHeight }}>
        {after.content}
      </Panel>
    </div>
  );
};

const DownTriangle: React.FC<{ color: string }> = ({ color }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M2 3 L10 3 L6 9 Z" fill={color} />
  </svg>
);
