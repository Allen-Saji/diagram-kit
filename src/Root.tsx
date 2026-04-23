import "./index.css";
import { Still, Folder } from "remotion";
import { BTreeVsBPlus } from "./compositions/BTreeVsBPlus";

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
    </>
  );
};
