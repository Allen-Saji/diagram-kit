import "./index.css";
import React from "react";
import { Composition, Still, Folder } from "remotion";
import { BTreeVsBPlus } from "./examples/fidelity/BTreeVsBPlus";
import { LsmTrees } from "./examples/fidelity/LsmTrees";
import { LsmCompaction } from "./examples/fidelity/LsmCompaction";
import { DarkModeProbe } from "./examples/fidelity/DarkModeProbe";
import { StepBadgeProbe } from "./examples/fidelity/StepBadgeProbe";
import { SwimLanesProbe } from "./examples/fidelity/SwimLanesProbe";
// Aliased to either ../../../private/index.tsx (when present) or
// ./private-stub.ts (the empty default). Resolved by remotion.config.ts.
import { privateRegistrations } from "@private/comps";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="fidelity">
        <Still
          id="BTreeVsBPlus"
          component={BTreeVsBPlus}
          width={1600}
          height={900}
        />
        <Still id="LsmTrees" component={LsmTrees} width={1600} height={780} />
        <Still
          id="LsmCompaction"
          component={LsmCompaction}
          width={1600}
          height={820}
        />
        <Still
          id="DarkModeProbe"
          component={DarkModeProbe}
          width={1600}
          height={900}
        />
        <Still
          id="StepBadgeProbe"
          component={StepBadgeProbe}
          width={1600}
          height={780}
        />
        <Still
          id="SwimLanesProbe"
          component={SwimLanesProbe}
          width={1600}
          height={900}
        />
      </Folder>
      <Folder name="debug">
        <Still
          id="BTreeVsBPlusDebug"
          component={BTreeVsBPlus}
          width={1600}
          height={900}
          defaultProps={{ debug: true }}
        />
        <Still
          id="LsmTreesDebug"
          component={LsmTrees}
          width={1600}
          height={780}
          defaultProps={{ debug: true }}
        />
        <Still
          id="LsmCompactionDebug"
          component={LsmCompaction}
          width={1600}
          height={820}
          defaultProps={{ debug: true }}
        />
        <Still
          id="DarkModeProbeDebug"
          component={DarkModeProbe}
          width={1600}
          height={900}
          defaultProps={{ debug: true }}
        />
        <Still
          id="StepBadgeProbeDebug"
          component={StepBadgeProbe}
          width={1600}
          height={780}
          defaultProps={{ debug: true }}
        />
        <Still
          id="SwimLanesProbeDebug"
          component={SwimLanesProbe}
          width={1600}
          height={900}
          defaultProps={{ debug: true }}
        />
      </Folder>
      {privateRegistrations.map((entry) => (
        <Folder key={entry.folder} name={entry.folder}>
          {entry.registrations}
        </Folder>
      ))}
    </>
  );
};
