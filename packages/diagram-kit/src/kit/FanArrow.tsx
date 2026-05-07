import React from "react";
import { Arrow } from "./Arrow";

export type FanArrowTarget = {
  /** Stable identifier; used as React key and to derive the per-branch debugId. */
  id: string;
  /** Endpoint of the branch (canvas-absolute coordinates). */
  to: { x: number; y: number };
  /** Optional label rendered along the branch. */
  label?: string;
  /** Position along the branch's first segment (0..1). Default 0.5. */
  labelT?: number;
  /** Perpendicular offset for the label in px. Default -12. */
  labelOffset?: number;
  /** Override the parent color for this branch only. */
  color?: string;
};

type FanArrowProps = {
  /** Shared origin (canvas-absolute coordinates). */
  from: { x: number; y: number };
  /** N branch endpoints. */
  targets: FanArrowTarget[];
  /** Stroke color applied to every branch unless a target overrides it. */
  color?: string;
  /** Stroke width (default 2). */
  strokeWidth?: number;
  /** Arrow head size (default 10). */
  headSize?: number;
  /** 0..1 draw-in progress applied to every branch. */
  progress?: number;
  /** Render dashed lines (e.g. for async / replication branches). */
  dashed?: boolean;
  /**
   * Parent id. Each branch's `Arrow` gets `debugId` = `${debugId}-${target.id}`
   * so the collision checker can distinguish branches.
   */
  debugId?: string;
};

/**
 * One source -> N targets, all branches sharing the same origin. BBG
 * uses this pattern for "writes to multiple replicas", "broadcasts to
 * subscribers", or any radial dispatch from a single node.
 *
 * Place at canvas top level (NOT inside `<At>`); coordinates are
 * canvas-absolute, like `Arrow`.
 */
export const FanArrow: React.FC<FanArrowProps> = ({
  from,
  targets,
  color,
  strokeWidth,
  headSize,
  progress,
  dashed,
  debugId,
}) => (
  <>
    {targets.map((t) => (
      <Arrow
        key={t.id}
        from={from}
        to={t.to}
        color={t.color ?? color}
        strokeWidth={strokeWidth}
        headSize={headSize}
        label={t.label}
        labelT={t.labelT}
        labelOffset={t.labelOffset}
        progress={progress}
        dashed={dashed}
        debugId={debugId != null ? `${debugId}-${t.id}` : undefined}
      />
    ))}
  </>
);
