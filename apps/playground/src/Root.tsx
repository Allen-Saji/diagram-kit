import "./index.css";
import React from "react";
import { Still, Folder } from "remotion";
import { BTreeVsBPlus } from "./examples/fidelity/BTreeVsBPlus";
import { LsmTrees } from "./examples/fidelity/LsmTrees";
import { LsmCompaction } from "./examples/fidelity/LsmCompaction";
import { DarkModeProbe } from "./examples/fidelity/DarkModeProbe";
import { StepBadgeProbe } from "./examples/fidelity/StepBadgeProbe";
import { SwimLanesProbe } from "./examples/fidelity/SwimLanesProbe";
import { PanelVariantsProbe } from "./examples/fidelity/PanelVariantsProbe";
import { SubPanelGridProbe } from "./examples/fidelity/SubPanelGridProbe";
import { BeforeAfterSplitProbe } from "./examples/fidelity/BeforeAfterSplitProbe";
import { ComparisonTableProbe } from "./examples/fidelity/ComparisonTableProbe";
import { FanArrowProbe } from "./examples/fidelity/FanArrowProbe";
import { ChipsAndIconsProbe } from "./examples/fidelity/ChipsAndIconsProbe";
import { PersonaProbe } from "./examples/fidelity/PersonaProbe";
import { ErDiagramProbe } from "./examples/fidelity/ErDiagramProbe";
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
        <Still
          id="PanelVariantsProbe"
          component={PanelVariantsProbe}
          width={1600}
          height={780}
        />
        <Still
          id="SubPanelGridProbe"
          component={SubPanelGridProbe}
          width={1600}
          height={780}
        />
        <Still
          id="BeforeAfterSplitProbe"
          component={BeforeAfterSplitProbe}
          width={1600}
          height={900}
        />
        <Still
          id="ComparisonTableProbe"
          component={ComparisonTableProbe}
          width={1600}
          height={760}
        />
        <Still
          id="FanArrowProbe"
          component={FanArrowProbe}
          width={1600}
          height={780}
        />
        <Still
          id="ChipsAndIconsProbe"
          component={ChipsAndIconsProbe}
          width={1600}
          height={760}
        />
        <Still
          id="PersonaProbe"
          component={PersonaProbe}
          width={1600}
          height={780}
        />
        <Still
          id="ErDiagramProbe"
          component={ErDiagramProbe}
          width={1600}
          height={780}
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
        <Still
          id="PanelVariantsProbeDebug"
          component={PanelVariantsProbe}
          width={1600}
          height={780}
          defaultProps={{ debug: true }}
        />
        <Still
          id="SubPanelGridProbeDebug"
          component={SubPanelGridProbe}
          width={1600}
          height={780}
          defaultProps={{ debug: true }}
        />
        <Still
          id="BeforeAfterSplitProbeDebug"
          component={BeforeAfterSplitProbe}
          width={1600}
          height={900}
          defaultProps={{ debug: true }}
        />
        <Still
          id="ComparisonTableProbeDebug"
          component={ComparisonTableProbe}
          width={1600}
          height={760}
          defaultProps={{ debug: true }}
        />
        <Still
          id="FanArrowProbeDebug"
          component={FanArrowProbe}
          width={1600}
          height={780}
          defaultProps={{ debug: true }}
        />
        <Still
          id="ChipsAndIconsProbeDebug"
          component={ChipsAndIconsProbe}
          width={1600}
          height={760}
          defaultProps={{ debug: true }}
        />
        <Still
          id="PersonaProbeDebug"
          component={PersonaProbe}
          width={1600}
          height={780}
          defaultProps={{ debug: true }}
        />
        <Still
          id="ErDiagramProbeDebug"
          component={ErDiagramProbe}
          width={1600}
          height={780}
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
