import React from "react";
import { PaletteColor } from "./palette";
import { useSwatch } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";

type StepBadgeProps = {
  /** The number (or short label) shown inside the circle. */
  n: number | string;
  /** Palette color key. Default `mint`. */
  color?: PaletteColor;
  /** Diameter in px. Default 32. */
  size?: number;
  /** `solid` = filled bg, `outline` = transparent bg with colored ring. */
  variant?: "solid" | "outline";
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Circled step indicator (1, 2, 3...) for numbered flows. BBG uses these
 * on nearly every multi-step diagram. Place standalone via `<At>` or use
 * as an `Arrow` label override.
 */
export const StepBadge: React.FC<StepBadgeProps> = ({
  n,
  color = "mint",
  size = 32,
  variant = "solid",
  style,
  debugId,
}) => {
  const p = useSwatch(color);
  const isSolid = variant === "solid";
  return (
    <DebugOverlay id={debugId} kind="badge">
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: isSolid ? p.border : "transparent",
          border: `2px solid ${p.border}`,
          color: isSolid ? "#FFFFFF" : p.border,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: fonts.sans,
          fontWeight: 700,
          fontSize: Math.round(size * 0.5),
          lineHeight: 1,
          ...style,
        }}
      >
        {n}
      </div>
    </DebugOverlay>
  );
};
