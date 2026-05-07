import React from "react";
import { At } from "./Canvas";
import { Arrow } from "./Arrow";

export type RadialMindMapSpoke = {
  /** Stable identifier; used as React key. */
  id: string;
  /** Leaf node, rendered at the calculated spoke position. */
  content: React.ReactNode;
};

type RadialMindMapProps = {
  /** Hub node (typically a `Hexagon` or `Card`). */
  center: React.ReactNode;
  /** Hub center on the canvas (canvas-absolute coordinates). */
  centerAt: { x: number; y: number };
  /**
   * 3 to 8 leaves. Capped at the upper bound to keep the layout
   * legible; for arbitrary fan-out use `FanArrow` with manual
   * leaf positions.
   */
  spokes: RadialMindMapSpoke[];
  /** Distance from hub center to leaf center in px. Default 220. */
  radius?: number;
  /**
   * First leaf's angle in degrees (SVG convention: 0 = right,
   * 90 = down, 270 = up). Default 270 — first leaf at 12 o'clock.
   */
  startAngle?: number;
  /** Spoke arrow color. Defaults to the kit's arrow ink. */
  arrowColor?: string;
  /** Spoke arrow stroke width. Default 2. */
  strokeWidth?: number;
  /** 0..1 draw-in progress applied to every spoke. */
  progress?: number;
};

const MIN_SPOKES = 3;
const MAX_SPOKES = 8;

/**
 * Radial mind-map — center hub plus 3-8 leaves arranged on a circle
 * around it. Each leaf is connected to the hub by a head-less line.
 *
 * Spokes do not carry a `debugId` because they intentionally pass
 * through the hub at its center; flagging would false-positive every
 * frame. For collision tracking on arrows, draw them separately
 * outside this primitive.
 *
 * Place at canvas top level (NOT inside `<At>`); `centerAt` is
 * canvas-absolute and the primitive lays out its own children.
 */
export const RadialMindMap: React.FC<RadialMindMapProps> = ({
  center,
  centerAt,
  spokes,
  radius = 220,
  startAngle = 270,
  arrowColor,
  strokeWidth,
  progress,
}) => {
  if (spokes.length < MIN_SPOKES || spokes.length > MAX_SPOKES) {
    throw new Error(
      `RadialMindMap requires ${MIN_SPOKES}-${MAX_SPOKES} spokes; got ${spokes.length}. ` +
        `For arbitrary fan-out use FanArrow with manual leaf positions.`,
    );
  }
  const N = spokes.length;
  const positions = spokes.map((spoke, i) => {
    const angleDeg = startAngle + (i / N) * 360;
    const angleRad = (angleDeg * Math.PI) / 180;
    return {
      ...spoke,
      x: centerAt.x + radius * Math.cos(angleRad),
      y: centerAt.y + radius * Math.sin(angleRad),
    };
  });
  return (
    <>
      {/* Spokes drawn first so the hub + leaves render on top. */}
      {positions.map((s) => (
        <Arrow
          key={`arrow-${s.id}`}
          from={centerAt}
          to={{ x: s.x, y: s.y }}
          arrowEnd={false}
          color={arrowColor}
          strokeWidth={strokeWidth}
          progress={progress}
        />
      ))}
      <At x={centerAt.x} y={centerAt.y} anchor="center">
        {center}
      </At>
      {positions.map((s) => (
        <At key={s.id} x={s.x} y={s.y} anchor="center">
          {s.content}
        </At>
      ))}
    </>
  );
};
