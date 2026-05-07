import React from "react";
import { useSwatch, useInk } from "./theme";
import { fonts } from "./fonts";
import { PaletteColor } from "./palette";
import { DebugOverlay } from "./Debug";

export type IconNodeShape = "document" | "server-rack";

type IconNodeProps = {
  shape: IconNodeShape;
  /** Palette color. Default `gray`. */
  color?: PaletteColor;
  /** SVG width. Default depends on shape (document 60, server-rack 80). */
  width?: number;
  /** SVG height. Default depends on shape (document 80, server-rack 100). */
  height?: number;
  /** Optional caption below the glyph. */
  label?: string;
  /** Caption font size. Default 14. */
  labelSize?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

const DEFAULTS: Record<IconNodeShape, { w: number; h: number }> = {
  document: { w: 60, h: 80 },
  "server-rack": { w: 80, h: 100 },
};

/**
 * Single primitive that draws one of a small set of canonical
 * "object" glyphs — document (page with folded corner) or
 * server-rack (4-slot rack with status LEDs). Lumped as one
 * primitive with a `shape` variant rather than separate exports so
 * the kit's surface stays small and additional shapes drop in
 * naturally.
 */
export const IconNode: React.FC<IconNodeProps> = ({
  shape,
  color = "gray",
  width,
  height,
  label,
  labelSize = 14,
  style,
  debugId,
}) => {
  const p = useSwatch(color);
  const ink = useInk();
  const defaults = DEFAULTS[shape];
  const w = width ?? defaults.w;
  const h = height ?? defaults.h;
  return (
    <DebugOverlay id={debugId} kind={`icon-node:${shape}`}>
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
        {shape === "document" ? (
          <DocumentGlyph w={w} h={h} bg={p.bg} border={p.border} />
        ) : (
          <ServerRackGlyph w={w} h={h} bg={p.bg} border={p.border} />
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

const DocumentGlyph: React.FC<{
  w: number;
  h: number;
  bg: string;
  border: string;
}> = ({ w, h, bg, border }) => {
  const fold = Math.min(w, h) * 0.28;
  const inset = 2;
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={`M ${inset} ${inset} L ${w - fold} ${inset} L ${w - inset} ${fold} L ${w - inset} ${h - inset} L ${inset} ${h - inset} Z`}
        fill={bg}
        stroke={border}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <path
        d={`M ${w - fold} ${inset} L ${w - fold} ${fold} L ${w - inset} ${fold}`}
        fill="none"
        stroke={border}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* Soft horizontal rules suggesting text. */}
      <line
        x1={10}
        y1={Math.round(h * 0.5)}
        x2={w - 10}
        y2={Math.round(h * 0.5)}
        stroke={border}
        strokeWidth={1.5}
        opacity={0.4}
      />
      <line
        x1={10}
        y1={Math.round(h * 0.65)}
        x2={w - 14}
        y2={Math.round(h * 0.65)}
        stroke={border}
        strokeWidth={1.5}
        opacity={0.4}
      />
      <line
        x1={10}
        y1={Math.round(h * 0.8)}
        x2={w - 18}
        y2={Math.round(h * 0.8)}
        stroke={border}
        strokeWidth={1.5}
        opacity={0.4}
      />
    </svg>
  );
};

const ServerRackGlyph: React.FC<{
  w: number;
  h: number;
  bg: string;
  border: string;
}> = ({ w, h, bg, border }) => {
  const slots = 4;
  const slotPadding = 6;
  const slotHeight = (h - slotPadding * (slots + 1)) / slots;
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x={2}
        y={2}
        width={w - 4}
        height={h - 4}
        fill={bg}
        stroke={border}
        strokeWidth={2}
        rx={6}
      />
      {Array.from({ length: slots }).map((_, i) => {
        const slotY = slotPadding + i * (slotHeight + slotPadding);
        const ledY = slotY + slotHeight / 2;
        return (
          <g key={i}>
            <rect
              x={slotPadding}
              y={slotY}
              width={w - slotPadding * 2}
              height={slotHeight}
              fill="none"
              stroke={border}
              strokeWidth={1.5}
              rx={3}
            />
            <circle
              cx={w - slotPadding - 6}
              cy={ledY}
              r={2.5}
              fill={border}
              opacity={0.7}
            />
          </g>
        );
      })}
    </svg>
  );
};
