import React from "react";
import {
  Canvas,
  At,
  Card,
  Arrow,
  Annotation,
  Title,
  palette,
  ink,
  fonts,
  frame as frameColor,
} from "../kit";

/**
 * px402 static architecture diagram — the "how a private agent payment flows"
 * sequence-diagram view.
 *
 * Canvas is 1600x1000. 4 actor lanes at 200, 600, 1000, 1400 px.
 * Horizontal arrows between lanes; dashed lifelines below each actor.
 */
export const Px402Static: React.FC = () => {
  return (
    <Canvas w={1600} h={1000}>
      {/* Title bar */}
      <At x={60} y={40}>
        <div style={{ width: 1480 }}>
          <Title accentColor="blue" rightSlot="px402 · allensaji.dev">
            Private Agent Payments on MagicBlock PER
          </Title>
        </div>
      </At>
      <At x={120} y={106}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 17,
            color: ink.muted,
            fontWeight: 500,
          }}
        >
          Same x402 flow. Private settlement. Stateless server.
        </div>
      </At>

      <FlowBody />
    </Canvas>
  );
};

// Lane centers
const LANE = { agent: 200, server: 630, per: 1000, sub: 1400 } as const;
// Lifeline vertical extent
const LIFELINE_TOP = 210;
const LIFELINE_BOTTOM = 810;

const FlowBody: React.FC = () => {
  return (
    <>
      {/* Actor headers */}
      <At x={LANE.agent} y={150} anchor="top-center">
        <Card
          color="blue"
          title="Agent"
          subtitle="AI client"
          padding="12px 26px"
          radius={14}
          titleSize={24}
          subtitleSize={14}
        />
      </At>
      <At x={LANE.server} y={150} anchor="top-center">
        <Card
          color="peach"
          title="px402 server"
          subtitle="Hono / Express / Next / MCP"
          padding="12px 26px"
          radius={14}
          titleSize={24}
          subtitleSize={14}
        />
      </At>
      <At x={LANE.per} y={150} anchor="top-center">
        <Card
          color="purple"
          title="MagicBlock PER"
          subtitle="private Base chain"
          padding="12px 26px"
          radius={14}
          titleSize={24}
          subtitleSize={14}
        />
      </At>
      <At x={LANE.sub} y={150} anchor="top-center">
        <Card
          color="yellow"
          title="Subscriber"
          subtitle="polls getSignaturesForAddress"
          padding="12px 26px"
          radius={14}
          titleSize={24}
          subtitleSize={14}
        />
      </At>

      {/* Lifelines (dashed) */}
      {Object.values(LANE).map((x) => (
        <Arrow
          key={x}
          from={{ x, y: LIFELINE_TOP }}
          to={{ x, y: LIFELINE_BOTTOM }}
          color={ink.muted}
          dashed
          arrowEnd={false}
          strokeWidth={1.5}
        />
      ))}

      {/* Step 1: Agent → Server: GET /data */}
      <StepArrow
        n={1}
        from={{ x: LANE.agent + 8, y: 260 }}
        to={{ x: LANE.server - 8, y: 260 }}
        label="GET /data"
        color={palette.blue.border}
      />

      {/* Step 2: Server → Agent: 402 + HMAC */}
      <StepArrow
        n={2}
        from={{ x: LANE.server - 8, y: 325 }}
        to={{ x: LANE.agent + 8, y: 325 }}
        label="402 + payment token (HMAC)"
        color={palette.peach.border}
      />

      {/* Step 3: Agent → PER: POST /v1/spl/transfer */}
      <StepArrow
        n={3}
        from={{ x: LANE.agent + 8, y: 400 }}
        to={{ x: LANE.per - 8, y: 400 }}
        label="POST /v1/spl/transfer"
        sublabel="(clientRefId, u63)"
        color={palette.blue.border}
      />

      {/* Step 4: PER self-tick (Crank11) */}
      <At x={LANE.per} y={480} anchor="top-center">
        <Card
          color="lavender"
          outline
          padding="10px 18px"
          radius={12}
          style={{ display: "flex" }}
        >
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 15,
              color: palette.lavender.text,
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            <div style={{ fontWeight: 700 }}>④ Crank11 pops queue</div>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 13,
                marginTop: 2,
                opacity: 0.9,
              }}
            >
              emits ProcessTransferQueueTick log
            </div>
          </div>
        </Card>
      </At>

      {/* Step 5: PER → Subscriber: log with clientRefId */}
      <StepArrow
        n={5}
        from={{ x: LANE.per + 8, y: 575 }}
        to={{ x: LANE.sub - 8, y: 575 }}
        label="log containing clientRefId"
        color={palette.purple.border}
      />

      {/* Step 6: Subscriber → Server: matched, HMAC re-verified */}
      <StepArrow
        n={6}
        from={{ x: LANE.sub - 8, y: 650 }}
        to={{ x: LANE.server + 8, y: 650 }}
        label="verified (HMAC re-checked)"
        color={palette.yellow.border}
      />

      {/* Step 7: Server → Agent: 200 + data */}
      <StepArrow
        n={7}
        from={{ x: LANE.server - 8, y: 730 }}
        to={{ x: LANE.agent + 8, y: 730 }}
        label="200 + data"
        color={palette.mint.border}
        thick
      />

      {/* Right-side red annotations */}
      <At x={740} y={380}>
        <Annotation tone="red" size={13} style={{ textAlign: "left" }}>
          clientRefId is u63 —
          <br />
          fits crank log's
          <br />
          ~213-char truncation
        </Annotation>
      </At>
      <At x={265} y={357}>
        <Annotation tone="red" size={13} style={{ textAlign: "left" }}>
          HMAC token
          <br />
          = stateless verify,
          <br />
          no database
        </Annotation>
      </At>

      {/* Footer: the punchline */}
      <At x={60} y={850}>
        <div
          style={{
            background: palette.mint.bg,
            border: `2px solid ${palette.mint.border}`,
            borderRadius: 14,
            padding: "16px 24px",
            textAlign: "center",
            width: 1480,
            color: palette.mint.text,
            fontFamily: fonts.sans,
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 700 }}>
            Public chain sees one aggregated cranker tick — not a tx per agent,
            not per API call.
          </div>
          <div style={{ fontSize: 16, fontWeight: 500, marginTop: 4 }}>
            Agent strategy, pricing, and call frequency stay private. Same x402
            developer experience.
          </div>
        </div>
      </At>
    </>
  );
};

type StepArrowProps = {
  n: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  label: string;
  sublabel?: string;
  color?: string;
  thick?: boolean;
};

const StepArrow: React.FC<StepArrowProps> = ({
  n,
  from,
  to,
  label,
  sublabel,
  color = ink.arrow,
  thick = false,
}) => {
  const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
  return (
    <>
      <Arrow
        from={from}
        to={to}
        color={color}
        strokeWidth={thick ? 2.4 : 1.8}
        headSize={thick ? 12 : 10}
      />
      <div
        style={{
          position: "absolute",
          left: mid.x,
          top: from.y - 26,
          transform: "translate(-50%, -50%)",
          background: frameColor.bg,
          padding: "2px 10px",
          borderRadius: 8,
          fontFamily: fonts.sans,
          fontSize: 15,
          fontWeight: 600,
          color: ink.body,
          whiteSpace: "nowrap",
          pointerEvents: "none",
          textAlign: "center",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: color,
            color: "#fff",
            width: 20,
            height: 20,
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 700,
            marginRight: 8,
            verticalAlign: "middle",
          }}
        >
          {n}
        </span>
        {label}
      </div>
      {sublabel ? (
        <div
          style={{
            position: "absolute",
            left: mid.x,
            top: from.y + 14,
            transform: "translate(-50%, -50%)",
            fontFamily: fonts.mono,
            fontSize: 13,
            color: ink.muted,
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          {sublabel}
        </div>
      ) : null}
    </>
  );
};

