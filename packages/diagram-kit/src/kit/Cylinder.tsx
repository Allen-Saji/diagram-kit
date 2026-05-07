import React from "react";
import { useSwatch, useInk } from "./theme";
import { fonts } from "./fonts";
import { PaletteColor } from "./palette";
import { DebugOverlay } from "./Debug";

type CylinderProps = {
  color: PaletteColor;
  /** Long axis of the top ellipse (and overall width). Default 80. */
  width?: number;
  /** Top-of-rim to bottom-of-front-arc total height. Default 100. */
  height?: number;
  /**
   * Half-height of the ellipses (rim depth). Default = `width * 0.18`,
   * clamped to >= 8 px. Tune lower for thinner rims, higher for a
   * chunkier database.
   */
  rim?: number;
  /** Optional caption rendered below the cylinder. */
  label?: string;
  /** Caption font size. Default 14. */
  labelSize?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Stylized 3D database glyph — top ellipse rim, vertical body sides,
 * front-arc-only bottom (the back of the bottom ellipse is hidden by
 * the body and never drawn). Color-keyed via the palette so a diagram
 * with multiple data stores can color-distinguish them.
 *
 * Drawing order matters: body fill -> bottom-cap fill -> body sides ->
 * bottom front arc -> top ellipse last (so the top rim sits on top of
 * the body fill cleanly).
 */
export const Cylinder: React.FC<CylinderProps> = ({
  color,
  width = 80,
  height = 100,
  rim,
  label,
  labelSize = 14,
  style,
  debugId,
}) => {
  const p = useSwatch(color);
  const ink = useInk();
  const ry = Math.max(8, rim ?? Math.round(width * 0.18));
  const bodyTop = ry;
  const bodyBottom = height - ry;
  const halfW = width / 2;
  return (
    <DebugOverlay id={debugId} kind="cylinder">
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
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          aria-hidden="true"
          focusable="false"
        >
          {/* Body rect fill (no stroke; sides drawn explicitly). */}
          <rect
            x={0}
            y={bodyTop}
            width={width}
            height={bodyBottom - bodyTop}
            fill={p.bg}
          />
          {/* Bottom cap fill — half ellipse below the body rect. */}
          <path
            d={`M 0 ${bodyBottom} A ${halfW} ${ry} 0 0 0 ${width} ${bodyBottom} Z`}
            fill={p.bg}
          />
          {/* Body sides. */}
          <line
            x1={0}
            y1={bodyTop}
            x2={0}
            y2={bodyBottom}
            stroke={p.border}
            strokeWidth={2}
          />
          <line
            x1={width}
            y1={bodyTop}
            x2={width}
            y2={bodyBottom}
            stroke={p.border}
            strokeWidth={2}
          />
          {/* Bottom front arc only (back arc would be hidden by body). */}
          <path
            d={`M 0 ${bodyBottom} A ${halfW} ${ry} 0 0 0 ${width} ${bodyBottom}`}
            fill="none"
            stroke={p.border}
            strokeWidth={2}
          />
          {/* Top ellipse — drawn last so it sits on top of the body. */}
          <ellipse
            cx={halfW}
            cy={bodyTop}
            rx={halfW}
            ry={ry}
            fill={p.bg}
            stroke={p.border}
            strokeWidth={2}
          />
        </svg>
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
