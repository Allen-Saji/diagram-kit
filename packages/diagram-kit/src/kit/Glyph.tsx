import React from "react";
import { useSwatch, useInk, useFrame, useTheme } from "./theme";
import { fonts } from "./fonts";
import { PaletteColor } from "./palette";
import { DebugOverlay } from "./Debug";

/**
 * Lineal-color topic glyphs — the BBG-style icon illustrations.
 *
 * Every glyph is a parametric SVG drawn on a fixed 80x80 viewBox in a
 * locked house style:
 *
 * - outline ink: fixed near-black (`#242A35` in light themes), 4px
 *   outer strokes, 3px inner details, 2.5px fine lines at ~0.45
 *   opacity, rounded joins and caps
 * - `accent` fill: the palette swatch's `border` color
 * - `light` fill: the swatch's `bg` color
 * - `paper` fill: white areas (bubbles, documents)
 *
 * Because fills come from the active swatch, the same artwork recolors
 * per semantic section — the per-column tint trick in BBG posters.
 *
 * Adding a glyph: draw it as a `GlyphRender` in `GLYPHS` following the
 * style spec above. Names are nouns/actors (user, server, wallet) —
 * verbs and flows stay arrows with labels.
 */

export type GlyphName =
  | "user"
  | "user-query"
  | "agent"
  | "llm"
  | "embedding"
  | "vector-db"
  | "knowledge-graph"
  | "doc"
  | "retrieval"
  | "filter"
  | "api"
  | "chat"
  | "report"
  | "server"
  | "lock"
  | "shield"
  | "coin"
  | "gauge"
  | "clock"
  | "wallet"
  | "chain";

type GlyphColors = {
  /** Strong fill — swatch border color. */
  accent: string;
  /** Soft fill — swatch bg color (theme surface in dark mode). */
  light: string;
  /** Outline ink. */
  ink: string;
  /** White-ish areas: bubbles, pages. */
  paper: string;
};

type GlyphRender = (c: GlyphColors) => React.ReactElement;

const deg2rad = (d: number) => (d * Math.PI) / 180;

const GLYPHS: Record<GlyphName, GlyphRender> = {
  user: ({ accent, ink }) => (
    <g>
      <path
        d="M 18 68 C 18 50 28 42 40 42 C 52 42 62 50 62 68 Z"
        fill={accent}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <circle cx={40} cy={26} r={13} fill={accent} stroke={ink} strokeWidth={4} />
    </g>
  ),

  "user-query": ({ accent, ink, paper }) => (
    <g>
      <path
        d="M 14 68 C 14 52 22 45 30 45 C 38 45 46 52 46 68 Z"
        fill={accent}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <circle cx={30} cy={30} r={12} fill={accent} stroke={ink} strokeWidth={4} />
      <path
        d="M 48 10 h 22 a 6 6 0 0 1 6 6 v 12 a 6 6 0 0 1 -6 6 h -10 l -7 8 v -8 h -5 a 6 6 0 0 1 -6 -6 v -12 a 6 6 0 0 1 6 -6 Z"
        fill={paper}
        stroke={ink}
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      <path
        d="M 55 19 C 54.5 15 58 12.5 61.5 13.5 C 65 14.5 66 19 63 21.5 C 61 23 59.5 24 59.5 26.5"
        fill="none"
        stroke={ink}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <circle cx={59.5} cy={31} r={2.2} fill={ink} />
    </g>
  ),

  agent: ({ accent, light, ink }) => (
    <g>
      <line x1={40} y1={8} x2={40} y2={16} stroke={ink} strokeWidth={4} strokeLinecap="round" />
      <circle cx={40} cy={7} r={4} fill={accent} stroke={ink} strokeWidth={3} />
      <rect x={6} y={30} width={8} height={16} rx={3} fill={accent} stroke={ink} strokeWidth={3} />
      <rect x={66} y={30} width={8} height={16} rx={3} fill={accent} stroke={ink} strokeWidth={3} />
      <rect x={14} y={16} width={52} height={44} rx={10} fill={light} stroke={ink} strokeWidth={4} />
      <circle cx={30} cy={34} r={6} fill={accent} stroke={ink} strokeWidth={3} />
      <circle cx={50} cy={34} r={6} fill={accent} stroke={ink} strokeWidth={3} />
      <rect x={30} y={46} width={20} height={5} rx={2.5} fill={ink} />
    </g>
  ),

  llm: ({ accent, light, ink }) => (
    <g>
      <path
        d="M 42 12 C 34 4 20 6 16 16 C 6 18 4 30 10 36 C 4 42 6 54 14 58 C 15 66 26 71 33 66 C 37 70 42 69 42 64 Z"
        fill={accent}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M 28 22 C 24 26 26 32 30 33"
        fill="none"
        stroke={ink}
        strokeWidth={2.5}
        opacity={0.45}
        strokeLinecap="round"
      />
      <path
        d="M 22 40 C 28 42 30 48 26 53"
        fill="none"
        stroke={ink}
        strokeWidth={2.5}
        opacity={0.45}
        strokeLinecap="round"
      />
      <line x1={42} y1={22} x2={56} y2={22} stroke={ink} strokeWidth={3.5} />
      <line x1={42} y1={40} x2={60} y2={40} stroke={ink} strokeWidth={3.5} />
      <line x1={42} y1={58} x2={56} y2={58} stroke={ink} strokeWidth={3.5} />
      <circle cx={62} cy={22} r={4.5} fill={light} stroke={ink} strokeWidth={3} />
      <circle cx={66} cy={40} r={4.5} fill={light} stroke={ink} strokeWidth={3} />
      <circle cx={62} cy={58} r={4.5} fill={light} stroke={ink} strokeWidth={3} />
    </g>
  ),

  embedding: ({ accent, light, ink }) => (
    <g>
      {/* chip pins */}
      <line x1={30} y1={8} x2={30} y2={16} stroke={ink} strokeWidth={3} strokeLinecap="round" />
      <line x1={50} y1={8} x2={50} y2={16} stroke={ink} strokeWidth={3} strokeLinecap="round" />
      <line x1={30} y1={64} x2={30} y2={72} stroke={ink} strokeWidth={3} strokeLinecap="round" />
      <line x1={50} y1={64} x2={50} y2={72} stroke={ink} strokeWidth={3} strokeLinecap="round" />
      <line x1={8} y1={30} x2={16} y2={30} stroke={ink} strokeWidth={3} strokeLinecap="round" />
      <line x1={8} y1={50} x2={16} y2={50} stroke={ink} strokeWidth={3} strokeLinecap="round" />
      <line x1={64} y1={30} x2={72} y2={30} stroke={ink} strokeWidth={3} strokeLinecap="round" />
      <line x1={64} y1={50} x2={72} y2={50} stroke={ink} strokeWidth={3} strokeLinecap="round" />
      {/* chip body */}
      <rect x={16} y={16} width={48} height={48} rx={8} fill={light} stroke={ink} strokeWidth={4} />
      {/* inner vector graph */}
      <line x1={30} y1={32} x2={50} y2={30} stroke={ink} strokeWidth={2.5} />
      <line x1={30} y1={32} x2={40} y2={48} stroke={ink} strokeWidth={2.5} />
      <line x1={50} y1={30} x2={40} y2={48} stroke={ink} strokeWidth={2.5} />
      <circle cx={30} cy={32} r={4} fill={accent} stroke={ink} strokeWidth={2.5} />
      <circle cx={50} cy={30} r={4} fill={accent} stroke={ink} strokeWidth={2.5} />
      <circle cx={40} cy={48} r={4.5} fill={accent} stroke={ink} strokeWidth={2.5} />
    </g>
  ),

  "vector-db": ({ accent, light, ink }) => (
    <g>
      <path d="M 18 20 L 18 58 A 22 10 0 0 0 62 58 L 62 20" fill={accent} stroke={ink} strokeWidth={4} />
      <ellipse cx={40} cy={20} rx={22} ry={10} fill={light} stroke={ink} strokeWidth={4} />
      <path d="M 18 33 A 22 10 0 0 0 62 33" fill="none" stroke={ink} strokeWidth={2.5} opacity={0.45} />
      <path d="M 18 46 A 22 10 0 0 0 62 46" fill="none" stroke={ink} strokeWidth={2.5} opacity={0.45} />
      <circle cx={30} cy={53} r={2} fill={light} opacity={0.9} />
      <circle cx={40} cy={56} r={2} fill={light} opacity={0.9} />
      <circle cx={50} cy={53} r={2} fill={light} opacity={0.9} />
    </g>
  ),

  "knowledge-graph": ({ accent, light, ink }) => (
    <g>
      <line x1={40} y1={40} x2={17} y2={20} stroke={ink} strokeWidth={3} />
      <line x1={40} y1={40} x2={63} y2={20} stroke={ink} strokeWidth={3} />
      <line x1={40} y1={40} x2={15} y2={58} stroke={ink} strokeWidth={3} />
      <line x1={40} y1={40} x2={65} y2={58} stroke={ink} strokeWidth={3} />
      <line x1={17} y1={20} x2={63} y2={20} stroke={ink} strokeWidth={2.5} opacity={0.45} />
      <circle cx={17} cy={20} r={6} fill={light} stroke={ink} strokeWidth={3} />
      <circle cx={63} cy={20} r={6} fill={light} stroke={ink} strokeWidth={3} />
      <circle cx={15} cy={58} r={6} fill={light} stroke={ink} strokeWidth={3} />
      <circle cx={65} cy={58} r={6} fill={light} stroke={ink} strokeWidth={3} />
      <circle cx={40} cy={40} r={8} fill={accent} stroke={ink} strokeWidth={3.5} />
    </g>
  ),

  doc: ({ accent, ink, paper }) => (
    <g>
      <path
        d="M 16 6 L 48 6 L 60 18 L 60 74 L 16 74 Z"
        fill={paper}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path d="M 48 6 L 48 18 L 60 18 Z" fill={accent} stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <line x1={24} y1={34} x2={52} y2={34} stroke={ink} strokeWidth={2.5} opacity={0.4} />
      <line x1={24} y1={44} x2={52} y2={44} stroke={ink} strokeWidth={2.5} opacity={0.4} />
      <line x1={24} y1={54} x2={44} y2={54} stroke={ink} strokeWidth={2.5} opacity={0.4} />
      <rect x={24} y={61} width={16} height={5} rx={2.5} fill={accent} />
    </g>
  ),

  retrieval: ({ light, ink, paper }) => (
    <g>
      <path
        d="M 12 8 L 44 8 L 54 18 L 54 64 L 12 64 Z"
        fill={paper}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path d="M 44 8 L 44 18 L 54 18" fill="none" stroke={ink} strokeWidth={3} />
      <line x1={20} y1={30} x2={46} y2={30} stroke={ink} strokeWidth={2.5} opacity={0.4} />
      <line x1={20} y1={40} x2={46} y2={40} stroke={ink} strokeWidth={2.5} opacity={0.4} />
      <line x1={20} y1={50} x2={40} y2={50} stroke={ink} strokeWidth={2.5} opacity={0.4} />
      <circle cx={52} cy={46} r={15} fill={light} fillOpacity={0.85} stroke={ink} strokeWidth={4.5} />
      <line x1={63} y1={57} x2={73} y2={67} stroke={ink} strokeWidth={6} strokeLinecap="round" />
    </g>
  ),

  filter: ({ accent, light, ink }) => (
    <g>
      <path
        d="M 12 12 L 68 12 L 47 40 L 47 60 L 33 68 L 33 40 Z"
        fill={accent}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <line x1={19} y1={17} x2={61} y2={17} stroke={light} strokeWidth={2.5} opacity={0.8} />
      <circle cx={40} cy={75} r={3} fill={accent} stroke={ink} strokeWidth={2.5} />
    </g>
  ),

  api: ({ accent, light, ink }) => (
    <g>
      {/* gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const x1 = 40 + Math.cos(deg2rad(a)) * 16;
        const y1 = 40 + Math.sin(deg2rad(a)) * 16;
        const x2 = 40 + Math.cos(deg2rad(a)) * 25;
        const y2 = 40 + Math.sin(deg2rad(a)) * 25;
        return (
          <line
            key={a}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={ink}
            strokeWidth={6}
            strokeLinecap="round"
          />
        );
      })}
      <circle cx={40} cy={40} r={18} fill={light} stroke={ink} strokeWidth={4} />
      {/* code brackets */}
      <path d="M 34 33 L 27 40 L 34 47" fill="none" stroke={accent} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 46 33 L 53 40 L 46 47" fill="none" stroke={accent} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),

  chat: ({ accent, light, ink, paper }) => (
    <g>
      <rect x={12} y={14} width={40} height={26} rx={10} fill={light} stroke={ink} strokeWidth={3.5} />
      <path d="M 40 62 L 36 73 L 52 62 Z" fill={accent} stroke={ink} strokeWidth={3} strokeLinejoin="round" />
      <rect x={28} y={34} width={40} height={28} rx={10} fill={accent} stroke={ink} strokeWidth={4} />
      <circle cx={40} cy={48} r={2.8} fill={paper} />
      <circle cx={48} cy={48} r={2.8} fill={paper} />
      <circle cx={56} cy={48} r={2.8} fill={paper} />
    </g>
  ),

  report: ({ accent, ink, paper }) => (
    <g>
      <rect x={16} y={8} width={48} height={64} rx={6} fill={paper} stroke={ink} strokeWidth={4} />
      <line x1={24} y1={18} x2={56} y2={18} stroke={ink} strokeWidth={2.5} opacity={0.4} />
      <line x1={24} y1={25} x2={48} y2={25} stroke={ink} strokeWidth={2.5} opacity={0.4} />
      <rect x={25} y={48} width={8} height={14} fill={accent} stroke={ink} strokeWidth={2.5} />
      <rect x={37} y={40} width={8} height={22} fill={accent} stroke={ink} strokeWidth={2.5} />
      <rect x={49} y={32} width={8} height={30} fill={accent} stroke={ink} strokeWidth={2.5} />
      <line x1={22} y1={64} x2={58} y2={64} stroke={ink} strokeWidth={3} strokeLinecap="round" />
    </g>
  ),

  server: ({ accent, light, ink, paper }) => (
    <g>
      <rect x={14} y={10} width={52} height={60} rx={8} fill={light} stroke={ink} strokeWidth={4} />
      {[17, 34, 51].map((y) => (
        <g key={y}>
          <rect x={20} y={y} width={40} height={13} rx={3} fill={paper} stroke={ink} strokeWidth={3} />
          <line
            x1={26}
            y1={y + 6.5}
            x2={38}
            y2={y + 6.5}
            stroke={ink}
            strokeWidth={2.5}
            opacity={0.45}
            strokeLinecap="round"
          />
          <circle cx={54} cy={y + 6.5} r={2.5} fill={accent} />
        </g>
      ))}
    </g>
  ),

  lock: ({ accent, ink, paper }) => (
    <g>
      <path
        d="M 28 34 L 28 24 C 28 15 34 10 40 10 C 46 10 52 15 52 24 L 52 34"
        fill="none"
        stroke={ink}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <rect x={20} y={34} width={40} height={34} rx={8} fill={accent} stroke={ink} strokeWidth={4} />
      <circle cx={40} cy={48} r={4.5} fill={paper} />
      <rect x={37.8} y={50} width={4.4} height={9} rx={2.2} fill={paper} />
    </g>
  ),

  shield: ({ accent, ink, paper }) => (
    <g>
      <path
        d="M 40 8 L 66 18 L 66 38 C 66 56 54 66 40 72 C 26 66 14 56 14 38 L 14 18 Z"
        fill={accent}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M 30 40 L 37 48 L 52 30"
        fill="none"
        stroke={paper}
        strokeWidth={5.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  ),

  coin: ({ accent, light, ink }) => (
    <g>
      <circle cx={40} cy={40} r={28} fill={accent} stroke={ink} strokeWidth={4} />
      <circle cx={40} cy={40} r={20} fill={light} stroke={ink} strokeWidth={3} />
      <line x1={40} y1={25} x2={40} y2={55} stroke={ink} strokeWidth={3.5} strokeLinecap="round" />
      <path
        d="M 47 31 C 45 27 34 26 33 33 C 32 40 48 39 47 47 C 46 54 34 53 32 49"
        fill="none"
        stroke={ink}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    </g>
  ),

  gauge: ({ accent, light, ink }) => (
    <g>
      <path d="M 12 56 A 28 28 0 0 1 68 56 Z" fill={light} stroke={ink} strokeWidth={4} strokeLinejoin="round" />
      {[135, 90, 45].map((a) => {
        const x1 = 40 + Math.cos(deg2rad(-a)) * 21;
        const y1 = 56 + Math.sin(deg2rad(-a)) * 21;
        const x2 = 40 + Math.cos(deg2rad(-a)) * 26;
        const y2 = 56 + Math.sin(deg2rad(-a)) * 26;
        return (
          <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink} strokeWidth={2.5} opacity={0.5} />
        );
      })}
      <line x1={40} y1={56} x2={55} y2={35} stroke={accent} strokeWidth={5} strokeLinecap="round" />
      <circle cx={40} cy={56} r={5} fill={accent} stroke={ink} strokeWidth={3} />
    </g>
  ),

  clock: ({ accent, light, ink }) => (
    <g>
      <circle cx={40} cy={40} r={28} fill={light} stroke={ink} strokeWidth={4} />
      <circle cx={40} cy={16} r={2} fill={accent} />
      <circle cx={64} cy={40} r={2} fill={accent} />
      <circle cx={40} cy={64} r={2} fill={accent} />
      <circle cx={16} cy={40} r={2} fill={accent} />
      <line x1={40} y1={40} x2={40} y2={23} stroke={ink} strokeWidth={4.5} strokeLinecap="round" />
      <line x1={40} y1={40} x2={53} y2={46} stroke={ink} strokeWidth={4.5} strokeLinecap="round" />
      <circle cx={40} cy={40} r={3.5} fill={ink} />
    </g>
  ),

  wallet: ({ accent, light, ink }) => (
    <g>
      <rect x={16} y={14} width={40} height={14} rx={3} fill={light} stroke={ink} strokeWidth={3} />
      <rect x={10} y={22} width={60} height={44} rx={8} fill={accent} stroke={ink} strokeWidth={4} />
      <rect x={48} y={36} width={22} height={16} rx={6} fill={light} stroke={ink} strokeWidth={3} />
      <circle cx={59} cy={44} r={3} fill={accent} stroke={ink} strokeWidth={2.5} />
    </g>
  ),

  chain: ({ accent, ink }) => (
    <g>
      <g transform="rotate(-25 30 33)">
        <rect x={15} y={24} width={30} height={18} rx={9} fill="none" stroke={ink} strokeWidth={9} />
        <rect x={15} y={24} width={30} height={18} rx={9} fill="none" stroke={accent} strokeWidth={5} />
      </g>
      <g transform="rotate(-25 50 47)">
        <rect x={35} y={38} width={30} height={18} rx={9} fill="none" stroke={ink} strokeWidth={9} />
        <rect x={35} y={38} width={30} height={18} rx={9} fill="none" stroke={accent} strokeWidth={5} />
      </g>
    </g>
  ),
};

export const GLYPH_NAMES = Object.keys(GLYPHS) as GlyphName[];

type GlyphProps = {
  name: GlyphName;
  /** Palette color the artwork tints to. Default `gray`. */
  color?: PaletteColor;
  /** Rendered square size in px. Default 64. */
  size?: number;
  /** Optional caption below the artwork. */
  label?: string;
  /** Caption font size. Default 14. */
  labelSize?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * A lineal-color topic glyph. `name` picks the artwork, `color` tints
 * it via the active palette. Hero-size (56-96) inside step/feature
 * cards, small (20-32) inline next to labels.
 */
export const Glyph: React.FC<GlyphProps> = ({
  name,
  color = "gray",
  size = 64,
  label,
  labelSize = 14,
  style,
  debugId,
}) => {
  const { theme } = useTheme();
  const p = useSwatch(color);
  const f = useFrame();
  const inkTokens = useInk();
  const isDark = theme === "dark";
  const colors: GlyphColors = {
    accent: p.border,
    light: isDark ? f.surface : p.bg,
    ink: isDark ? inkTokens.body : "#242A35",
    paper: isDark ? f.surface : "#FFFFFF",
  };
  return (
    <DebugOverlay id={debugId} kind={`glyph:${name}`}>
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
        <svg width={size} height={size} viewBox="0 0 80 80" aria-hidden="true" focusable="false">
          {GLYPHS[name](colors)}
        </svg>
        {label ? (
          <span
            style={{
              fontSize: labelSize,
              fontWeight: 600,
              color: inkTokens.body,
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
