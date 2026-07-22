import type { GlyphRender } from "./types";

export const INTEGRATION_GLYPHS = {
  queue: ({ accent, light, ink, paper }) => (
    <g>
      {[14, 30, 46].map((y, index) => (
        <g key={y}>
          <rect
            x={15 + index * 3}
            y={y}
            width={46}
            height={14}
            rx={5}
            fill={index === 1 ? accent : paper}
            stroke={ink}
            strokeWidth={3}
          />
          <circle
            cx={24 + index * 3}
            cy={y + 7}
            r={2.5}
            fill={index === 1 ? paper : accent}
          />
          <line
            x1={32 + index * 3}
            y1={y + 7}
            x2={51 + index * 3}
            y2={y + 7}
            stroke={ink}
            strokeWidth={2.5}
            opacity={0.45}
            strokeLinecap="round"
          />
        </g>
      ))}
      <path
        d="M 8 9 V 67 H 66"
        fill="none"
        stroke={ink}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 59 61 L 67 67 L 59 73"
        fill={light}
        stroke={ink}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  ),

  topic: ({ accent, light, ink }) => (
    <g>
      <circle
        cx={27}
        cy={40}
        r={11}
        fill={accent}
        stroke={ink}
        strokeWidth={4}
      />
      <path
        d="M 39 31 C 48 36 48 44 39 49"
        fill="none"
        stroke={ink}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <path
        d="M 45 23 C 60 31 60 49 45 57"
        fill="none"
        stroke={ink}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <path
        d="M 51 15 C 73 27 73 53 51 65"
        fill="none"
        stroke={ink}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <circle cx={16} cy={18} r={6} fill={light} stroke={ink} strokeWidth={3} />
      <circle cx={16} cy={62} r={6} fill={light} stroke={ink} strokeWidth={3} />
      <line x1={21} y1={23} x2={25} y2={29} stroke={ink} strokeWidth={2.5} />
      <line x1={21} y1={57} x2={25} y2={51} stroke={ink} strokeWidth={2.5} />
    </g>
  ),

  "event-bus": ({ accent, light, ink, paper }) => (
    <g>
      <rect
        x={10}
        y={30}
        width={60}
        height={20}
        rx={8}
        fill={accent}
        stroke={ink}
        strokeWidth={4}
      />
      {[18, 32, 48, 62].map((x, index) => (
        <g key={x}>
          <line
            x1={x}
            y1={index % 2 === 0 ? 18 : 50}
            x2={x}
            y2={index % 2 === 0 ? 30 : 62}
            stroke={ink}
            strokeWidth={3}
          />
          <circle
            cx={x}
            cy={index % 2 === 0 ? 13 : 67}
            r={6}
            fill={index % 2 === 0 ? light : paper}
            stroke={ink}
            strokeWidth={3}
          />
        </g>
      ))}
      <path
        d="M 20 40 H 58"
        stroke={paper}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <path
        d="M 53 35 L 60 40 L 53 45"
        fill="none"
        stroke={paper}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  ),

  webhook: ({ accent, light, ink }) => (
    <g>
      <circle
        cx={20}
        cy={18}
        r={8}
        fill={light}
        stroke={ink}
        strokeWidth={3.5}
      />
      <circle
        cx={60}
        cy={18}
        r={8}
        fill={light}
        stroke={ink}
        strokeWidth={3.5}
      />
      <circle
        cx={40}
        cy={61}
        r={9}
        fill={accent}
        stroke={ink}
        strokeWidth={3.5}
      />
      <path
        d="M 27 21 C 35 24 40 30 40 39 V 48"
        fill="none"
        stroke={ink}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M 53 21 C 45 24 40 30 40 39"
        fill="none"
        stroke={ink}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M 40 48 C 29 43 23 48 24 57 C 25 66 34 73 45 70"
        fill="none"
        stroke={ink}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M 43 44 L 40 50 L 34 47"
        fill="none"
        stroke={accent}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  ),
} satisfies Record<string, GlyphRender>;

export type IntegrationGlyphName = keyof typeof INTEGRATION_GLYPHS;
