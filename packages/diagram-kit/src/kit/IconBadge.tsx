import React from "react";
import { useSwatch } from "./theme";
import { PaletteColor } from "./palette";
import { DebugOverlay } from "./Debug";

type IconBadgeProps = {
  /** Icon node. Use a small `<span>` with an emoji or an inline SVG. */
  icon: React.ReactNode;
  color?: PaletteColor;
  /** Diameter in px. Default 32. */
  size?: number;
  /** `solid` = filled bg, `outline` = transparent bg with colored ring. */
  variant?: "solid" | "outline";
  /**
   * Font size used for the icon node when it's text/emoji. Default
   * 50% of `size`. SVG icons size themselves; this is a hint for
   * emoji height.
   */
  iconSize?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Small colored disc with an arbitrary icon inside. Differs from
 * `StepBadge` in that the inner content is an icon (emoji, SVG, or
 * single character), not a sequence number. Used on ER diagrams to
 * mark entity types ("user", "doc", "lock") and on architecture
 * diagrams as small visual category cues.
 */
export const IconBadge: React.FC<IconBadgeProps> = ({
  icon,
  color = "mint",
  size = 32,
  variant = "solid",
  iconSize,
  style,
  debugId,
}) => {
  const p = useSwatch(color);
  const isSolid = variant === "solid";
  return (
    <DebugOverlay id={debugId} kind="icon-badge">
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: isSolid ? p.bg : "transparent",
          border: `2px solid ${p.border}`,
          color: p.text,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: iconSize ?? Math.round(size * 0.5),
          lineHeight: 1,
          ...style,
        }}
      >
        {icon}
      </div>
    </DebugOverlay>
  );
};
