import React from "react";
import {
  Canvas,
  At,
  Panel,
  TreeNode,
  Arrow,
  Annotation,
  Title,
  palette,
  ink,
  fonts,
} from "../kit";

export type BTreeVsBPlusProps = {
  /** Toggle the debug overlay (red bbox outlines + labels). */
  debug?: boolean;
};

/**
 * Fidelity test: top two panels of the ByteByteGo
 * "B-Trees versus LSM Trees" diagram.
 */
export const BTreeVsBPlus: React.FC<BTreeVsBPlusProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={900} debug={debug}>
      {/* Title bar */}
      <At x={60} y={40}>
        <div style={{ width: 1480 }}>
          <Title accentColor="mint" rightSlot="ByteByteGo">
            B-Trees versus LSM Trees
          </Title>
        </div>
      </At>

      {/* Left panel: B-Tree */}
      <At x={60} y={140}>
        <div style={{ width: 720, height: 700, position: "relative" }}>
          <Panel title="B-Tree" padding={28}>
            <BTreePanelInner />
          </Panel>
        </div>
      </At>

      {/* Right panel: B+ Trees */}
      <At x={820} y={140}>
        <div style={{ width: 720, height: 700, position: "relative" }}>
          <Panel title="B+ Trees" padding={28}>
            <BPlusTreePanelInner />
          </Panel>
        </div>
      </At>
    </Canvas>
  );
};

const BTreePanelInner: React.FC = () => {
  const page1 = { x: 310, y: 110 };
  const page2 = { x: 90, y: 310 };
  const page3 = { x: 310, y: 310 };
  const page4 = { x: 530, y: 310 };

  return (
    <div style={{ position: "relative", width: 660, height: 580 }}>
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 15,
          color: ink.body,
          marginBottom: 8,
        }}
      >
        B-Tree storing user IDs: 5, 8, 10, 15, 20, 25, 28, 30, 37, 42, 50, 55
      </div>

      {/* root at top */}
      <At x={page1.x} y={page1.y} anchor="top-center">
        <TreeNode
          color="blue"
          keys="Page 1 (root)"
          subtext="25 | 50"
          width={240}
          keysSize={20}
          subtextSize={22}
        />
      </At>

      {/* leaves */}
      <At x={page2.x} y={page2.y} anchor="top-center">
        <TreeNode
          color="blue"
          keys="Page 2"
          subtext="5, 8, 10, 15, 20"
          width={180}
          keysSize={20}
          subtextSize={17}
        />
      </At>
      <At x={page3.x} y={page3.y} anchor="top-center">
        <TreeNode
          color="peach"
          keys="Page 3"
          subtext="25, 28, 30, 37, 42"
          width={180}
          keysSize={20}
          subtextSize={17}
        />
      </At>
      <At x={page4.x} y={page4.y} anchor="top-center">
        <TreeNode
          color="blue"
          keys="Page 4"
          subtext="50, 55"
          width={180}
          keysSize={20}
          subtextSize={17}
        />
      </At>

      {/* arrows from root to each child */}
      <Arrow
        from={{ x: page1.x - 60, y: page1.y + 80 }}
        to={{ x: page2.x, y: page2.y - 4 }}
        color={ink.arrow}
        strokeWidth={1.8}
      />
      <Arrow
        from={{ x: page1.x, y: page1.y + 80 }}
        to={{ x: page3.x, y: page3.y - 4 }}
        color={ink.arrow}
        strokeWidth={1.8}
      />
      <Arrow
        from={{ x: page1.x + 60, y: page1.y + 80 }}
        to={{ x: page4.x, y: page4.y - 4 }}
        color={ink.arrow}
        strokeWidth={1.8}
      />

      {/* red annotation: reading key 37 */}
      <At x={60} y={170}>
        <Annotation tone="red" size={14}>
          Reading key 37
          <br />
          37 is between 25 and 50
        </Annotation>
      </At>
      {/* small arrow from annotation to root */}
      <Arrow
        from={{ x: 180, y: 180 }}
        to={{ x: page1.x - 90, y: page1.y + 35 }}
        color={palette.peach.border}
        strokeWidth={1.5}
        arrowEnd
      />

      {/* "Found 37 here ✓" */}
      <At x={400} y={250}>
        <Annotation tone="red" size={14}>
          Found 37 here ✓
        </Annotation>
      </At>
      <Arrow
        from={{ x: 470, y: 265 }}
        to={{ x: page3.x + 20, y: page3.y - 4 }}
        color={palette.peach.border}
        strokeWidth={1.5}
      />

      {/* bottom green callout */}
      <At x={0} y={480}>
        <div
          style={{
            background: palette.mint.bg,
            border: `2px solid ${palette.mint.border}`,
            borderRadius: 14,
            padding: "14px 20px",
            textAlign: "center",
            width: 660,
            color: palette.mint.text,
            fontFamily: fonts.sans,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            2 pages read from disk
          </div>
          <div style={{ fontSize: 15, fontWeight: 500, marginTop: 4 }}>
            Root → Page 3. Even with millions of keys, only 3–4 levels deep.
          </div>
        </div>
      </At>
    </div>
  );
};

const BPlusTreePanelInner: React.FC = () => {
  // 3 levels: root (25 | 50), internal (10|20, 30|40, 55|70), leaves.
  // Content width is 660 — keep all x positions + widths within that.
  const root = { x: 330, y: 70 };
  const mid = [
    { x: 110, y: 220 }, // 10|20
    { x: 330, y: 220 }, // 30|40
    { x: 550, y: 220 }, // 55|70
  ];
  // 5 leaves spaced to fit inside 660px
  const leaves = [
    { x: 8, y: 380, keys: "5, 8", sub: "val, val" },
    { x: 138, y: 380, keys: "10, 15, 20", sub: "val, val, val" },
    { x: 268, y: 380, keys: "25, 28", sub: "val, val" },
    { x: 398, y: 380, keys: "30, 37, 42", sub: "val, val, val" },
    { x: 530, y: 380, keys: "50, 55", sub: "val, val" },
  ];
  const leafWidth = 120;

  return (
    <div style={{ position: "relative", width: 660, height: 540 }}>
      {/* Caption across top, out of arrow path */}
      <At x={330} y={-2} anchor="top-center">
        <div
          style={{
            fontSize: 13,
            color: ink.muted,
            fontFamily: fonts.sans,
            fontStyle: "italic",
          }}
        >
          internal nodes hold keys only; values live at the leaves
        </div>
      </At>

      <At x={root.x} y={root.y} anchor="top-center">
        <TreeNode
          debugId="bplus-root"
          color="blue"
          keys="25 | 50"
          width={140}
          keysSize={24}
          padding="10px 14px"
        />
      </At>

      {mid.map((p, i) => (
        <At key={i} x={p.x} y={p.y} anchor="top-center">
          <TreeNode
            debugId={`bplus-mid-${i}`}
            color="blue"
            keys={["10 | 20", "30 | 40", "55 | 70"][i]}
            width={130}
            keysSize={22}
            padding="10px 14px"
          />
        </At>
      ))}

      {leaves.map((l, i) => (
        <At key={i} x={l.x} y={l.y} anchor="top-left">
          <TreeNode
            debugId={`bplus-leaf-${i}`}
            color="blue"
            keys={l.keys}
            subtext={l.sub}
            width={leafWidth}
            keysSize={15}
            subtextSize={12}
            padding="6px 10px"
          />
        </At>
      ))}

      {/* root -> mid arrows */}
      <Arrow
        from={{ x: root.x - 40, y: root.y + 52 }}
        to={{ x: mid[0].x, y: mid[0].y - 4 }}
        strokeWidth={1.8}
      />
      <Arrow
        from={{ x: root.x, y: root.y + 52 }}
        to={{ x: mid[1].x, y: mid[1].y - 4 }}
        strokeWidth={1.8}
      />
      <Arrow
        from={{ x: root.x + 40, y: root.y + 52 }}
        to={{ x: mid[2].x, y: mid[2].y - 4 }}
        strokeWidth={1.8}
      />

      {/* mid -> leaves: each mid points to its two adjacent leaves */}
      <Arrow
        from={{ x: mid[0].x - 30, y: mid[0].y + 52 }}
        to={{ x: leaves[0].x + leafWidth / 2, y: leaves[0].y - 4 }}
        strokeWidth={1.8}
      />
      <Arrow
        from={{ x: mid[0].x + 30, y: mid[0].y + 52 }}
        to={{ x: leaves[1].x + leafWidth / 2, y: leaves[1].y - 4 }}
        strokeWidth={1.8}
      />
      <Arrow
        from={{ x: mid[1].x - 30, y: mid[1].y + 52 }}
        to={{ x: leaves[2].x + leafWidth / 2, y: leaves[2].y - 4 }}
        strokeWidth={1.8}
      />
      <Arrow
        from={{ x: mid[1].x + 30, y: mid[1].y + 52 }}
        to={{ x: leaves[3].x + leafWidth / 2, y: leaves[3].y - 4 }}
        strokeWidth={1.8}
      />
      <Arrow
        from={{ x: mid[2].x, y: mid[2].y + 52 }}
        to={{ x: leaves[4].x + leafWidth / 2, y: leaves[4].y - 4 }}
        strokeWidth={1.8}
      />

      {/* leaf-level linked-list arrows */}
      {[0, 1, 2, 3].map((i) => (
        <Arrow
          key={i}
          from={{ x: leaves[i].x + leafWidth - 5, y: leaves[i].y + 30 }}
          to={{ x: leaves[i + 1].x + 2, y: leaves[i + 1].y + 30 }}
          strokeWidth={1.4}
          headSize={7}
          color={ink.arrow}
        />
      ))}
    </div>
  );
};
