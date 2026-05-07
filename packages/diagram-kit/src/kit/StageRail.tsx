import React from "react";
import { fonts } from "./fonts";
import { useInk, useFrame } from "./theme";
import { type PaletteColor } from "./palette";
import { useSwatch } from "./theme";
import { DebugOverlay } from "./Debug";

export type Stage = {
  id: string;
  /** Short label rendered under the icon. */
  label: string;
  /** Icon node placed in the rail tile. Sized at ~36px square. */
  icon: React.ReactNode;
  /** Palette color tint for the icon tile. */
  color?: PaletteColor;
  /** Right-side content for this stage. Positioned absolutely inside the band. */
  content: React.ReactNode;
};

type StageRailProps = {
  /** Top-left corner of the rail (canvas coords). */
  origin: { x: number; y: number };
  /** Total layout width. The rail occupies `railWidth`, content fills the rest. */
  width: number;
  /** Per-stage row height. Default 140. */
  rowHeight?: number;
  /** Width of the left rail column. Default 140. */
  railWidth?: number;
  /** Gap between rail tile and content area. Default 24. */
  gap?: number;
  stages: Stage[];
  /** Background color for rail tiles. Defaults to current theme bg. */
  tileBackground?: string;
};

/**
 * Stage rail layout — left vertical column of icon+label tiles, each row
 * tied to a content panel on the right. BBG uses this for the JVM,
 * Load Balancer, and DoorDash architecture diagrams.
 *
 * Content for each stage is rendered with a top-left origin inside its band;
 * compose with absolute positioning relative to the band's natural box.
 */
export const StageRail: React.FC<StageRailProps> = ({
  origin,
  width,
  rowHeight = 140,
  railWidth = 140,
  gap = 24,
  stages,
  tileBackground,
}) => {
  const frame = useFrame();
  const tileBg = tileBackground ?? frame.bg;
  const contentX = origin.x + railWidth + gap;
  const contentWidth = width - railWidth - gap;
  return (
    <>
      {stages.map((stage, i) => {
        const top = origin.y + i * rowHeight;
        return (
          <React.Fragment key={stage.id}>
            <div
              style={{
                position: "absolute",
                left: origin.x,
                top,
                width: railWidth,
                height: rowHeight - 12,
              }}
            >
              <RailTile
                debugId={`rail-${stage.id}`}
                label={stage.label}
                icon={stage.icon}
                color={stage.color}
                background={tileBg}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: contentX,
                top,
                width: contentWidth,
                height: rowHeight - 12,
              }}
            >
              {stage.content}
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

const RailTile: React.FC<{
  label: string;
  icon: React.ReactNode;
  color?: PaletteColor;
  background: string;
  debugId: string;
}> = ({ label, icon, color = "blue", background, debugId }) => {
  const p = useSwatch(color);
  const ink = useInk();
  return (
    <DebugOverlay id={debugId} kind="rail">
      <div
        style={{
          width: "100%",
          height: "100%",
          background,
          border: `2px solid ${p.border}`,
          borderRadius: 14,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          fontFamily: fonts.sans,
          color: ink.heading,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: p.bg,
            border: `1.5px solid ${p.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: p.text,
            fontSize: 20,
          }}
        >
          {icon}
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 0.2,
          }}
        >
          {label}
        </div>
      </div>
    </DebugOverlay>
  );
};
