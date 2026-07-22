import type { GlyphRender } from "./types";

export const DATA_GLYPHS = {
  database: ({ accent, light, ink }) => (
    <g>
      <path
        d="M 14 19 V 61 C 14 69 26 75 40 75 C 54 75 66 69 66 61 V 19"
        fill={accent}
        stroke={ink}
        strokeWidth={4}
      />
      <ellipse
        cx={40}
        cy={19}
        rx={26}
        ry={11}
        fill={light}
        stroke={ink}
        strokeWidth={4}
      />
      <path
        d="M 14 33 C 14 41 26 47 40 47 C 54 47 66 41 66 33"
        fill="none"
        stroke={ink}
        strokeWidth={2.5}
        opacity={0.45}
      />
      <path
        d="M 14 48 C 14 56 26 62 40 62 C 54 62 66 56 66 48"
        fill="none"
        stroke={ink}
        strokeWidth={2.5}
        opacity={0.45}
      />
    </g>
  ),

  storage: ({ accent, light, ink, paper }) => (
    <g>
      <rect
        x={9}
        y={18}
        width={62}
        height={45}
        rx={8}
        fill={light}
        stroke={ink}
        strokeWidth={4}
      />
      <circle
        cx={31}
        cy={40}
        r={13}
        fill={paper}
        stroke={ink}
        strokeWidth={3}
      />
      <circle
        cx={31}
        cy={40}
        r={4}
        fill={accent}
        stroke={ink}
        strokeWidth={2.5}
      />
      <path
        d="M 31 27 A 13 13 0 0 1 44 40"
        fill="none"
        stroke={accent}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <line
        x1={50}
        y1={31}
        x2={63}
        y2={31}
        stroke={ink}
        strokeWidth={3}
        opacity={0.45}
        strokeLinecap="round"
      />
      <line
        x1={50}
        y1={40}
        x2={63}
        y2={40}
        stroke={ink}
        strokeWidth={3}
        opacity={0.45}
        strokeLinecap="round"
      />
      <circle
        cx={57}
        cy={52}
        r={4}
        fill={accent}
        stroke={ink}
        strokeWidth={2.5}
      />
      <path
        d="M 18 69 H 62"
        stroke={ink}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </g>
  ),

  "object-storage": ({ accent, light, ink, paper }) => (
    <g>
      <path
        d="M 13 20 H 67 L 61 68 H 19 Z"
        fill={light}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M 9 20 H 71"
        stroke={ink}
        strokeWidth={5}
        strokeLinecap="round"
      />
      <path
        d="M 22 12 H 58"
        stroke={ink}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <rect
        x={23}
        y={31}
        width={15}
        height={15}
        rx={3}
        fill={accent}
        stroke={ink}
        strokeWidth={2.5}
      />
      <circle
        cx={50}
        cy={39}
        r={8}
        fill={paper}
        stroke={ink}
        strokeWidth={2.5}
      />
      <path
        d="M 26 57 H 54"
        stroke={ink}
        strokeWidth={3}
        opacity={0.45}
        strokeLinecap="round"
      />
    </g>
  ),

  cache: ({ accent, light, ink, paper }) => (
    <g>
      <path
        d="M 12 23 V 58 C 12 66 23 71 38 71 C 53 71 64 66 64 58 V 23"
        fill={light}
        stroke={ink}
        strokeWidth={4}
      />
      <ellipse
        cx={38}
        cy={23}
        rx={26}
        ry={11}
        fill={paper}
        stroke={ink}
        strokeWidth={4}
      />
      <path
        d="M 12 39 C 12 47 23 52 38 52 C 53 52 64 47 64 39"
        fill="none"
        stroke={ink}
        strokeWidth={2.5}
        opacity={0.45}
      />
      <path
        d="M 48 7 L 36 34 H 46 L 39 53 L 64 26 H 52 L 60 7 Z"
        fill={accent}
        stroke={ink}
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </g>
  ),
} satisfies Record<string, GlyphRender>;

export type DataGlyphName = keyof typeof DATA_GLYPHS;
