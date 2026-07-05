import React from "react";
import { PaletteColor } from "./palette";
import { useSwatch, useFrame } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

type PillTitleProps = {
  children: React.ReactNode;
  /**
   * Optional leading number ("1", "2", ...). Rendered as `N.` before
   * the text — the numbered-panel style of BBG listicle posters.
   */
  number?: number | string;
  /**
   * Pill fill. `"ink"` (default) is the near-black pill from BBG
   * posters; any palette color fills with that swatch's border color.
   * Text is always the page background color for contrast.
   */
  tone?: "ink" | PaletteColor;
  /** Font size. Default 22. */
  size?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Solid rounded pill headline — the section-title treatment in BBG
 * listicle posters ("1.Splitting Early") and layer titles in stacked
 * architecture posters. Place standalone above content, or overlap a
 * `Panel`'s top edge with `At` (Panels carry no debugId, so the
 * overlap doesn't trip the collision checker).
 */
export const PillTitle: React.FC<PillTitleProps> = ({
  children,
  number,
  tone = "ink",
  size = 22,
  style,
  debugId,
}) => {
  const f = useFrame();
  const swatch = useSwatch(tone === "ink" ? "gray" : tone);
  const bg = tone === "ink" ? f.border : swatch.border;
  const text = f.bg;
  return (
    <DebugOverlay id={debugId} kind="pill-title">
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          background: bg,
          color: text,
          fontFamily: fonts.sans,
          fontSize: size,
          fontWeight: 700,
          lineHeight: 1,
          padding: `${Math.round(size * 0.45)}px ${Math.round(size * 1.05)}px`,
          borderRadius: 999,
          letterSpacing: -0.2,
          whiteSpace: "nowrap",
          ...style,
        }}
      >
        {number != null ? (
          <span style={{ marginRight: Math.round(size * 0.28) }}>{number}.</span>
        ) : null}
        {children}
      </div>
    </DebugOverlay>
  );
};
