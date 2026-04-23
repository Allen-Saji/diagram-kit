import "./index.css";
import { Composition, Still, Folder } from "remotion";
import { BTreeVsBPlus } from "./compositions/BTreeVsBPlus";
import { LsmTrees } from "./compositions/LsmTrees";
import { LsmCompaction } from "./compositions/LsmCompaction";
import { Px402Static } from "./compositions/Px402Static";
import { Px402Animated } from "./compositions/Px402Animated";

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
          width={1600}
          height={1000}
          fps={30}
          durationInFrames={15 * 30}
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
      </Folder>
    </>
  );
};
