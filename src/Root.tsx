import "./index.css";
import { Still, Folder } from "remotion";
import { BTreeVsBPlus } from "./compositions/BTreeVsBPlus";
import { Px402Static } from "./compositions/Px402Static";

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
      </Folder>
    </>
  );
};
