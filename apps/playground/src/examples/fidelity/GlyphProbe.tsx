import React from "react";
import {
  Canvas,
  At,
  Title,
  Label,
  Annotation,
  Glyph,
  GLYPH_NAMES,
  PaletteColor,
} from "@allen-saji/diagram-kit";

export type GlyphProbeProps = {
  debug?: boolean;
};

/**
 * Fidelity probe for the `Glyph` registry — every lineal-color glyph
 * in the kit, plus a tint row proving the per-palette recolor.
 *
 * Rows cycle through three palette colors so each glyph is seen tinted;
 * the bottom strip renders one glyph across all eight palette colors —
 * the per-column recolor trick BBG uses in its comparison posters.
 */

const ROW_COLORS: PaletteColor[] = ["blue", "peach", "mint"];
const TINT_COLORS: PaletteColor[] = [
  "mint",
  "peach",
  "blue",
  "yellow",
  "pink",
  "purple",
  "lavender",
  "gray",
];

const COLS = 7;
const X0 = 100;
const PITCH_X = 215;
const Y0 = 170;
const PITCH_Y = 220;

export const GlyphProbe: React.FC<GlyphProbeProps> = ({ debug = false }) => {
  return (
    <Canvas w={1600} h={1080} debug={debug} theme="light">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="blue" rightSlot="diagram-kit · glyphs">
            Glyph Registry — lineal-color topic icons
          </Title>
        </div>
      </At>

      {GLYPH_NAMES.map((name, i) => {
        const row = Math.floor(i / COLS);
        const col = i % COLS;
        return (
          <At key={name} x={X0 + col * PITCH_X} y={Y0 + row * PITCH_Y}>
            <div style={{ width: 96, display: "flex", justifyContent: "center" }}>
              <Glyph
                name={name}
                color={ROW_COLORS[row % ROW_COLORS.length]}
                size={80}
                label={name}
                debugId={`g-${name}`}
              />
            </div>
          </At>
        );
      })}

      <At x={100} y={848}>
        <Label debugId="tint-label" size={15}>
          One glyph, eight tints — fills follow the palette, ink stays fixed
        </Label>
      </At>
      {TINT_COLORS.map((c, i) => (
        <At key={c} x={100 + i * 180} y={892}>
          <Glyph name="llm" color={c} size={64} label={c} debugId={`tint-${c}`} />
        </At>
      ))}

      <At x={100} y={1024}>
        <Annotation tone="gray" debugId="note">
          House style: 80x80 viewBox, near-black ink outlines, accent + light fills from the active swatch.
          Nouns get glyphs; verbs stay arrows.
        </Annotation>
      </At>
    </Canvas>
  );
};
