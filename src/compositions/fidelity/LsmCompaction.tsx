import React from "react";
import {
  Canvas,
  At,
  Panel,
  FlowBox,
  Arrow,
  Title,
  palette,
  ink,
  fonts,
} from "../../kit";

export type LsmCompactionProps = {
  debug?: boolean;
};

/**
 * LSM Tree Compaction Strategies panel — size-tiered vs leveled, side by side,
 * with the trade-off callouts at the bottom.
 */
export const LsmCompaction: React.FC<LsmCompactionProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={820} debug={debug}>
      <At x={60} y={40}>
        <div style={{ width: 1480 }}>
          <Title accentColor="mint" rightSlot="LSM Compaction">
            Size-Tiered vs Leveled Compaction
          </Title>
        </div>
      </At>
      <At x={120} y={106}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 17,
            color: ink.muted,
            fontWeight: 500,
          }}
        >
          Two strategies, two trade-offs: write throughput vs read amplification.
        </div>
      </At>

      <At x={60} y={160}>
        <div style={{ width: 1480, position: "relative" }}>
          <Panel title="LSM Tree Compaction Strategies" padding={28}>
            <div
              style={{
                position: "relative",
                width: 1420,
                height: 600,
                display: "flex",
              }}
            >
              <SizeTieredColumn />
              {/* vertical separator */}
              <div
                style={{
                  position: "absolute",
                  left: 710,
                  top: 10,
                  bottom: 10,
                  borderLeft: `1px dashed ${ink.muted}`,
                  opacity: 0.6,
                }}
              />
              <LeveledColumn />
            </div>
          </Panel>
        </div>
      </At>
    </Canvas>
  );
};

const BOX_W = 100;
const BOX_H = 48;

// ------ Size-tiered ------
const SizeTieredColumn: React.FC = () => {
  // row 1: 4 × 4MB
  const row1Y = 90;
  const row1Xs = [60, 190, 320, 450];

  return (
    <div
      style={{ position: "absolute", left: 0, top: 0, width: 700, height: 600 }}
    >
      <At x={10} y={0}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 22,
            fontWeight: 700,
            color: ink.heading,
          }}
        >
          Size-tiered compaction
        </div>
      </At>
      <At x={10} y={32}>
        <div
          style={{ fontFamily: fonts.sans, fontSize: 14, color: ink.muted }}
        >
          Merge files of similar size together
        </div>
      </At>
      <At x={10} y={60}>
        <div
          style={{
            fontFamily: fonts.sansItalic,
            fontSize: 13,
            color: ink.muted,
            fontStyle: "italic",
          }}
        >
          SSTables accumulate at similar sizes
        </div>
      </At>

      {row1Xs.map((x, i) => (
        <At key={i} x={x} y={row1Y}>
          <FlowBox
            debugId={`st-4mb-${i}`}
            color="mint"
            title="4 MB"
            width={BOX_W}
            height={BOX_H}
            titleSize={18}
          />
        </At>
      ))}
      {/* merge label */}
      <At x={10} y={145}>
        <div
          style={{
            fontFamily: fonts.sansItalic,
            fontSize: 13,
            color: palette.mint.text,
            fontStyle: "italic",
          }}
        >
          merge
        </div>
      </At>
      {/* 4 arrows converging to the 16MB box */}
      {row1Xs.map((x, i) => (
        <Arrow
          key={i}
          from={{ x: x + BOX_W / 2, y: row1Y + BOX_H + 4 }}
          to={{ x: 290, y: 190 }}
          strokeWidth={1.6}
          headSize={8}
          color={palette.mint.border}
        />
      ))}

      {/* 16 MB */}
      <At x={230} y={195}>
        <FlowBox
          debugId="st-16mb-merged"
          color="mint"
          title="16 MB"
          width={130}
          height={56}
          titleSize={20}
        />
      </At>

      <At x={10} y={270}>
        <div
          style={{
            fontFamily: fonts.sansItalic,
            fontSize: 13,
            color: ink.muted,
            fontStyle: "italic",
          }}
        >
          Those merge when enough accumulate
        </div>
      </At>

      {/* Row 2: 2 × 16MB */}
      <At x={150} y={300}>
        <FlowBox
          debugId="st-16mb-a"
          color="mint"
          title="16 MB"
          width={130}
          height={56}
          titleSize={20}
        />
      </At>
      <At x={400} y={300}>
        <FlowBox
          debugId="st-16mb-b"
          color="mint"
          title="16 MB"
          width={130}
          height={56}
          titleSize={20}
        />
      </At>

      <At x={290} y={365}>
        <div
          style={{
            fontFamily: fonts.sansItalic,
            fontSize: 13,
            color: palette.mint.text,
            fontStyle: "italic",
          }}
        >
          merge
        </div>
      </At>
      <Arrow
        from={{ x: 215, y: 362 }}
        to={{ x: 320, y: 408 }}
        strokeWidth={1.6}
        color={palette.mint.border}
      />
      <Arrow
        from={{ x: 465, y: 362 }}
        to={{ x: 360, y: 408 }}
        strokeWidth={1.6}
        color={palette.mint.border}
      />

      {/* 32 MB */}
      <At x={250} y={410}>
        <FlowBox
          debugId="st-32mb"
          color="blue"
          title="32 MB"
          width={150}
          height={60}
          titleSize={22}
        />
      </At>

      {/* Green callout */}
      <At x={10} y={510}>
        <div
          style={{
            background: palette.mint.bg,
            border: `2px solid ${palette.mint.border}`,
            borderRadius: 12,
            padding: "14px 20px",
            width: 680,
            color: palette.mint.text,
            fontFamily: fonts.sans,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            Favors write throughput
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>
            Less frequent merges, but uses more disk space
          </div>
        </div>
      </At>
    </div>
  );
};

// ------ Leveled ------
const LeveledColumn: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: 730,
        top: 0,
        width: 680,
        height: 600,
      }}
    >
      <At x={10} y={0}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 22,
            fontWeight: 700,
            color: ink.heading,
          }}
        >
          Leveled compaction
        </div>
      </At>
      <At x={10} y={32}>
        <div
          style={{ fontFamily: fonts.sans, fontSize: 14, color: ink.muted }}
        >
          Organize files into levels with size limits
        </div>
      </At>

      {/* Level 0 */}
      <At x={10} y={64}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            color: ink.body,
            fontWeight: 600,
          }}
        >
          Level 0 <span style={{ color: ink.muted, fontWeight: 400 }}>(newest, smallest)</span>
        </div>
      </At>
      <At x={120} y={88}>
        <FlowBox
          debugId="lv-l0-a"
          color="mint"
          title="4 MB"
          width={BOX_W}
          height={BOX_H}
          titleSize={18}
        />
      </At>
      <At x={240} y={88}>
        <FlowBox
          debugId="lv-l0-b"
          color="mint"
          title="4 MB"
          width={BOX_W}
          height={BOX_H}
          titleSize={18}
        />
      </At>
      <At x={360} y={100}>
        <div
          style={{
            fontFamily: fonts.sansItalic,
            fontSize: 12,
            color: palette.mint.border,
            fontStyle: "italic",
          }}
        >
          limit 8 MB
        </div>
      </At>

      <At x={140} y={148}>
        <div
          style={{
            fontFamily: fonts.sansItalic,
            fontSize: 12,
            color: ink.muted,
            fontStyle: "italic",
          }}
        >
          merge down
        </div>
      </At>
      <Arrow
        from={{ x: 170, y: 140 }}
        to={{ x: 250, y: 180 }}
        strokeWidth={1.6}
        color={palette.mint.border}
      />
      <Arrow
        from={{ x: 290, y: 140 }}
        to={{ x: 250, y: 180 }}
        strokeWidth={1.6}
        color={palette.mint.border}
      />

      {/* Level 1 */}
      <At x={10} y={170}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            color: ink.body,
            fontWeight: 600,
          }}
        >
          Level 1
        </div>
      </At>
      <At x={180} y={185}>
        <FlowBox
          debugId="lv-l1"
          color="mint"
          title="40 MB"
          width={150}
          height={BOX_H}
          titleSize={20}
        />
      </At>
      <At x={360} y={198}>
        <div
          style={{
            fontFamily: fonts.sansItalic,
            fontSize: 12,
            color: palette.mint.border,
            fontStyle: "italic",
          }}
        >
          limit 80 MB
        </div>
      </At>

      <At x={140} y={250}>
        <div
          style={{
            fontFamily: fonts.sansItalic,
            fontSize: 12,
            color: ink.muted,
            fontStyle: "italic",
          }}
        >
          merge down
        </div>
      </At>
      <Arrow
        from={{ x: 255, y: 240 }}
        to={{ x: 255, y: 280 }}
        strokeWidth={1.6}
        color={palette.mint.border}
      />

      {/* Level 2 */}
      <At x={10} y={270}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            color: ink.body,
            fontWeight: 600,
          }}
        >
          Level 2
        </div>
      </At>
      <At x={180} y={285}>
        <FlowBox
          debugId="lv-l2"
          color="blue"
          title="400 MB"
          width={150}
          height={52}
          titleSize={22}
        />
      </At>
      <At x={360} y={300}>
        <div
          style={{
            fontFamily: fonts.sansItalic,
            fontSize: 12,
            color: palette.blue.border,
            fontStyle: "italic",
          }}
        >
          limit 800 MB
        </div>
      </At>

      <Arrow
        from={{ x: 255, y: 342 }}
        to={{ x: 255, y: 382 }}
        strokeWidth={1.6}
        color={palette.blue.border}
      />

      {/* Level 3 */}
      <At x={10} y={370}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            color: ink.body,
            fontWeight: 600,
          }}
        >
          Level 3
        </div>
      </At>
      <At x={180} y={385}>
        <FlowBox
          debugId="lv-l3"
          color="blue"
          title="4000 MB"
          width={150}
          height={56}
          titleSize={22}
        />
      </At>

      <At x={10} y={450}>
        <div
          style={{
            fontFamily: fonts.sansItalic,
            fontSize: 13,
            color: ink.muted,
            fontStyle: "italic",
          }}
        >
          Each level is ~10x the previous
        </div>
      </At>

      {/* Green callout */}
      <At x={10} y={510}>
        <div
          style={{
            background: palette.mint.bg,
            border: `2px solid ${palette.mint.border}`,
            borderRadius: 12,
            padding: "14px 20px",
            width: 650,
            color: palette.mint.text,
            fontFamily: fonts.sans,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700 }}>
            Favors read performance
          </div>
          <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>
            More organized, but more rewrites (higher write amp)
          </div>
        </div>
      </At>
    </div>
  );
};
