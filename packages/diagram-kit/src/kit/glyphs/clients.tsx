import type { GlyphRender } from "./types";

export const CLIENT_GLYPHS = {
  browser: ({ accent, light, ink, paper }) => (
    <g>
      <rect
        x={8}
        y={12}
        width={64}
        height={56}
        rx={7}
        fill={light}
        stroke={ink}
        strokeWidth={4}
      />
      <path d="M 8 27 H 72" fill="none" stroke={ink} strokeWidth={3} />
      <circle cx={17} cy={20} r={2.5} fill={accent} />
      <circle cx={25} cy={20} r={2.5} fill={accent} />
      <circle cx={33} cy={20} r={2.5} fill={accent} />
      <rect
        x={16}
        y={35}
        width={48}
        height={24}
        rx={4}
        fill={paper}
        stroke={ink}
        strokeWidth={2.5}
      />
      <path
        d="M 30 41 L 24 47 L 30 53"
        fill="none"
        stroke={accent}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 50 41 L 56 47 L 50 53"
        fill="none"
        stroke={accent}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1={43}
        y1={39}
        x2={37}
        y2={55}
        stroke={ink}
        strokeWidth={2.5}
        strokeLinecap="round"
        opacity={0.55}
      />
    </g>
  ),

  mobile: ({ accent, light, ink, paper }) => (
    <g>
      <rect
        x={21}
        y={5}
        width={38}
        height={70}
        rx={9}
        fill={light}
        stroke={ink}
        strokeWidth={4}
      />
      <rect
        x={27}
        y={15}
        width={26}
        height={46}
        rx={3}
        fill={paper}
        stroke={ink}
        strokeWidth={2.5}
      />
      <line
        x1={35}
        y1={10}
        x2={45}
        y2={10}
        stroke={ink}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <circle
        cx={40}
        cy={68}
        r={3.5}
        fill={accent}
        stroke={ink}
        strokeWidth={2.5}
      />
      <rect
        x={32}
        y={23}
        width={16}
        height={16}
        rx={4}
        fill={accent}
        stroke={ink}
        strokeWidth={2.5}
      />
      <line
        x1={32}
        y1={47}
        x2={48}
        y2={47}
        stroke={ink}
        strokeWidth={2.5}
        opacity={0.45}
        strokeLinecap="round"
      />
      <line
        x1={32}
        y1={54}
        x2={43}
        y2={54}
        stroke={ink}
        strokeWidth={2.5}
        opacity={0.45}
        strokeLinecap="round"
      />
    </g>
  ),

  terminal: ({ accent, light, ink, paper }) => (
    <g>
      <rect
        x={7}
        y={12}
        width={66}
        height={56}
        rx={7}
        fill={ink}
        stroke={ink}
        strokeWidth={4}
      />
      <path
        d="M 7 26 H 73"
        fill="none"
        stroke={paper}
        strokeWidth={2.5}
        opacity={0.75}
      />
      <circle cx={16} cy={19} r={2.3} fill={accent} />
      <circle cx={24} cy={19} r={2.3} fill={light} />
      <path
        d="M 18 38 L 26 45 L 18 52"
        fill="none"
        stroke={accent}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1={33}
        y1={52}
        x2={50}
        y2={52}
        stroke={paper}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </g>
  ),

  code: ({ accent, light, ink, paper }) => (
    <g>
      <path
        d="M 15 8 H 50 L 65 23 V 72 H 15 Z"
        fill={paper}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M 50 8 V 23 H 65"
        fill={accent}
        stroke={ink}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <path
        d="M 31 34 L 22 43 L 31 52"
        fill="none"
        stroke={accent}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 49 34 L 58 43 L 49 52"
        fill="none"
        stroke={accent}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1={44}
        y1={30}
        x2={36}
        y2={56}
        stroke={ink}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <rect
        x={23}
        y={62}
        width={24}
        height={4}
        rx={2}
        fill={light}
        stroke={ink}
        strokeWidth={2}
      />
    </g>
  ),
} satisfies Record<string, GlyphRender>;

export type ClientGlyphName = keyof typeof CLIENT_GLYPHS;
