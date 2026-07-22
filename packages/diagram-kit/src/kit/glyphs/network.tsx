import type { GlyphRender } from "./types";

export const NETWORK_GLYPHS = {
  internet: ({ accent, light, ink }) => (
    <g>
      <circle
        cx={40}
        cy={40}
        r={31}
        fill={light}
        stroke={ink}
        strokeWidth={4}
      />
      <ellipse
        cx={40}
        cy={40}
        rx={14}
        ry={31}
        fill="none"
        stroke={ink}
        strokeWidth={3}
        opacity={0.7}
      />
      <path
        d="M 10 40 H 70 M 15 25 H 65 M 15 55 H 65"
        fill="none"
        stroke={ink}
        strokeWidth={3}
        opacity={0.7}
      />
      <circle
        cx={40}
        cy={40}
        r={5}
        fill={accent}
        stroke={ink}
        strokeWidth={2.5}
      />
    </g>
  ),

  dns: ({ accent, light, ink, paper }) => (
    <g>
      <circle
        cx={34}
        cy={40}
        r={27}
        fill={light}
        stroke={ink}
        strokeWidth={4}
      />
      <path
        d="M 7 40 H 61 M 13 27 H 55 M 13 53 H 55"
        fill="none"
        stroke={ink}
        strokeWidth={2.5}
        opacity={0.45}
      />
      <ellipse
        cx={34}
        cy={40}
        rx={12}
        ry={27}
        fill="none"
        stroke={ink}
        strokeWidth={2.5}
        opacity={0.45}
      />
      <path
        d="M 54 18 H 73 V 35 H 54 L 48 29 V 24 Z"
        fill={paper}
        stroke={ink}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <circle cx={60} cy={26.5} r={3} fill={accent} />
      <line
        x1={65}
        y1={26.5}
        x2={69}
        y2={26.5}
        stroke={ink}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <path
        d="M 54 47 H 73 V 64 H 54 L 48 58 V 53 Z"
        fill={accent}
        stroke={ink}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <circle cx={60} cy={55.5} r={3} fill={paper} />
      <line
        x1={65}
        y1={55.5}
        x2={69}
        y2={55.5}
        stroke={ink}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </g>
  ),

  "api-gateway": ({ accent, light, ink, paper }) => (
    <g>
      <path
        d="M 16 10 H 64 V 70 H 16 Z"
        fill={light}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M 25 70 V 26 C 25 21 29 18 34 18 H 46 C 51 18 55 21 55 26 V 70"
        fill={paper}
        stroke={ink}
        strokeWidth={3}
      />
      <path
        d="M 36 34 L 30 40 L 36 46"
        fill="none"
        stroke={accent}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 44 34 L 50 40 L 44 46"
        fill="none"
        stroke={accent}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={48}
        cy={58}
        r={3}
        fill={accent}
        stroke={ink}
        strokeWidth={2}
      />
      <path
        d="M 7 40 H 16 M 64 40 H 73"
        stroke={ink}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M 69 35 L 75 40 L 69 45"
        fill="none"
        stroke={ink}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  ),

  "load-balancer": ({ accent, light, ink, paper }) => (
    <g>
      <circle
        cx={40}
        cy={13}
        r={8}
        fill={accent}
        stroke={ink}
        strokeWidth={3.5}
      />
      <line x1={40} y1={21} x2={40} y2={35} stroke={ink} strokeWidth={3.5} />
      <rect
        x={18}
        y={34}
        width={44}
        height={12}
        rx={6}
        fill={light}
        stroke={ink}
        strokeWidth={3.5}
      />
      <path
        d="M 40 46 V 54 M 20 46 V 54 M 60 46 V 54"
        fill="none"
        stroke={ink}
        strokeWidth={3.5}
      />
      {[20, 40, 60].map((x, index) => (
        <rect
          key={x}
          x={x - 9}
          y={54}
          width={18}
          height={17}
          rx={4}
          fill={index === 1 ? accent : paper}
          stroke={ink}
          strokeWidth={3}
        />
      ))}
      <path
        d="M 34 39 H 46"
        stroke={ink}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </g>
  ),

  cdn: ({ accent, light, ink, paper }) => (
    <g>
      <circle
        cx={40}
        cy={40}
        r={22}
        fill={light}
        stroke={ink}
        strokeWidth={4}
      />
      <ellipse
        cx={40}
        cy={40}
        rx={9}
        ry={22}
        fill="none"
        stroke={ink}
        strokeWidth={2.5}
        opacity={0.45}
      />
      <path
        d="M 18 40 H 62 M 22 29 H 58 M 22 51 H 58"
        fill="none"
        stroke={ink}
        strokeWidth={2.5}
        opacity={0.45}
      />
      {[
        [40, 7],
        [70, 24],
        [70, 56],
        [40, 73],
        [10, 56],
        [10, 24],
      ].map(([x, y], index) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={6}
          fill={index % 2 === 0 ? accent : paper}
          stroke={ink}
          strokeWidth={3}
        />
      ))}
    </g>
  ),

  firewall: ({ accent, light, ink, paper }) => (
    <g>
      <rect
        x={8}
        y={14}
        width={64}
        height={52}
        rx={5}
        fill={light}
        stroke={ink}
        strokeWidth={4}
      />
      {[14, 27, 40, 53].map((y, row) => (
        <g key={y}>
          <line
            x1={8}
            y1={y}
            x2={72}
            y2={y}
            stroke={ink}
            strokeWidth={2.5}
            opacity={row === 0 ? 0 : 0.55}
          />
          {row < 3 ? (
            <>
              <line
                x1={row % 2 === 0 ? 29 : 20}
                y1={y}
                x2={row % 2 === 0 ? 29 : 20}
                y2={y + 13}
                stroke={ink}
                strokeWidth={2.5}
                opacity={0.55}
              />
              <line
                x1={row % 2 === 0 ? 51 : 43}
                y1={y}
                x2={row % 2 === 0 ? 51 : 43}
                y2={y + 13}
                stroke={ink}
                strokeWidth={2.5}
                opacity={0.55}
              />
            </>
          ) : null}
        </g>
      ))}
      <path
        d="M 40 30 C 49 38 47 43 43 47 C 45 40 38 38 38 33 C 29 42 30 53 40 58 C 52 53 54 39 40 30 Z"
        fill={accent}
        stroke={ink}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <path
        d="M 40 44 C 44 48 43 52 40 54 C 36 52 36 48 40 44 Z"
        fill={paper}
      />
    </g>
  ),
} satisfies Record<string, GlyphRender>;

export type NetworkGlyphName = keyof typeof NETWORK_GLYPHS;
