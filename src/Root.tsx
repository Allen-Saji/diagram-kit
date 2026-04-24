import "./index.css";
import { Composition, Still, Folder } from "remotion";
import { BTreeVsBPlus } from "./compositions/fidelity/BTreeVsBPlus";
import { LsmTrees } from "./compositions/fidelity/LsmTrees";
import { LsmCompaction } from "./compositions/fidelity/LsmCompaction";
import { Px402Static } from "./compositions/projects/Px402Static";
import { Px402Animated } from "./compositions/projects/Px402Animated";
import { DiagramKitArch } from "./compositions/projects/DiagramKitArch";
import { DiagramKitArchAnimated } from "./compositions/projects/DiagramKitArchAnimated";
import { PortProtocolArch } from "./compositions/projects/PortProtocolArch";

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
        <Still
          id="LsmTrees"
          component={LsmTrees}
          width={1600}
          height={780}
        />
        <Still
          id="LsmCompaction"
          component={LsmCompaction}
          width={1600}
          height={820}
        />
      </Folder>
      <Folder name="px402">
        <Still
          id="Px402Static"
          component={Px402Static}
          width={1600}
          height={1000}
        />
        <Composition
          id="Px402Animated"
          component={Px402Animated}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={15 * 30}
        />
      </Folder>
      <Folder name="diagram-kit">
        <Still
          id="DiagramKitArch"
          component={DiagramKitArch}
          width={1600}
          height={1000}
        />
        <Composition
          id="DiagramKitArchAnimated"
          component={DiagramKitArchAnimated}
          width={1600}
          height={1000}
          fps={30}
          durationInFrames={15 * 30}
        />
      </Folder>
      <Folder name="port-protocol">
        <Still
          id="PortProtocolArch"
          component={PortProtocolArch}
          width={1600}
          height={1000}
        />
      </Folder>
      <Folder name="debug">
        <Still
          id="Px402StaticDebug"
          component={Px402Static}
          width={1600}
          height={1000}
          defaultProps={{ debug: true }}
        />
        <Still
          id="Px402AnimatedDebug"
          component={Px402Animated}
          width={1920}
          height={1080}
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
          id="DiagramKitArchDebug"
          component={DiagramKitArch}
          width={1600}
          height={1000}
          defaultProps={{ debug: true }}
        />
        <Still
          id="PortProtocolArchDebug"
          component={PortProtocolArch}
          width={1600}
          height={1000}
          defaultProps={{ debug: true }}
        />
      </Folder>
    </>
  );
};
