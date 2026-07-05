import React from "react";
import {
  Canvas,
  At,
  Title,
  Label,
  Annotation,
  BrandIcon,
} from "@allen-saji/diagram-kit";
import {
  siGithub,
  siPostgresql,
  siAnthropic,
  siReact,
  siRust,
  siSolana,
  siEthereum,
  siGoogledrive,
} from "simple-icons";

export type BrandIconProbeProps = {
  debug?: boolean;
};

const BRANDS = [
  { icon: siAnthropic, label: "Anthropic" },
  { icon: siGithub, label: "GitHub" },
  { icon: siPostgresql, label: "Postgres" },
  { icon: siGoogledrive, label: "Drive" },
  { icon: siReact, label: "React" },
  { icon: siRust, label: "Rust" },
  { icon: siSolana, label: "Solana" },
  { icon: siEthereum, label: "Ethereum" },
];

/**
 * `BrandIcon` probe — real trademark logos from `simple-icons` (a
 * playground dependency; the kit only takes the `{path, hex}` shape).
 * Row 1: chip tiles with brand colors — the BBG logo-tile treatment.
 * Row 2: bare marks inked to the heading color for quiet contexts.
 */
export const BrandIconProbe: React.FC<BrandIconProbeProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={620} debug={debug} theme="light">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="lavender" rightSlot="diagram-kit · brand icons">
            BrandIcon — trademark logo tiles
          </Title>
        </div>
      </At>

      <At x={60} y={170}>
        <Label debugId="chip-label" size={15}>
          Chip tiles, official brand colors
        </Label>
      </At>
      <At x={60} y={220}>
        <div style={{ display: "flex", gap: 42 }}>
          {BRANDS.map((b) => (
            <BrandIcon
              key={b.label}
              debugId={`brand-${b.label}`}
              icon={b.icon}
              label={b.label}
              size={34}
            />
          ))}
        </div>
      </At>

      <At x={60} y={380}>
        <Label debugId="bare-label" size={15}>
          Bare marks, single-ink override
        </Label>
      </At>
      <At x={60} y={430}>
        <div style={{ display: "flex", gap: 52, alignItems: "center" }}>
          {BRANDS.map((b) => (
            <BrandIcon
              key={b.label}
              debugId={`bare-${b.label}`}
              icon={b.icon}
              chip={false}
              color="#242A35"
              size={36}
            />
          ))}
        </div>
      </At>

      <At x={60} y={548}>
        <Annotation tone="gray" debugId="note">
          Concepts get hand-drawn Glyphs; companies get BrandIcon. Never draw a trademark by hand.
        </Annotation>
      </At>
    </Canvas>
  );
};
