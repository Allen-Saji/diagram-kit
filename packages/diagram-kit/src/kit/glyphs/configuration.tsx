import type { GlyphRender } from "./types";

export const CONFIGURATION_GLYPHS = {
  config: ({ accent, light, ink }) => (
    <g>
      {[20, 40, 60].map((y, index) => {
        const knobX = [29, 52, 36][index];
        return (
          <g key={y}>
            <line
              x1={10}
              y1={y}
              x2={70}
              y2={y}
              stroke={ink}
              strokeWidth={4}
              strokeLinecap="round"
            />
            <circle
              cx={knobX}
              cy={y}
              r={8}
              fill={index === 1 ? light : accent}
              stroke={ink}
              strokeWidth={3.5}
            />
          </g>
        );
      })}
    </g>
  ),

  secret: ({ accent, light, ink, paper }) => (
    <g>
      <path
        d="M 14 8 H 50 L 64 22 V 72 H 14 Z"
        fill={paper}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M 50 8 V 22 H 64"
        fill={light}
        stroke={ink}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <rect
        x={24}
        y={34}
        width={30}
        height={26}
        rx={7}
        fill={accent}
        stroke={ink}
        strokeWidth={3.5}
      />
      <path
        d="M 31 34 V 29 C 31 20 47 20 47 29 V 34"
        fill="none"
        stroke={ink}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <circle cx={39} cy={45} r={4} fill={paper} />
      <rect x={37} y={48} width={4} height={7} rx={2} fill={paper} />
    </g>
  ),

  identity: ({ accent, light, ink, paper }) => (
    <g>
      <rect
        x={8}
        y={15}
        width={64}
        height={50}
        rx={8}
        fill={light}
        stroke={ink}
        strokeWidth={4}
      />
      <rect
        x={30}
        y={8}
        width={20}
        height={12}
        rx={5}
        fill={paper}
        stroke={ink}
        strokeWidth={3}
      />
      <circle
        cx={27}
        cy={34}
        r={9}
        fill={accent}
        stroke={ink}
        strokeWidth={3}
      />
      <path
        d="M 14 57 C 14 46 20 42 27 42 C 34 42 40 46 40 57"
        fill={accent}
        stroke={ink}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <line
        x1={48}
        y1={32}
        x2={64}
        y2={32}
        stroke={ink}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <line
        x1={48}
        y1={42}
        x2={64}
        y2={42}
        stroke={ink}
        strokeWidth={3}
        opacity={0.45}
        strokeLinecap="round"
      />
      <line
        x1={48}
        y1={52}
        x2={59}
        y2={52}
        stroke={ink}
        strokeWidth={3}
        opacity={0.45}
        strokeLinecap="round"
      />
    </g>
  ),
} satisfies Record<string, GlyphRender>;

export type ConfigurationGlyphName = keyof typeof CONFIGURATION_GLYPHS;
