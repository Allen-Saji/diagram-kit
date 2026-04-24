import React from "react";
import {
  Canvas,
  At,
  Card,
  Panel,
  FlowBox,
  Arrow,
  Annotation,
  Title,
  Label,
  ink,
} from "../../kit";

export type PortProtocolArchProps = {
  debug?: boolean;
};

/**
 * Port Protocol architecture — static.
 *
 * Canvas is 1600x1000. Three column panels:
 *   1. Clients (dashboard, SDK, cron, wallet)
 *   2. Port Program on-chain (execute_transfer, PortAccount, 5 rules)
 *   3. SPL Token + destination
 * Reject loop arrow at the bottom feeds back to the clients column.
 */
export const PortProtocolArch: React.FC<PortProtocolArchProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={1000} debug={debug}>
      {/* Title */}
      <At x={60} y={40}>
        <div style={{ width: 1480 }}>
          <Title accentColor="blue" rightSlot="port-protocol.allensaji.dev">
            Port Protocol Architecture
          </Title>
        </div>
      </At>
      <At x={120} y={106}>
        <Label
          debugId="subtitle"
          size={17}
          weight={500}
          color={ink.muted}
          tracking={0}
        >
          Programmable authorization layer for Solana. Every outbound transfer passes a rule pipeline.
        </Label>
      </At>

      <Body />
    </Canvas>
  );
};

// ------- Layout constants (shared with animated variant) -------

export const PANEL_Y = 180;
export const PANEL_H = 640;

export const COL = {
  clients: { x: 60, w: 300 },
  program: { x: 400, w: 760 },
  token: { x: 1200, w: 340 },
} as const;

// Clients column rows
export const CLIENT_ROW = { dash: 260, sdk: 360, cron: 460, wallet: 600 } as const;

// Program column y anchors
export const PROG = {
  entryY: 240, // execute_transfer FlowBox
  portY: 320, // PortAccount card
  rulesLabelY: 410, // "Rule Pipeline" label
  rulesY: 450, // rule FlowBoxes
  ruleCpiCardY: 580, // CPI / Reject markers inside program panel
} as const;

// Token column rows
export const TOK_ROW = { prog: 300, dest: 500 } as const;

const CARD_W_CLIENTS = 240;
const CARD_W_TOKEN = 280;

// Program inner layout
// Panel 2 spans x=400 to x=1160, inner area roughly 432-1128.
// Center x ≈ 780.
const PROG_CENTER_X = COL.program.x + COL.program.w / 2;

export const Body: React.FC = () => (
  <>
    {/* Panel frames */}
    <At x={COL.clients.x} y={PANEL_Y}>
      <Panel
        title="Clients"
        style={{ width: COL.clients.w, height: PANEL_H }}
      />
    </At>
    <At x={COL.program.x} y={PANEL_Y}>
      <Panel
        title="Port Program (Pinocchio, on-chain)"
        style={{ width: COL.program.w, height: PANEL_H }}
      />
    </At>
    <At x={COL.token.x} y={PANEL_Y}>
      <Panel
        title="SPL Token"
        style={{ width: COL.token.w, height: PANEL_H }}
      />
    </At>

    {/* Clients cards */}
    <At x={COL.clients.x + 30} y={CLIENT_ROW.dash}>
      <Card
        color="blue"
        title="Dashboard"
        subtitle="Next.js 16, wallet-adapter"
        align="left"
        style={{ width: CARD_W_CLIENTS }}
        debugId="cl-dashboard"
      />
    </At>
    <At x={COL.clients.x + 30} y={CLIENT_ROW.sdk}>
      <Card
        color="purple"
        title="Client SDK"
        subtitle="Codama + @solana/kit"
        align="left"
        style={{ width: CARD_W_CLIENTS }}
        debugId="cl-sdk"
      />
    </At>
    <At x={COL.clients.x + 30} y={CLIENT_ROW.cron}>
      <Card
        color="peach"
        title="TukTuk cron"
        subtitle="Auto Sweep scheduler"
        align="left"
        style={{ width: CARD_W_CLIENTS }}
        debugId="cl-tuktuk"
      />
    </At>
    <At x={COL.clients.x + 30} y={CLIENT_ROW.wallet}>
      <Card
        color="mint"
        title="User Wallet"
        subtitle="Phantom / Solflare / Backpack"
        align="left"
        style={{ width: CARD_W_CLIENTS }}
        debugId="cl-wallet"
      />
    </At>

    {/* Program entry FlowBox */}
    <At x={PROG_CENTER_X - 110} y={PROG.entryY}>
      <FlowBox
        color="lavender"
        title="execute_transfer"
        subtitle="10 instructions total"
        width={220}
        height={60}
        titleSize={18}
        subtitleSize={13}
        debugId="pg-entry"
      />
    </At>

    {/* PortAccount state */}
    <At x={PROG_CENTER_X - 230} y={PROG.portY}>
      <Card
        color="yellow"
        title="PortAccount (144B)"
        subtitle="owner · mint · rules bitmask · rate-limit window · counters"
        align="left"
        style={{ width: 460 }}
        titleSize={20}
        subtitleSize={14}
        debugId="pg-port-account"
      />
    </At>


    {/* 5 rule FlowBoxes in a row */}
    {(() => {
      const rules = [
        { color: "blue" as const, title: "Amount", subtitle: "threshold", id: "pg-rule-amount" },
        { color: "peach" as const, title: "Rate", subtitle: "rolling window", id: "pg-rule-rate" },
        { color: "mint" as const, title: "Whitelist", subtitle: "up to 3 dests", id: "pg-rule-whitelist" },
        { color: "purple" as const, title: "Time", subtitle: "UTC hours", id: "pg-rule-time" },
        { color: "pink" as const, title: "Auto Sweep", subtitle: "cold wallet", id: "pg-rule-sweep" },
      ];
      const count = rules.length;
      const cardW = 120;
      const gap = 15;
      const totalW = count * cardW + (count - 1) * gap;
      const startX = PROG_CENTER_X - totalW / 2;
      return rules.map((r, i) => (
        <At key={r.id} x={startX + i * (cardW + gap)} y={PROG.rulesY}>
          <FlowBox
            color={r.color}
            title={r.title}
            subtitle={r.subtitle}
            width={cardW}
            height={74}
            titleSize={17}
            subtitleSize={12}
            debugId={r.id}
          />
        </At>
      ));
    })()}

    {/* CPI-out marker inside program panel (so external CPI arrow has clean origin) */}
    <At x={PROG_CENTER_X + 170} y={PROG.ruleCpiCardY}>
      <FlowBox
        color="mint"
        title="CPI"
        subtitle="pinocchio-token"
        width={140}
        height={56}
        titleSize={17}
        subtitleSize={12}
        debugId="pg-cpi"
      />
    </At>
    {/* Reject marker (terminal; error propagates to the RPC caller) */}
    <At x={PROG_CENTER_X - 310} y={PROG.ruleCpiCardY}>
      <FlowBox
        color="pink"
        title="Reject"
        subtitle="tx fails, error returned"
        width={160}
        height={56}
        titleSize={17}
        subtitleSize={12}
        debugId="pg-reject"
      />
    </At>

    {/* Footnote under the pipeline — highlights what makes Port Protocol unique */}
    <At x={PROG_CENTER_X - 260} y={PROG.ruleCpiCardY + 100}>
      <Annotation tone="gray" debugId="pg-footnote">
        Up to 16 rules per Port · composable via u16 bitmask · per-mint isolation
      </Annotation>
    </At>

    {/* Token column cards */}
    <At x={COL.token.x + 30} y={TOK_ROW.prog}>
      <Card
        color="blue"
        title="Token Program"
        subtitle="spl-token + token-2022"
        align="left"
        style={{ width: CARD_W_TOKEN }}
        debugId="tk-program"
      />
    </At>
    <At x={COL.token.x + 30} y={TOK_ROW.dest}>
      <Card
        color="mint"
        title="Destination"
        subtitle="recipient ATA, credited"
        align="left"
        style={{ width: CARD_W_TOKEN }}
        debugId="tk-dest"
      />
    </At>

    {/* ---- Arrows ---- */}

    {/* Clients → execute_transfer (submit tx) */}
    <Arrow
      debugId="a-clients-to-entry"
      from={{ x: COL.clients.x + COL.clients.w, y: 270 }}
      to={{ x: PROG_CENTER_X - 110, y: 270 }}
      label="submit tx"
      labelOffset={-16}
    />

    {/* execute_transfer → PortAccount */}
    <Arrow
      debugId="a-entry-to-port"
      from={{ x: PROG_CENTER_X, y: 300 }}
      to={{ x: PROG_CENTER_X, y: 320 }}
    />

    {/* PortAccount → rule pipeline row.
        Arrow label names the pipeline semantics. */}
    <Arrow
      debugId="a-port-to-rules"
      from={{ x: PROG_CENTER_X, y: 395 }}
      to={{ x: PROG_CENTER_X, y: 440 }}
      label="rule pipeline · all must pass"
      labelT={0.5}
      labelOffset={0}
      labelSize={13}
      labelWeight={700}
    />

    {/* Rule pipeline → outcome markers (branch) */}
    <Arrow
      debugId="a-rules-to-cpi"
      from={{ x: PROG_CENTER_X + 170, y: 526 }}
      to={{ x: PROG_CENTER_X + 240, y: PROG.ruleCpiCardY }}
      label="pass"
      labelT={0.5}
      labelOffset={-12}
    />
    <Arrow
      debugId="a-rules-to-reject"
      from={{ x: PROG_CENTER_X - 170, y: 526 }}
      to={{ x: PROG_CENTER_X - 240, y: PROG.ruleCpiCardY }}
      label="fail"
      labelT={0.5}
      labelOffset={-12}
    />

    {/* CPI → SPL Token program */}
    <Arrow
      debugId="a-cpi-to-token"
      from={{ x: COL.program.x + COL.program.w, y: PROG.ruleCpiCardY + 28 }}
      to={{ x: COL.token.x, y: TOK_ROW.prog + 28 }}
      label="CPI"
      labelOffset={-16}
    />

    {/* Token program → Destination (start below Token Program card) */}
    <Arrow
      debugId="a-token-to-dest"
      from={{ x: COL.token.x + COL.token.w / 2, y: TOK_ROW.prog + 80 }}
      to={{ x: COL.token.x + COL.token.w / 2, y: TOK_ROW.dest }}
      label="transfer"
      labelOffset={-14}
    />

  </>
);
