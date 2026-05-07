import React from "react";
import {
  Canvas,
  At,
  Card,
  Arrow,
  Title,
  StepBadge,
  SwimLanes,
} from "@allen-saji/diagram-kit";

export type SwimLanesProbeProps = {
  debug?: boolean;
};

const LANE = { sarah: 280, db: 800, alex: 1320 };
const LIFELINE = { top: 230, bottom: 800 };

/**
 * Phase C probe: SwimLanes helper + StepBadge as inline arrow markers.
 * Modeled after BBG's "Optimistic vs Pessimistic Locking" 3-lane diagram.
 */
export const SwimLanesProbe: React.FC<SwimLanesProbeProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={900} debug={debug} theme="light">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="blue" rightSlot="diagram-kit · swim lanes">
            Optimistic Locking
          </Title>
        </div>
      </At>

      <SwimLanes
        lanes={[
          { id: "sarah", title: "Sarah", subtitle: "writer A", color: "pink", x: LANE.sarah },
          { id: "db", title: "Database", subtitle: "row v=1", color: "blue", x: LANE.db },
          { id: "alex", title: "Alex", subtitle: "writer B", color: "mint", x: LANE.alex },
        ]}
        headerY={150}
        lifeline={LIFELINE}
      />

      {/* Step 1: Sarah reads */}
      <At x={LANE.sarah + 30} y={290} anchor="top-left">
        <StepBadge debugId="step-1" n={1} color="pink" size={28} />
      </At>
      <Arrow
        debugId="arrow-1"
        from={{ x: LANE.sarah, y: 320 }}
        to={{ x: LANE.db, y: 320 }}
        label="SELECT row WHERE id=1"
        labelT={0.5}
      />

      {/* Step 2: Alex reads */}
      <At x={LANE.alex - 50} y={400} anchor="top-right">
        <StepBadge debugId="step-2" n={2} color="mint" size={28} />
      </At>
      <Arrow
        debugId="arrow-2"
        from={{ x: LANE.alex, y: 430 }}
        to={{ x: LANE.db, y: 430 }}
        label="SELECT row WHERE id=1"
        labelT={0.5}
      />

      {/* Step 3: Sarah writes with v check */}
      <At x={LANE.sarah + 30} y={520} anchor="top-left">
        <StepBadge debugId="step-3" n={3} color="pink" size={28} />
      </At>
      <Arrow
        debugId="arrow-3"
        from={{ x: LANE.sarah, y: 550 }}
        to={{ x: LANE.db, y: 550 }}
        label="UPDATE ... WHERE v=1 (succeeds)"
        labelT={0.5}
      />

      {/* Step 4: Alex tries to write — fails */}
      <At x={LANE.alex - 50} y={640} anchor="top-right">
        <StepBadge debugId="step-4" n={4} color="mint" size={28} />
      </At>
      <Arrow
        debugId="arrow-4"
        from={{ x: LANE.alex, y: 670 }}
        to={{ x: LANE.db, y: 670 }}
        label="UPDATE ... WHERE v=1 (no rows)"
        labelT={0.5}
      />
      <At x={LANE.db + 30} y={690}>
        <Card
          debugId="conflict"
          color="peach"
          title="Conflict"
          subtitle="retry with v=2"
          padding="8px 14px"
          titleSize={16}
          subtitleSize={12}
        />
      </At>
    </Canvas>
  );
};
