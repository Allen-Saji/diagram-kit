import React, { useLayoutEffect } from "react";
import { ink, frame } from "./palette";
import { fonts } from "./fonts";
import { useCanvas } from "./Canvas";
import { useDebug } from "./Debug";

export type Point = { x: number; y: number };

type ArrowProps = {
  from: Point;
  to: Point;
  /** Waypoints for elbow/polyline routing, in order from `from` to `to`. */
  waypoints?: Point[];
  color?: string;
  strokeWidth?: number;
  headSize?: number;
  /** Arrow head at end. Default true. */
  arrowEnd?: boolean;
  /** Arrow head at start. Default false. */
  arrowStart?: boolean;
  /** Optional label anchored along the path */
  label?: React.ReactNode;
  /** 0..1 position along the *first* segment for the label (simple cases) */
  labelT?: number;
  /** Background color behind the label (so it visually breaks the line). Default white. */
  labelBackground?: string;
  /** Offset label perpendicular from line (pixels). Positive = below/right. */
  labelOffset?: number;
  labelColor?: string;
  labelSize?: number;
  labelWeight?: number;
  /** Dashed stroke */
  dashed?: boolean;
  /** 0..1 draw-in progress. 1 = fully drawn. undefined = fully drawn. */
  progress?: number;
  /**
   * When set and debug emit is on, the arrow's segments are logged via
   * console.log (prefix "ARROW::") so scripts/check.mjs can run
   * arrow-vs-card intersection checks.
   */
  debugId?: string;
};

const uid = (() => {
  let n = 0;
  return () => `ark${++n}`;
})();

export const Arrow: React.FC<ArrowProps> = ({
  from,
  to,
  waypoints = [],
  color = ink.arrow,
  strokeWidth = 2,
  headSize = 10,
  arrowEnd = true,
  arrowStart = false,
  label,
  labelT = 0.5,
  labelBackground = frame.bg,
  labelOffset = 0,
  labelColor = ink.body,
  labelSize = 14,
  labelWeight = 500,
  dashed = false,
  progress,
  debugId,
}) => {
  const canvas = useCanvas();
  const { emit } = useDebug();
  const points = [from, ...waypoints, to];

  // Emit arrow geometry for scripts/check.mjs. Fires once on mount when
  // emit is on and a debugId is provided. Segments serialize the path so
  // the checker can run segment-vs-rect intersection against every card.
  const segKey = JSON.stringify(points);
  useLayoutEffect(() => {
    if (!emit || !debugId) return;
    const segments = [];
    for (let i = 1; i < points.length; i++) {
      segments.push({ from: points[i - 1], to: points[i] });
    }
    const payload = { id: debugId, segments };
    // eslint-disable-next-line no-console
    console.log(`ARROW::${JSON.stringify(payload)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emit, debugId, segKey]);

  // Reveal opacity for markers + label. When progress is undefined
  // (static render), everything is fully visible. When progress is
  // defined (DrawArrow), fade in with the line draw so frame 0 doesn't
  // show heads/labels before the stroke has started.
  const reveal = progress !== undefined ? Math.max(0, Math.min(1, progress)) : 1;

  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const id = React.useMemo(() => uid(), []);
  const endMarker = `url(#${id}-end)`;
  const startMarker = `url(#${id}-start)`;

  // total path length for dash animation
  const length = React.useMemo(() => {
    let total = 0;
    for (let i = 1; i < points.length; i++) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      total += Math.sqrt(dx * dx + dy * dy);
    }
    return total;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(points)]);

  const drawStyle: React.CSSProperties =
    progress !== undefined
      ? {
          strokeDasharray: length,
          strokeDashoffset: length * (1 - progress),
        }
      : dashed
      ? { strokeDasharray: "6 6" }
      : {};

  // label anchored along first segment
  const labelAnchor = label
    ? {
        x: points[0].x + (points[1].x - points[0].x) * labelT,
        y: points[0].y + (points[1].y - points[0].y) * labelT,
      }
    : null;
  const segDx = label ? points[1].x - points[0].x : 0;
  const segDy = label ? points[1].y - points[0].y : 0;
  const segLen = Math.sqrt(segDx * segDx + segDy * segDy) || 1;
  const nX = -segDy / segLen;
  const nY = segDx / segLen;
  const labelPos = labelAnchor
    ? {
        x: labelAnchor.x + nX * labelOffset,
        y: labelAnchor.y + nY * labelOffset,
      }
    : null;

  return (
    <>
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: canvas.w,
          height: canvas.h,
          pointerEvents: "none",
          overflow: "visible",
        }}
        viewBox={`0 0 ${canvas.w} ${canvas.h}`}
      >
        <defs>
          <marker
            id={`${id}-end`}
            markerWidth={headSize}
            markerHeight={headSize}
            refX={headSize * 0.9}
            refY={headSize / 2}
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path
              d={`M 0 0 L ${headSize} ${headSize / 2} L 0 ${headSize} Z`}
              fill={color}
              opacity={reveal}
            />
          </marker>
          <marker
            id={`${id}-start`}
            markerWidth={headSize}
            markerHeight={headSize}
            refX={headSize * 0.1}
            refY={headSize / 2}
            orient="auto-start-reverse"
            markerUnits="userSpaceOnUse"
          >
            <path
              d={`M 0 0 L ${headSize} ${headSize / 2} L 0 ${headSize} Z`}
              fill={color}
              opacity={reveal}
            />
          </marker>
        </defs>
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          markerEnd={arrowEnd ? endMarker : undefined}
          markerStart={arrowStart ? startMarker : undefined}
          style={drawStyle}
        />
      </svg>
      {label && labelPos ? (
        <div
          data-dk-skip="arrow-label"
          style={{
            position: "absolute",
            left: labelPos.x,
            top: labelPos.y,
            transform: "translate(-50%, -50%)",
            background: labelBackground,
            padding: "2px 8px",
            borderRadius: 6,
            fontFamily: fonts.sans,
            fontSize: labelSize,
            fontWeight: labelWeight,
            color: labelColor,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            opacity: reveal,
          }}
        >
          {label}
        </div>
      ) : null}
    </>
  );
};
