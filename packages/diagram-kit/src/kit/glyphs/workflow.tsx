import type { GlyphRender } from "./types";

export const WORKFLOW_GLYPHS = {
  repository: ({ accent, light, ink, paper }) => (
    <g>
      <path
        d="M 8 20 H 33 L 39 27 H 72 V 68 H 8 Z"
        fill={light}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M 8 20 V 12 H 31 L 37 20"
        fill={paper}
        stroke={ink}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <circle
        cx={27}
        cy={40}
        r={5}
        fill={accent}
        stroke={ink}
        strokeWidth={2.5}
      />
      <circle
        cx={52}
        cy={38}
        r={5}
        fill={accent}
        stroke={ink}
        strokeWidth={2.5}
      />
      <circle
        cx={52}
        cy={57}
        r={5}
        fill={accent}
        stroke={ink}
        strokeWidth={2.5}
      />
      <path
        d="M 32 40 H 42 C 48 40 52 45 52 52"
        fill="none"
        stroke={ink}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <line x1={52} y1={43} x2={52} y2={52} stroke={ink} strokeWidth={3} />
    </g>
  ),

  "git-branch": ({ accent, light, ink }) => (
    <g>
      <circle
        cx={23}
        cy={15}
        r={8}
        fill={accent}
        stroke={ink}
        strokeWidth={3.5}
      />
      <circle
        cx={23}
        cy={65}
        r={8}
        fill={accent}
        stroke={ink}
        strokeWidth={3.5}
      />
      <circle
        cx={58}
        cy={27}
        r={8}
        fill={light}
        stroke={ink}
        strokeWidth={3.5}
      />
      <line
        x1={23}
        y1={23}
        x2={23}
        y2={57}
        stroke={ink}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M 23 37 H 43 C 51 37 58 34 58 27"
        fill="none"
        stroke={ink}
        strokeWidth={4}
        strokeLinecap="round"
      />
    </g>
  ),

  "pull-request": ({ accent, light, ink }) => (
    <g>
      <circle
        cx={22}
        cy={15}
        r={7}
        fill={accent}
        stroke={ink}
        strokeWidth={3.5}
      />
      <circle
        cx={22}
        cy={65}
        r={7}
        fill={accent}
        stroke={ink}
        strokeWidth={3.5}
      />
      <circle
        cx={58}
        cy={65}
        r={7}
        fill={light}
        stroke={ink}
        strokeWidth={3.5}
      />
      <line
        x1={22}
        y1={22}
        x2={22}
        y2={58}
        stroke={ink}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M 58 58 V 39 C 58 31 51 25 43 25 H 35"
        fill="none"
        stroke={ink}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M 41 17 L 33 25 L 41 33"
        fill="none"
        stroke={ink}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 42 48 L 50 40 L 58 48"
        fill="none"
        stroke={accent}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  ),

  pipeline: ({ accent, light, ink, paper }) => (
    <g>
      {[11, 31, 51].map((x, index) => (
        <g key={x}>
          <rect
            x={x}
            y={28}
            width={18}
            height={24}
            rx={5}
            fill={index === 1 ? accent : light}
            stroke={ink}
            strokeWidth={3}
          />
          {index < 2 ? (
            <>
              <line
                x1={x + 18}
                y1={40}
                x2={x + 25}
                y2={40}
                stroke={ink}
                strokeWidth={3}
              />
              <path
                d={`M ${x + 22} 36 L ${x + 27} 40 L ${x + 22} 44`}
                fill="none"
                stroke={ink}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : null}
          <circle
            cx={x + 9}
            cy={40}
            r={3}
            fill={index === 1 ? paper : accent}
          />
        </g>
      ))}
      <path
        d="M 20 19 H 60 M 20 61 H 60"
        stroke={ink}
        strokeWidth={3}
        opacity={0.45}
        strokeLinecap="round"
      />
      <circle
        cx={20}
        cy={19}
        r={4}
        fill={accent}
        stroke={ink}
        strokeWidth={2.5}
      />
      <circle
        cx={60}
        cy={61}
        r={4}
        fill={accent}
        stroke={ink}
        strokeWidth={2.5}
      />
    </g>
  ),

  package: ({ accent, light, ink, paper }) => (
    <g>
      <path
        d="M 10 23 L 40 8 L 70 23 L 40 38 Z"
        fill={light}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M 10 23 V 59 L 40 74 V 38 Z"
        fill={accent}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M 70 23 V 59 L 40 74 V 38 Z"
        fill={light}
        stroke={ink}
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <path
        d="M 25 15 L 55 30 V 45 L 48 48 V 34 L 18 19 Z"
        fill={paper}
        stroke={ink}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
    </g>
  ),

  "test-suite": ({ accent, light, ink, paper }) => (
    <g>
      <rect
        x={14}
        y={10}
        width={52}
        height={62}
        rx={7}
        fill={paper}
        stroke={ink}
        strokeWidth={4}
      />
      <rect
        x={27}
        y={6}
        width={26}
        height={12}
        rx={5}
        fill={light}
        stroke={ink}
        strokeWidth={3}
      />
      {[30, 44, 58].map((y, index) => (
        <g key={y}>
          <rect
            x={23}
            y={y - 5}
            width={10}
            height={10}
            rx={2}
            fill={index === 2 ? light : accent}
            stroke={ink}
            strokeWidth={2.5}
          />
          {index < 2 ? (
            <path
              d={`M 25 ${y} L 28 ${y + 3} L 33 ${y - 4}`}
              fill="none"
              stroke={paper}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : null}
          <line
            x1={40}
            y1={y}
            x2={57}
            y2={y}
            stroke={ink}
            strokeWidth={3}
            opacity={0.45}
            strokeLinecap="round"
          />
        </g>
      ))}
    </g>
  ),
} satisfies Record<string, GlyphRender>;

export type WorkflowGlyphName = keyof typeof WORKFLOW_GLYPHS;
