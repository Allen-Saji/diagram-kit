import type { GlyphRender } from "./types";

export const OBSERVABILITY_GLYPHS = {
  logs: ({ accent, light, ink, paper }) => (
    <g>
      <rect
        x={12}
        y={8}
        width={56}
        height={64}
        rx={6}
        fill={paper}
        stroke={ink}
        strokeWidth={4}
      />
      {[22, 35, 48, 61].map((y, index) => (
        <g key={y}>
          <circle
            cx={22}
            cy={y}
            r={3}
            fill={index === 2 ? accent : light}
            stroke={ink}
            strokeWidth={2}
          />
          <line
            x1={31}
            y1={y}
            x2={index % 2 === 0 ? 59 : 52}
            y2={y}
            stroke={ink}
            strokeWidth={3}
            opacity={0.5}
            strokeLinecap="round"
          />
        </g>
      ))}
      <rect x={44} y={14} width={18} height={7} rx={3.5} fill={accent} />
    </g>
  ),

  metrics: ({ accent, light, ink, paper }) => (
    <g>
      <rect
        x={8}
        y={10}
        width={64}
        height={60}
        rx={7}
        fill={paper}
        stroke={ink}
        strokeWidth={4}
      />
      <path
        d="M 18 59 V 23 M 18 59 H 63"
        fill="none"
        stroke={ink}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d="M 22 51 L 32 42 L 41 47 L 52 29 L 62 35"
        fill="none"
        stroke={accent}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {[
        [22, 51],
        [32, 42],
        [41, 47],
        [52, 29],
        [62, 35],
      ].map(([x, y]) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={3}
          fill={light}
          stroke={ink}
          strokeWidth={2}
        />
      ))}
    </g>
  ),

  traces: ({ accent, light, ink, paper }) => (
    <g>
      <path
        d="M 15 15 V 65"
        stroke={ink}
        strokeWidth={3}
        opacity={0.45}
        strokeLinecap="round"
      />
      {[18, 34, 50, 66].map((x) => (
        <line
          key={x}
          x1={x}
          y1={13}
          x2={x}
          y2={68}
          stroke={ink}
          strokeWidth={2}
          opacity={0.18}
        />
      ))}
      <rect
        x={18}
        y={19}
        width={34}
        height={10}
        rx={5}
        fill={accent}
        stroke={ink}
        strokeWidth={2.5}
      />
      <rect
        x={29}
        y={35}
        width={38}
        height={10}
        rx={5}
        fill={light}
        stroke={ink}
        strokeWidth={2.5}
      />
      <rect
        x={41}
        y={51}
        width={22}
        height={10}
        rx={5}
        fill={paper}
        stroke={ink}
        strokeWidth={2.5}
      />
      <path
        d="M 22 29 V 40 H 29 M 34 45 V 56 H 41"
        fill="none"
        stroke={ink}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  ),

  alert: ({ accent, light, ink, paper }) => (
    <g>
      <path
        d="M 18 57 H 62 C 57 51 56 44 56 34 C 56 23 50 16 40 16 C 30 16 24 23 24 34 C 24 44 23 51 18 57 Z"
        fill={accent}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M 34 63 C 35 70 45 70 46 63"
        fill={light}
        stroke={ink}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <circle cx={40} cy={8} r={4} fill={paper} stroke={ink} strokeWidth={3} />
      <path
        d="M 40 28 V 40"
        stroke={paper}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <circle cx={40} cy={47} r={2.5} fill={paper} />
      <path
        d="M 12 25 L 7 20 M 68 25 L 73 20"
        stroke={ink}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </g>
  ),
} satisfies Record<string, GlyphRender>;

export type ObservabilityGlyphName = keyof typeof OBSERVABILITY_GLYPHS;
