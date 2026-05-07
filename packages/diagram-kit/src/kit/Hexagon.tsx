import React from "react";
import { useSwatch } from "./theme";
import { fonts } from "./fonts";
import { PaletteColor } from "./palette";
import { DebugOverlay } from "./Debug";

export type HexagonOrientation = "flat" | "pointy";

type HexagonProps = {
  color: PaletteColor;
  /** Bounding-box width in px. Default 80. */
  size?: number;
  /**
   * `flat` (default) — flat top/bottom edges, two pointy sides.
   * `pointy` — pointy top/bottom, two flat sides.
   * Flat-top is the BBG canon for radial mind-map hubs.
   */
  orientation?: HexagonOrientation;
  /** Optional label centered inside. */
  label?: string;
  /** Label font size. Default 14. */
  labelSize?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

const SQRT3 = Math.sqrt(3);

/**
 * Regular hexagon — used as the radial-mind-map hub or a "service"
 * marker. SVG `<polygon>` with 6 vertices computed from the chosen
 * orientation. Width is fixed at `size`; height is derived from
 * orientation (flat-top is wider than tall, pointy-top is taller
 * than wide).
 */
export const Hexagon: React.FC<HexagonProps> = ({
  color,
  size = 80,
  orientation = "flat",
  label,
  labelSize = 14,
  style,
  debugId,
}) => {
  const p = useSwatch(color);
  const w = size;
  const h = orientation === "flat" ? size * (SQRT3 / 2) : size;
  const bw = orientation === "flat" ? w : size * (SQRT3 / 2);
  // bw = bounding-box width when computed from a `size` that means
  // bounding-box width along the long axis. For pointy-top we used
  // `size` as height, so the actual bounding-box width is narrower.
  const actualW = orientation === "flat" ? w : bw;
  const r = orientation === "flat" ? w / 2 : size / 2;
  const cx = actualW / 2;
  const cy = h / 2;
  const angles =
    orientation === "flat"
      ? [0, 60, 120, 180, 240, 300]
      : [30, 90, 150, 210, 270, 330];
  const points = angles
    .map((deg) => {
      const rad = (deg * Math.PI) / 180;
      return `${cx + r * Math.cos(rad)},${cy + r * Math.sin(rad)}`;
    })
    .join(" ");
  return (
    <DebugOverlay id={debugId} kind="hexagon">
      <div
        style={{
          position: "relative",
          display: "inline-block",
          width: actualW,
          height: h,
          ...style,
        }}
      >
        <svg
          width={actualW}
          height={h}
          viewBox={`0 0 ${actualW} ${h}`}
          aria-hidden="true"
          focusable="false"
        >
          <polygon
            points={points}
            fill={p.bg}
            stroke={p.border}
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </svg>
        {label ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: actualW,
              height: h,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: p.text,
              fontFamily: fonts.sans,
              fontWeight: 700,
              fontSize: labelSize,
              textAlign: "center",
              padding: "0 12px",
              lineHeight: 1.15,
              pointerEvents: "none",
            }}
          >
            {label}
          </div>
        ) : null}
      </div>
    </DebugOverlay>
  );
};
