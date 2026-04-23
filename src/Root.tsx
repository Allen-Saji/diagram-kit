import "./index.css";
import { Composition, Still, Folder } from "remotion";
import { BTreeVsBPlus } from "./compositions/BTreeVsBPlus";
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
    </>
  );
};
