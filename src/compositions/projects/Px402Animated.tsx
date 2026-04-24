import React from "react";
import {
  Canvas,
  At,
  Card,
  Arrow,
  Annotation,
  Title,
  Label,
  palette,
  ink,
  fonts,
} from "../../kit";
import { Appear, DrawArrow, Pulse } from "../../animation";

export type Px402AnimatedProps = {
  debug?: boolean;
};

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
 *   5.6  HMAC annotation fades in
 *   5.8  u63 annotation fades in
 *   6.2  step 4: Crank11 pops queue (pulse)
 *   7.6  step 5: PER → Subscriber
 *   8.8  step 6: Subscriber → Server
 *  10.0  step 7: Server → Agent  200 + data  (thick, green)
 *  11.2  footer callout fades in
 *  13.5  hold
 *  15.0  end
 */
export const Px402Animated: React.FC<Px402AnimatedProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={1000} debug={debug}>
      <Appear at={0.0} duration={0.5} slideY={-12}>
        <At x={60} y={40}>
          <div style={{ width: 1480 }}>
            <Title accentColor="blue" rightSlot="px402 · allensaji.dev">
              Private Agent Payments on MagicBlock PER
            </Title>
          </div>
        </At>
      </Appear>
      <Appear at={0.25} duration={0.5}>
        <At x={120} y={106}>
          <Label debugId="subtitle" size={17} weight={500} color={ink.muted}>
            Same x402 flow. Private settlement. Stateless server.
          </Label>
        </At>
      </Appear>

      <FlowBodyAnimated />
    </Canvas>
  );
};

const LANE = { agent: 200, server: 630, per: 1000, sub: 1400 } as const;
// Lifelines start below actor cards (card bottom ~222 at y=150 top-center).
const LIFELINE_TOP = 228;
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
            debugId="actor-agent"
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
            debugId="actor-server"
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
            debugId="actor-per"
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
            debugId="actor-subscriber"
          />
        </Appear>
      </At>

      {/* Lifelines (dashed) — structural scaffold, not tagged for
          collision checks because sequence-diagram lifelines
          legitimately span the full height and "cross" on-lane cards
          by design. */}
      {(Object.entries(LANE) as [keyof typeof LANE, number][]).map(
        ([name, x]) => (
          <DrawArrow
            key={name}
            at={1.4}
            duration={0.6}
            from={{ x, y: LIFELINE_TOP }}
            to={{ x, y: LIFELINE_BOTTOM }}
            color={ink.muted}
            dashed
            arrowEnd={false}
            strokeWidth={1.5}
          />
        ),
      )}

      {/* Step 1: GET /data */}
      <StepArrowAnimated
        id="step1"
        n={1}
        at={1.8}
        from={{ x: LANE.agent + 8, y: 260 }}
        to={{ x: LANE.server - 8, y: 260 }}
        label="GET /data"
        color={palette.blue.border}
      />

      {/* Step 2: 402 + HMAC */}
      <StepArrowAnimated
        id="step2"
        n={2}
        at={3.0}
        from={{ x: LANE.server - 8, y: 325 }}
        to={{ x: LANE.agent + 8, y: 325 }}
        label="402 + payment token (HMAC)"
        color={palette.peach.border}
      />

      {/* Step 3: POST /v1/spl/transfer */}
      <StepArrowAnimated
        id="step3"
        n={3}
        at={4.2}
        from={{ x: LANE.agent + 8, y: 400 }}
        to={{ x: LANE.per - 8, y: 400 }}
        label="POST /v1/spl/transfer"
        sublabel="(clientRefId, u63)"
        color={palette.blue.border}
      />

      {/* Annotations — sit in the gap between step 2 (y=325) and
          step 3 (y=400) arrows. */}
      <At x={265} y={340}>
        <Appear at={5.6} duration={0.4}>
          <Annotation
            tone="red"
            size={13}
            style={{ textAlign: "left" }}
            debugId="note-hmac"
          >
            HMAC token
            <br />
            = stateless verify,
            <br />
            no database
          </Annotation>
        </Appear>
      </At>
      <At x={740} y={340}>
        <Appear at={5.8} duration={0.4}>
          <Annotation
            tone="red"
            size={13}
            style={{ textAlign: "left" }}
            debugId="note-u63"
          >
            clientRefId is u63 —
            <br />
            fits crank log's
            <br />
            ~213-char truncation
          </Annotation>
        </Appear>
      </At>

      {/* Step 4: Crank11 pops queue — pulse */}
      <At x={LANE.per} y={480} anchor="top-center">
        <Appear at={6.2} duration={0.5}>
          <Pulse at={6.5} duration={0.7} peak={1.1}>
            <Card
              color="lavender"
              padding="10px 18px"
              radius={12}
              debugId="step4-crank"
            >
              <div style={{ textAlign: "center", lineHeight: 1.3 }}>
                <div
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 15,
                    fontWeight: 700,
                    color: palette.lavender.text,
                  }}
                >
                  ④ Crank11 pops queue
                </div>
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 13,
                    marginTop: 2,
                    opacity: 0.9,
                    color: palette.lavender.text,
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
        id="step5"
        n={5}
        at={7.6}
        from={{ x: LANE.per + 8, y: 575 }}
        to={{ x: LANE.sub - 8, y: 575 }}
        label="log containing clientRefId"
        color={palette.purple.border}
      />

      {/* Step 6: Subscriber → Server */}
      <StepArrowAnimated
        id="step6"
        n={6}
        at={8.8}
        from={{ x: LANE.sub - 8, y: 650 }}
        to={{ x: LANE.server + 8, y: 650 }}
        label="verified (HMAC re-checked)"
        color={palette.yellow.border}
      />

      {/* Step 7: 200 + data (thick, the payoff) */}
      <StepArrowAnimated
        id="step7"
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
          <Card
            color="mint"
            padding="18px 28px"
            radius={14}
            align="center"
            style={{ width: 1480 }}
            debugId="footer-callout"
          >
            <div
              style={{
                fontFamily: fonts.sans,
                color: palette.mint.text,
                textAlign: "center",
                lineHeight: 1.25,
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
          </Card>
        </Appear>
      </At>
    </>
  );
};

type StepArrowAnimatedProps = {
  id: string;
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
  id,
  n,
  at,
  from,
  to,
  label,
  sublabel,
  color = ink.arrow,
  thick = false,
}) => {
  // The numbered badge + label sits on the arrow as its `label` prop.
  // Arrow marks its label div with data-dk-skip so the orphan walker
  // won't flag it, and fades it with progress.
  return (
    <>
      <DrawArrow
        debugId={id}
        at={at}
        duration={0.6}
        from={from}
        to={to}
        color={color}
        strokeWidth={thick ? 2.4 : 1.8}
        headSize={thick ? 12 : 10}
        label={
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: fonts.sans,
              fontSize: 15,
              fontWeight: 600,
              color: ink.body,
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
              }}
            >
              {n}
            </span>
            {label}
          </span>
        }
        labelT={0.5}
        labelOffset={0}
        labelSize={15}
        labelWeight={600}
      />
      {sublabel ? (
        <Appear at={at + 0.4} duration={0.3} slideY={6}>
          <At
            x={(from.x + to.x) / 2}
            y={from.y + 18}
            anchor="top-center"
          >
            <Label
              debugId={`${id}-sublabel`}
              size={13}
              weight={400}
              color={ink.muted}
              tracking={0}
              align="center"
              style={{ fontFamily: fonts.mono, whiteSpace: "nowrap" }}
            >
              {sublabel}
            </Label>
          </At>
        </Appear>
      ) : null}
    </>
  );
};
