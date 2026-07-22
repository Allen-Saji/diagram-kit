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
import { RadialMindMapProbe } from "./examples/fidelity/RadialMindMapProbe";
import { ShapesAndRatingsProbe } from "./examples/fidelity/ShapesAndRatingsProbe";
import { GlyphProbe } from "./examples/fidelity/GlyphProbe";
import { PagePrimitivesProbe } from "./examples/fidelity/PagePrimitivesProbe";
import { SketchThemeProbe } from "./examples/fidelity/SketchThemeProbe";
import { BrandIconProbe } from "./examples/fidelity/BrandIconProbe";
import { ListiclePosterExample } from "./examples/pages/ListiclePosterExample";
import { ProductOnePagerExample } from "./examples/pages/ProductOnePagerExample";
import { ComparisonColumnsExample } from "./examples/pages/ComparisonColumnsExample";
import { BandStackPageExample } from "./examples/pages/BandStackPageExample";
import { DiagramKitArchitecture } from "./examples/DiagramKitArchitecture";
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
        <Still
          id="RadialMindMapProbe"
          component={RadialMindMapProbe}
          width={1600}
          height={900}
        />
        <Still
          id="ShapesAndRatingsProbe"
          component={ShapesAndRatingsProbe}
          width={1600}
          height={780}
        />
        <Still
          id="GlyphProbe"
          component={GlyphProbe}
          width={1600}
          height={1920}
        />
        <Still
          id="PagePrimitivesProbe"
          component={PagePrimitivesProbe}
          width={1600}
          height={1240}
        />
        <Still
          id="SketchThemeProbe"
          component={SketchThemeProbe}
          width={1600}
          height={860}
        />
        <Still
          id="BrandIconProbe"
          component={BrandIconProbe}
          width={1600}
          height={620}
        />
      </Folder>
      <Folder name="architecture">
        <Still
          id="DiagramKitArchitecture"
          component={DiagramKitArchitecture}
          width={1600}
          height={900}
        />
      </Folder>
      <Folder name="pages">
        <Still
          id="ListiclePosterExample"
          component={ListiclePosterExample}
          width={1600}
          height={1560}
        />
        <Still
          id="ProductOnePagerExample"
          component={ProductOnePagerExample}
          width={1600}
          height={1400}
        />
        <Still
          id="ComparisonColumnsExample"
          component={ComparisonColumnsExample}
          width={1600}
          height={1150}
        />
        <Still
          id="BandStackPageExample"
          component={BandStackPageExample}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="debug">
        <Still
          id="DiagramKitArchitectureDebug"
          component={DiagramKitArchitecture}
          width={1600}
          height={900}
          defaultProps={{ debug: true }}
        />
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
        <Still
          id="RadialMindMapProbeDebug"
          component={RadialMindMapProbe}
          width={1600}
          height={900}
          defaultProps={{ debug: true }}
        />
        <Still
          id="ShapesAndRatingsProbeDebug"
          component={ShapesAndRatingsProbe}
          width={1600}
          height={780}
          defaultProps={{ debug: true }}
        />
        <Still
          id="GlyphProbeDebug"
          component={GlyphProbe}
          width={1600}
          height={1920}
          defaultProps={{ debug: true }}
        />
        <Still
          id="PagePrimitivesProbeDebug"
          component={PagePrimitivesProbe}
          width={1600}
          height={1240}
          defaultProps={{ debug: true }}
        />
        <Still
          id="SketchThemeProbeDebug"
          component={SketchThemeProbe}
          width={1600}
          height={860}
          defaultProps={{ debug: true }}
        />
        <Still
          id="BrandIconProbeDebug"
          component={BrandIconProbe}
          width={1600}
          height={620}
          defaultProps={{ debug: true }}
        />
        <Still
          id="ListiclePosterExampleDebug"
          component={ListiclePosterExample}
          width={1600}
          height={1560}
          defaultProps={{ debug: true }}
        />
        <Still
          id="ProductOnePagerExampleDebug"
          component={ProductOnePagerExample}
          width={1600}
          height={1400}
          defaultProps={{ debug: true }}
        />
        <Still
          id="ComparisonColumnsExampleDebug"
          component={ComparisonColumnsExample}
          width={1600}
          height={1150}
          defaultProps={{ debug: true }}
        />
        <Still
          id="BandStackPageExampleDebug"
          component={BandStackPageExample}
          width={1920}
          height={1080}
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
