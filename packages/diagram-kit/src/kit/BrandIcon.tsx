import React from "react";
import { useFrame, useInk, useTheme } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

export type BrandIconData = {
  /** SVG path on a 24x24 viewBox — the `simple-icons` shape. */
  path: string;
  /** Official brand hex (no `#`), as provided by `simple-icons`. */
  hex?: string;
  title?: string;
};

type BrandIconProps = {
  /**
   * Icon data. Pass a `simple-icons` export directly:
   * `import { siSlack } from "simple-icons"; <BrandIcon icon={siSlack} />`
   * The kit takes the object shape, not the dependency — install
   * `simple-icons` in your app.
   */
  icon: BrandIconData;
  /** Glyph size in px (the chip adds padding around it). Default 28. */
  size?: number;
  /** Render on a white rounded chip with a soft border. Default true. */
  chip?: boolean;
  /** Fill override; defaults to the brand hex, else the ink color. */
  color?: string;
  /** Optional caption below. */
  label?: string;
  labelSize?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Real trademark logo, for the brand-tile rows in architecture posters
 * (OpenAI / Slack / Postgres...). Brand logos are the one asset class
 * that is never hand-drawn — keep glyphs for concepts and BrandIcon
 * for companies. Chip mode reproduces the BBG logo-tile look.
 */
export const BrandIcon: React.FC<BrandIconProps> = ({
  icon,
  size = 28,
  chip = true,
  color,
  label,
  labelSize = 13,
  style,
  debugId,
}) => {
  const f = useFrame();
  const ink = useInk();
  const { theme } = useTheme();
  const fill = color ?? (icon.hex ? `#${icon.hex}` : ink.heading);
  const svg = (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={icon.path} fill={fill} />
    </svg>
  );
  return (
    <DebugOverlay id={debugId} kind="brand-icon">
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          fontFamily: fonts.sans,
          ...style,
        }}
      >
        {chip ? (
          <div
            style={{
              background: f.surface,
              border: `1.5px solid ${f.border}${theme === "dark" ? "2E" : "1F"}`,
              borderRadius: Math.round(size * 0.42),
              padding: Math.round(size * 0.32),
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {svg}
          </div>
        ) : (
          svg
        )}
        {label ? (
          <span
            style={{
              fontSize: labelSize,
              fontWeight: 600,
              color: ink.body,
              lineHeight: 1.2,
            }}
          >
            {label}
          </span>
        ) : null}
      </div>
    </DebugOverlay>
  );
};
