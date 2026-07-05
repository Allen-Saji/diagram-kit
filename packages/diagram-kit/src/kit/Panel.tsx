import React from "react";
import { useFrame, useInk, useTheme, sketchRadius } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

type PanelVariant = "solid" | "dashed";

type PanelProps = {
  title?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  /** padding inside the panel; default 32 */
  padding?: number;
  /** border radius of the frame; default 20 */
  radius?: number;
  /** override border color; default near-black */
  borderColor?: string;
  /**
   * Frame style. `solid` (default) is the canonical BBG panel — filled
   * background, solid border. `dashed` is for loose grouping: dashed
   * border, transparent background so cards or other content sitting
   * beneath show through.
   */
  variant?: PanelVariant;
  /** Identifier surfaced by the debug overlay and collision checker. */
  debugId?: string;
};

export const Panel: React.FC<PanelProps> = ({
  title,
  children,
  style,
  padding = 32,
  radius = 20,
  borderColor,
  variant = "solid",
  debugId,
}) => {
  const frame = useFrame();
  const ink = useInk();
  const { theme } = useTheme();
  const resolvedBorder = borderColor ?? frame.border;
  const isDashed = variant === "dashed";
  const frameBackground = isDashed ? "transparent" : frame.bg;
  const frameBorder = `2px ${isDashed ? "dashed" : "solid"} ${resolvedBorder}`;
  // Auto-id for the pill title so its text gets tracked as an obstacle
  // for arrow intersection. Falls back to a slugified title when no
  // explicit debugId is given — the convention is Panels don't take
  // debugId (they'd false-positive overlap every contained child), so
  // the pill is the part we actually want to track.
  const pillId =
    debugId != null
      ? `${debugId}-pill`
      : typeof title === "string" && title.length > 0
      ? `panel-pill:${title.toLowerCase().replace(/\s+/g, "-").slice(0, 40)}`
      : undefined;

  return (
    <DebugOverlay id={debugId} kind="panel">
    <div
      style={{
        position: "relative",
        background: frameBackground,
        border: frameBorder,
        borderRadius: sketchRadius(theme) ?? radius,
        padding,
        paddingTop: title ? padding + 16 : padding,
        fontFamily: fonts.sans,
        color: ink.body,
        ...style,
      }}
    >
      {title ? (
        <div
          style={{
            position: "absolute",
            top: -18,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <DebugOverlay id={pillId} kind="panel-title">
            <div
              style={{
                background: frame.bg,
                border: `2px solid ${resolvedBorder}`,
                borderRadius: 999,
                padding: "4px 24px",
                fontSize: 22,
                fontWeight: 700,
                color: ink.heading,
                letterSpacing: -0.1,
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>
          </DebugOverlay>
          {/* Pill title sits centered on the panel's top border. The
              pill always has a solid background so the dashed border
              behind it stays visually behind, not bleeding through. */}
        </div>
      ) : null}
      {children}
    </div>
    </DebugOverlay>
  );
};
