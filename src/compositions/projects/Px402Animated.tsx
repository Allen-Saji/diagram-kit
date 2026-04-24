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
import { Appear, DrawArrow, Pulse } from "../animation";

/**
 * Animated px402 architecture diagram — 15s sequence diagram,
 * same layout as Px402Static wrapped in a timeline.
 *
 * Timeline (seconds):
 *   0.0  title + subtitle fade in
 *   0.6  actor headers fade in (staggered)
 *   1.4  lifelines draw in
 *   1.8  step 1: Agent → Server  GET /data
 *   3.0  step 2: Server → Agent  402 + HMAC
 *   4.2  step 3: Agent → PER     POST /v1/spl/transfer
 *   5.6  HMAC annotation fades
 *   5.8  u63 annotation fades
 *   6.2  step 4: Crank11 pops queue (pulse)
 *   7.6  step 5: PER → Subscriber
 *   8.8  step 6: Subscriber → Server
 *  10.0  step 7: Server → Agent  200 + data  (thick, green)
 *  11.2  footer callout fades in
 *  13.5  hold
 *  15.0  end
 */
export const Px402Animated: React.FC = () => {
  return (
    <Canvas w={1600} h={1000}>
      <Appear at={0.0} duration={0.5} slideY={-12}>
        <div style={{ position: "absolute", left: 60, top: 40, width: 1480 }}>
          <Title accentColor="blue" rightSlot="px402 · allensaji.dev">
            Private Agent Payments on MagicBlock PER
          </Title>
        </div>
      </Appear>
      <Appear at={0.25} duration={0.5}>
        <div style={{ position: "absolute", left: 120, top: 106 }}>
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
        </div>
      </Appear>

      <FlowBodyAnimated />
    </Canvas>
  );
};

const LANE = { agent: 200, server: 630, per: 1000, sub: 1400 } as const;
const LIFELINE_TOP = 210;
const LIFELINE_BOTTOM = 810;

const FlowBodyAnimated: React.FC = () => {
  return (
    <>
      {/* Actor headers staggered */}
      <At x={LANE.agent} y={150} anchor="top-center">
        <Appear at={0.6} duration={0.4} slideY={-10}>
          <Card
            color="blue"
            title="Agent"
            subtitle="AI client"
            padding="12px 26px"
            radius={14}
            titleSize={24}
            subtitleSize={14}
          />
        </Appear>
      </At>
      <At x={LANE.server} y={150} anchor="top-center">
        <Appear at={0.8} duration={0.4} slideY={-10}>
          <Card
            color="peach"
            title="px402 server"
            subtitle="Hono / Express / Next / MCP"
            padding="12px 26px"
            radius={14}
            titleSize={24}
            subtitleSize={14}
          />
        </Appear>
      </At>
      <At x={LANE.per} y={150} anchor="top-center">
        <Appear at={1.0} duration={0.4} slideY={-10}>
          <Card
            color="purple"
            title="MagicBlock PER"
            subtitle="private Base chain"
            padding="12px 26px"
            radius={14}
            titleSize={24}
            subtitleSize={14}
          />
        </Appear>
      </At>
      <At x={LANE.sub} y={150} anchor="top-center">
        <Appear at={1.2} duration={0.4} slideY={-10}>
          <Card
            color="yellow"
            title="Subscriber"
            subtitle="polls getSignaturesForAddress"
            padding="12px 26px"
            radius={14}
            titleSize={24}
            subtitleSize={14}
          />
        </Appear>
      </At>

      {/* Lifelines (dashed) — draw in */}
      {Object.values(LANE).map((x) => (
        <DrawArrow
          key={x}
          at={1.4}
          duration={0.6}
          from={{ x, y: LIFELINE_TOP }}
          to={{ x, y: LIFELINE_BOTTOM }}
          color={ink.muted}
          dashed
          arrowEnd={false}
          strokeWidth={1.5}
        />
      ))}

      {/* Step 1: GET /data */}
      <StepArrowAnimated
        n={1}
        at={1.8}
        from={{ x: LANE.agent + 8, y: 260 }}
        to={{ x: LANE.server - 8, y: 260 }}
        label="GET /data"
        color={palette.blue.border}
      />

      {/* Step 2: 402 + HMAC */}
      <StepArrowAnimated
        n={2}
        at={3.0}
        from={{ x: LANE.server - 8, y: 325 }}
        to={{ x: LANE.agent + 8, y: 325 }}
        label="402 + payment token (HMAC)"
        color={palette.peach.border}
      />

      {/* Step 3: POST /v1/spl/transfer */}
      <StepArrowAnimated
        n={3}
        at={4.2}
        from={{ x: LANE.agent + 8, y: 400 }}
        to={{ x: LANE.per - 8, y: 400 }}
        label="POST /v1/spl/transfer"
        sublabel="(clientRefId, u63)"
        color={palette.blue.border}
      />

      {/* Annotations */}
      <At x={740} y={380}>
        <Appear at={5.8} duration={0.4}>
          <Annotation tone="red" size={13} style={{ textAlign: "left" }}>
            clientRefId is u63 —
            <br />
            fits crank log's
            <br />
            ~213-char truncation
          </Annotation>
        </Appear>
      </At>
      <At x={265} y={357}>
        <Appear at={5.6} duration={0.4}>
          <Annotation tone="red" size={13} style={{ textAlign: "left" }}>
            HMAC token
            <br />
            = stateless verify,
            <br />
            no database
          </Annotation>
        </Appear>
      </At>

      {/* Step 4: Crank11 pops queue — pulse */}
      <At x={LANE.per} y={480} anchor="top-center">
        <Appear at={6.2} duration={0.5}>
          <Pulse at={6.5} duration={0.7} peak={1.1}>
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
          </Pulse>
        </Appear>
      </At>

      {/* Step 5: PER → Subscriber */}
      <StepArrowAnimated
        n={5}
        at={7.6}
        from={{ x: LANE.per + 8, y: 575 }}
        to={{ x: LANE.sub - 8, y: 575 }}
        label="log containing clientRefId"
        color={palette.purple.border}
      />

      {/* Step 6: Subscriber → Server */}
      <StepArrowAnimated
        n={6}
        at={8.8}
        from={{ x: LANE.sub - 8, y: 650 }}
        to={{ x: LANE.server + 8, y: 650 }}
        label="verified (HMAC re-checked)"
        color={palette.yellow.border}
      />

      {/* Step 7: 200 + data (thick, the payoff) */}
      <StepArrowAnimated
        n={7}
        at={10.0}
        from={{ x: LANE.server - 8, y: 730 }}
        to={{ x: LANE.agent + 8, y: 730 }}
        label="200 + data"
        color={palette.mint.border}
        thick
      />

      {/* Footer — the punchline */}
      <At x={60} y={850}>
        <Appear at={11.2} duration={0.6} slideY={24}>
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
              Public chain sees one aggregated cranker tick — not a tx per
              agent, not per API call.
            </div>
            <div style={{ fontSize: 16, fontWeight: 500, marginTop: 4 }}>
              Agent strategy, pricing, and call frequency stay private. Same
              x402 developer experience.
            </div>
          </div>
        </Appear>
      </At>
    </>
  );
};

type StepArrowAnimatedProps = {
  n: number;
  at: number;
  from: { x: number; y: number };
  to: { x: number; y: number };
  label: string;
  sublabel?: string;
  color?: string;
  thick?: boolean;
};

const StepArrowAnimated: React.FC<StepArrowAnimatedProps> = ({
  n,
  at,
  from,
  to,
  label,
  sublabel,
  color = ink.arrow,
  thick = false,
}) => {
  const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
  const labelDelay = at + 0.4; // label appears after arrow draws
  return (
    <>
      <DrawArrow
        at={at}
        duration={0.6}
        from={from}
        to={to}
        color={color}
        strokeWidth={thick ? 2.4 : 1.8}
        headSize={thick ? 12 : 10}
      />
      <Appear at={labelDelay} duration={0.3} slideY={6}>
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
      </Appear>
    </>
  );
};
