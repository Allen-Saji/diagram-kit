import React from "react";
import { useSwatch, useInk } from "./theme";
import { fonts } from "./fonts";
import { PaletteColor } from "./palette";
import { DebugOverlay } from "./Debug";

export type VennCircle = {
  /** Stable identifier; used as React key. */
  id: string;
  /** Display label rendered above the circle by default. */
  label: string;
  color: PaletteColor;
  /** Center x in SVG-local coordinates. */
  cx: number;
  /** Center y in SVG-local coordinates. */
  cy: number;
  /** Radius in px. */
  r: number;
  /**
   * Override label placement (SVG-local). Defaults to centered above
   * the circle: `(cx, cy - r - 12)`.
   */
  labelAt?: { x: number; y: number };
};

export type VennIntersectionLabel = {
  /** Where to render the label (SVG-local coordinates). */
  x: number;
  y: number;
  label: string;
};

type VennProps = {
  /** SVG width. */
  width: number;
  /** SVG height. */
  height: number;
  /** Two or three circles — Venn diagrams beyond 3-set become unreadable. */
  circles: VennCircle[];
  /** Optional intersection labels at user-supplied positions. */
  intersectionLabels?: VennIntersectionLabel[];
  /** Fill opacity per circle so overlaps blend. Default 0.45. */
  fillOpacity?: number;
  /** Circle label font size. Default 16. */
  labelSize?: number;
  /** Intersection label font size. Default 14. */
  intersectionLabelSize?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

const MIN_CIRCLES = 2;
const MAX_CIRCLES = 3;

/**
 * Venn diagram — 2 or 3 overlapping circles with translucent fills so
 * the overlaps blend visually. Caller supplies circle positions; this
 * primitive does not auto-layout. Intersection labels are also placed
 * by hand (`(x, y)` in SVG-local coords) since the geometry of which
 * point is "inside" two circles is composition-specific.
 *
 * SVG text is used for labels so they participate in the same
 * font-loading as the rest of the kit. They do not show up in the
 * orphan walker (which only inspects HTML text nodes), so labels
 * never flag as obstacles for arrow intersection.
 */
export const Venn: React.FC<VennProps> = ({
  width,
  height,
  circles,
  intersectionLabels = [],
  fillOpacity = 0.45,
  labelSize = 16,
  intersectionLabelSize = 14,
  style,
  debugId,
}) => {
  if (circles.length < MIN_CIRCLES || circles.length > MAX_CIRCLES) {
    throw new Error(
      `Venn requires ${MIN_CIRCLES}-${MAX_CIRCLES} circles; got ${circles.length}.`,
    );
  }
  return (
    <DebugOverlay id={debugId} kind="venn">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={style}
        aria-hidden="true"
        focusable="false"
      >
        {circles.map((c) => (
          <VennCircleSvg
            key={c.id}
            circle={c}
            fillOpacity={fillOpacity}
          />
        ))}
        {circles.map((c) => (
          <VennLabelSvg key={`label-${c.id}`} circle={c} size={labelSize} />
        ))}
        {intersectionLabels.map((il, i) => (
          <VennIntersectionText
            key={`il-${i}`}
            label={il}
            size={intersectionLabelSize}
          />
        ))}
      </svg>
    </DebugOverlay>
  );
};

const VennCircleSvg: React.FC<{
  circle: VennCircle;
  fillOpacity: number;
}> = ({ circle, fillOpacity }) => {
  const p = useSwatch(circle.color);
  return (
    <circle
      cx={circle.cx}
      cy={circle.cy}
      r={circle.r}
      fill={p.bg}
      fillOpacity={fillOpacity}
      stroke={p.border}
      strokeWidth={2}
    />
  );
};

const VennLabelSvg: React.FC<{ circle: VennCircle; size: number }> = ({
  circle,
  size,
}) => {
  const p = useSwatch(circle.color);
  const at = circle.labelAt ?? {
    x: circle.cx,
    y: circle.cy - circle.r - 12,
  };
  return (
    <text
      x={at.x}
      y={at.y}
      textAnchor="middle"
      fontFamily={fonts.sans}
      fontSize={size}
      fontWeight={700}
      fill={p.text}
    >
      {circle.label}
    </text>
  );
};

const VennIntersectionText: React.FC<{
  label: VennIntersectionLabel;
  size: number;
}> = ({ label, size }) => {
  const ink = useInk();
  return (
    <text
      x={label.x}
      y={label.y}
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily={fonts.sans}
      fontSize={size}
      fontWeight={600}
      fill={ink.body}
    >
      {label.label}
    </text>
  );
};
