import React from "react";
import { Card } from "./Card";
import { Arrow } from "./Arrow";
import { useInk } from "./theme";
import { type PaletteColor } from "./palette";

export type SwimLane = {
  id: string;
  title: string;
  subtitle?: string;
  color: PaletteColor;
  /** X position of the lane center (canvas coords). */
  x: number;
};

type SwimLanesProps = {
  lanes: SwimLane[];
  /** Y position of the actor header cards (anchor "top-center"). Default 150. */
  headerY?: number;
  /** Lifeline vertical extent. */
  lifeline: { top: number; bottom: number };
  /** Lifeline stroke color. Defaults to current theme's muted ink. */
  lifelineColor?: string;
  /** Override card padding / sizing. */
  headerPadding?: string;
  headerRadius?: number;
  headerTitleSize?: number;
  headerSubtitleSize?: number;
};

/**
 * Sequence-diagram swim lanes — header cards per actor + dashed vertical
 * lifelines. Place additional `Card`s and `Arrow`s inside the same Canvas
 * using `lanes[i].x` to align with each lane.
 *
 * Lifelines are emitted without a `debugId` (they legitimately span the
 * full diagram height); on-lane cards must use solid fills, never
 * `outline`, or the dashed line will show through.
 */
export const SwimLanes: React.FC<SwimLanesProps> = ({
  lanes,
  headerY = 150,
  lifeline,
  lifelineColor,
  headerPadding = "12px 26px",
  headerRadius = 14,
  headerTitleSize = 24,
  headerSubtitleSize = 14,
}) => {
  const ink = useInk();
  const stroke = lifelineColor ?? ink.muted;
  return (
    <>
      {lanes.map((lane) => (
        <div
          key={lane.id}
          style={{
            position: "absolute",
            left: lane.x,
            top: headerY,
            transform: "translate(-50%, 0)",
          }}
        >
          <Card
            debugId={`lane-${lane.id}`}
            color={lane.color}
            title={lane.title}
            subtitle={lane.subtitle}
            padding={headerPadding}
            radius={headerRadius}
            titleSize={headerTitleSize}
            subtitleSize={headerSubtitleSize}
          />
        </div>
      ))}
      {lanes.map((lane) => (
        <Arrow
          key={`lifeline-${lane.id}`}
          from={{ x: lane.x, y: lifeline.top }}
          to={{ x: lane.x, y: lifeline.bottom }}
          color={stroke}
          strokeWidth={1.5}
          arrowEnd={false}
          dashed
        />
      ))}
    </>
  );
};
