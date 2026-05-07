import React from "react";
import {
  Canvas,
  At,
  Card,
  Arrow,
  Title,
  Label,
  StepBadge,
  CodeBlock,
  TerminalCard,
} from "@allen-saji/diagram-kit";

export type DarkModeProbeProps = {
  debug?: boolean;
};

/**
 * Phase A/B probe: exercises dark theme + StepBadge + CodeBlock + TerminalCard.
 * Modeled after BBG's "Polling vs Webhooks vs SSE" dark poster — single panel
 * showing a 4-step polling sequence with a code snippet and terminal output.
 */
export const DarkModeProbe: React.FC<DarkModeProbeProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={900} debug={debug} theme="dark">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="mint" rightSlot="diagram-kit · dark probe">
            Polling Loop
          </Title>
        </div>
      </At>

      <At x={120} y={170}>
        <Label debugId="probe-section" size={14} weight={700} uppercase tracking={1.2}>
          Client polls server every N seconds for new data
        </Label>
      </At>

      {/* Step row */}
      <At x={140} y={260}>
        <StepBadge debugId="step-1" n={1} color="mint" size={36} />
      </At>
      <At x={200} y={260}>
        <Card
          debugId="card-fetch"
          color="mint"
          title="Client fetch"
          subtitle="setInterval(fetchInbox, 5000)"
          padding="14px 22px"
        />
      </At>

      <At x={140} y={360}>
        <StepBadge debugId="step-2" n={2} color="blue" size={36} />
      </At>
      <At x={200} y={360}>
        <Card
          debugId="card-server"
          color="blue"
          title="GET /inbox"
          subtitle="server returns latest messages"
          padding="14px 22px"
        />
      </At>

      <At x={140} y={460}>
        <StepBadge debugId="step-3" n={3} color="pink" size={36} />
      </At>
      <At x={200} y={460}>
        <Card
          debugId="card-overhead"
          color="pink"
          title="Empty response"
          subtitle="wasted RTT when no new data"
          padding="14px 22px"
        />
      </At>

      <Arrow
        debugId="flow-1-2"
        from={{ x: 158, y: 296 }}
        to={{ x: 158, y: 360 }}
        color="#5BC0FF"
        strokeWidth={2}
      />
      <Arrow
        debugId="flow-2-3"
        from={{ x: 158, y: 396 }}
        to={{ x: 158, y: 460 }}
        color="#FF6BB5"
        strokeWidth={2}
      />

      {/* Code snippet */}
      <At x={780} y={260}>
        <CodeBlock
          debugId="code-poll"
          color="blue"
          lang="ts"
          width={720}
        >{`async function poll() {
  const res = await fetch("/inbox");
  const msgs = await res.json();
  if (msgs.length) render(msgs);
  setTimeout(poll, 5000);
}`}</CodeBlock>
      </At>

      {/* Terminal output */}
      <At x={780} y={500}>
        <TerminalCard
          debugId="term-out"
          title="poll.log"
          width={720}
          height={260}
        >{`[12:00:00] GET /inbox -> 200 (0 msgs)
[12:00:05] GET /inbox -> 200 (0 msgs)
[12:00:10] GET /inbox -> 200 (0 msgs)
[12:00:15] GET /inbox -> 200 (1 msg)
[12:00:20] GET /inbox -> 200 (0 msgs)
[12:00:25] GET /inbox -> 200 (0 msgs)`}</TerminalCard>
      </At>
    </Canvas>
  );
};
