import type { GlyphRender } from "./types";

export const RUNTIME_GLYPHS = {
  cloud: ({ accent, light, ink }) => (
    <g>
      <path
        d="M 22 64 C 12 64 6 57 6 48 C 6 39 12 33 21 32 C 23 20 32 13 43 15 C 52 16 58 23 59 31 C 68 32 74 39 74 48 C 74 57 67 64 57 64 Z"
        fill={light}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <circle
        cx={29}
        cy={47}
        r={5}
        fill={accent}
        stroke={ink}
        strokeWidth={2.5}
      />
      <circle
        cx={51}
        cy={47}
        r={5}
        fill={accent}
        stroke={ink}
        strokeWidth={2.5}
      />
      <line
        x1={34}
        y1={47}
        x2={46}
        y2={47}
        stroke={ink}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </g>
  ),

  container: ({ accent, light, ink }) => (
    <g>
      <path
        d="M 9 20 L 40 8 L 71 20 L 40 32 Z"
        fill={light}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M 9 20 V 60 L 40 72 V 32 Z"
        fill={accent}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M 71 20 V 60 L 40 72 V 32 Z"
        fill={light}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <line
        x1={20}
        y1={24}
        x2={20}
        y2={59}
        stroke={ink}
        strokeWidth={2.5}
        opacity={0.45}
      />
      <line
        x1={30}
        y1={28}
        x2={30}
        y2={63}
        stroke={ink}
        strokeWidth={2.5}
        opacity={0.45}
      />
      <line
        x1={50}
        y1={28}
        x2={50}
        y2={63}
        stroke={ink}
        strokeWidth={2.5}
        opacity={0.45}
      />
      <line
        x1={60}
        y1={24}
        x2={60}
        y2={59}
        stroke={ink}
        strokeWidth={2.5}
        opacity={0.45}
      />
    </g>
  ),

  cluster: ({ accent, light, ink, paper }) => (
    <g>
      <line x1={40} y1={40} x2={22} y2={20} stroke={ink} strokeWidth={3} />
      <line x1={40} y1={40} x2={58} y2={20} stroke={ink} strokeWidth={3} />
      <line x1={40} y1={40} x2={22} y2={61} stroke={ink} strokeWidth={3} />
      <line x1={40} y1={40} x2={58} y2={61} stroke={ink} strokeWidth={3} />
      {[
        [22, 20],
        [58, 20],
        [22, 61],
        [58, 61],
      ].map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x - 9}
          y={y - 7}
          width={18}
          height={14}
          rx={4}
          fill={paper}
          stroke={ink}
          strokeWidth={3}
        />
      ))}
      <circle
        cx={40}
        cy={40}
        r={10}
        fill={accent}
        stroke={ink}
        strokeWidth={3.5}
      />
      <circle cx={40} cy={40} r={3} fill={light} stroke={ink} strokeWidth={2} />
    </g>
  ),

  function: ({ accent, light, ink }) => (
    <g>
      <path
        d="M 40 7 L 68 23 V 57 L 40 73 L 12 57 V 23 Z"
        fill={light}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M 31 25 C 25 25 25 31 25 35 V 38 C 25 41 22 42 19 42 C 22 42 25 44 25 47 V 51 C 25 55 27 57 31 57"
        fill="none"
        stroke={accent}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M 49 25 C 55 25 55 31 55 35 V 38 C 55 41 58 42 61 42 C 58 42 55 44 55 47 V 51 C 55 55 53 57 49 57"
        fill="none"
        stroke={accent}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M 35 35 H 47 M 40 35 L 36 52 M 32 43 H 44"
        fill="none"
        stroke={ink}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </g>
  ),

  worker: ({ accent, light, ink, paper }) => (
    <g>
      <rect
        x={10}
        y={15}
        width={44}
        height={50}
        rx={7}
        fill={light}
        stroke={ink}
        strokeWidth={4}
      />
      {[25, 39, 53].map((y, index) => (
        <g key={y}>
          <rect
            x={17}
            y={y - 5}
            width={30}
            height={10}
            rx={3}
            fill={paper}
            stroke={ink}
            strokeWidth={2.5}
          />
          <circle cx={22} cy={y} r={2} fill={index === 1 ? accent : ink} />
          <line
            x1={28}
            y1={y}
            x2={40}
            y2={y}
            stroke={ink}
            strokeWidth={2}
            opacity={0.45}
            strokeLinecap="round"
          />
        </g>
      ))}
      <circle
        cx={59}
        cy={52}
        r={14}
        fill={accent}
        stroke={ink}
        strokeWidth={3.5}
      />
      <path
        d="M 59 43 V 52 L 66 56"
        fill="none"
        stroke={paper}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 55 33 H 63"
        stroke={ink}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </g>
  ),
} satisfies Record<string, GlyphRender>;

export type RuntimeGlyphName = keyof typeof RUNTIME_GLYPHS;
