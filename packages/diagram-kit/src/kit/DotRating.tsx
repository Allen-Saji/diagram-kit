import React from "react";
import { useSwatch, useInk } from "./theme";
import { fonts } from "./fonts";
import { PaletteColor } from "./palette";
import { DebugOverlay } from "./Debug";

type DotRatingProps = {
  /** Number of filled dots (clamped to [0, max]). */
  value: number;
  /** Total dot count. */
  max: number;
  /** Palette color used for the filled dots and ring. Default mint. */
  color?: PaletteColor;
  /** Diameter of each dot in px. Default 12. */
  size?: number;
  /** Gap between dots in px. Default 4. */
  gap?: number;
  /** Optional label rendered next to the dots. */
  label?: string;
  /** Side the label sits on. Default `right`. */
  labelPosition?: "left" | "right";
  /** Label font size. Default 14. */
  labelSize?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * N-of-M filled dots — compact scoring widget for "how strong is X
 * along this dimension" tables. Pairs cleanly with `ComparisonTable`
 * cells when the comparison is rough rather than precise.
 */
export const DotRating: React.FC<DotRatingProps> = ({
  value,
  max,
  color = "mint",
  size = 12,
  gap = 4,
  label,
  labelPosition = "right",
  labelSize = 14,
  style,
  debugId,
}) => {
  const p = useSwatch(color);
  const ink = useInk();
  const clamped = Math.max(0, Math.min(max, Math.floor(value)));
  const dots = (
    <span
      style={{
        display: "inline-flex",
        gap,
        alignItems: "center",
        verticalAlign: "middle",
      }}
    >
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < clamped;
        return (
          <span
            key={i}
            style={{
              width: size,
              height: size,
              borderRadius: "50%",
              background: filled ? p.border : "transparent",
              border: `1.5px solid ${p.border}`,
              display: "inline-block",
            }}
          />
        );
      })}
    </span>
  );
  const labelEl = label ? (
    <span
      style={{
        fontSize: labelSize,
        fontWeight: 500,
        color: ink.body,
      }}
    >
      {label}
    </span>
  ) : null;
  return (
    <DebugOverlay id={debugId} kind="rating">
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          fontFamily: fonts.sans,
          ...style,
        }}
      >
        {labelPosition === "left" && labelEl}
        {dots}
        {labelPosition === "right" && labelEl}
      </span>
    </DebugOverlay>
  );
};
