import React from "react";
import {
  Canvas,
  At,
  Title,
  Annotation,
  Label,
  Hexagon,
  Venn,
  DotRating,
} from "@allen-saji/diagram-kit";

export type ShapesAndRatingsProbeProps = {
  debug?: boolean;
};

/**
 * Probe for `Hexagon`, `Venn`, and `DotRating`. Three small
 * primitives that don't compose with each other; one probe with
 * three sections is enough to verify all of them render under the
 * theme system without collisions.
 *
 * The Venn intersection labels are placed by hand at canvas-derived
 * coordinates inside the SVG; auto-placement is intentionally
 * deferred to the caller (see `Venn` docstring).
 */
export const ShapesAndRatingsProbe: React.FC<ShapesAndRatingsProbeProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={780} debug={debug} theme="light">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="mint" rightSlot="diagram-kit · shapes + ratings">
            Hexagons, Venns, Ratings
          </Title>
        </div>
      </At>

      {/* Hexagons row */}
      <At x={60} y={170}>
        <Label debugId="hex-row-label" size={15}>
          Hexagon — flat-top + pointy-top, with label
        </Label>
      </At>
      <At x={60} y={210}>
        <Annotation tone="gray" debugId="hex-row-note">
          Flat-top is BBG canon for radial mind-map hubs. Both orientations stretch the hex into the same `size` bounding axis.
        </Annotation>
      </At>
      <At x={60} y={280}>
        <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
          <Hexagon debugId="hex-flat-bare" color="blue" size={100} />
          <Hexagon
            debugId="hex-flat-labeled"
            color="purple"
            size={120}
            label="Service A"
          />
          <Hexagon
            debugId="hex-pointy-bare"
            color="peach"
            size={100}
            orientation="pointy"
          />
          <Hexagon
            debugId="hex-pointy-labeled"
            color="mint"
            size={120}
            orientation="pointy"
            label="Service B"
          />
        </div>
      </At>

      {/* Venn */}
      <At x={580} y={400}>
        <Label debugId="venn-label" size={15}>
          Venn — three-set with intersection labels
        </Label>
      </At>
      <At x={580} y={440}>
        <Venn
          debugId="venn-3"
          width={460}
          height={300}
          circles={[
            { id: "front", label: "Frontend", color: "mint", cx: 160, cy: 130, r: 100 },
            { id: "back", label: "Backend", color: "blue", cx: 300, cy: 130, r: 100 },
            { id: "ops", label: "DevOps", color: "peach", cx: 230, cy: 230, r: 100 },
          ]}
          intersectionLabels={[
            { x: 230, y: 130, label: "Fullstack" },
            { x: 195, y: 195, label: "Tooling" },
            { x: 265, y: 195, label: "SRE" },
            { x: 230, y: 175, label: "Generalist" },
          ]}
        />
      </At>

      {/* DotRating */}
      <At x={60} y={440}>
        <Label debugId="dot-label" size={15}>
          DotRating — N-of-M
        </Label>
      </At>
      <At x={60} y={480}>
        <Annotation tone="gray" debugId="dot-note">
          Compact rough-strength widget. Pair with ComparisonTable cells.
        </Annotation>
      </At>
      <At x={60} y={540}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <DotRating
            debugId="dot-latency"
            value={4}
            max={5}
            color="mint"
            label="Latency"
            labelPosition="left"
          />
          <DotRating
            debugId="dot-cost"
            value={2}
            max={5}
            color="peach"
            label="Cost"
            labelPosition="left"
          />
          <DotRating
            debugId="dot-fresh"
            value={5}
            max={5}
            color="blue"
            label="Freshness"
            labelPosition="left"
          />
          <DotRating
            debugId="dot-ops"
            value={3}
            max={5}
            color="purple"
            label="Operability"
            labelPosition="left"
          />
        </div>
      </At>
    </Canvas>
  );
};
