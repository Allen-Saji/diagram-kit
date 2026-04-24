import React from "react";
import {
  Canvas,
  At,
  Panel,
  FlowBox,
  Card,
  Arrow,
  Title,
  palette,
  ink,
  fonts,
} from "../kit";

export type LsmTreesProps = {
  debug?: boolean;
};

/**
 * LSM Trees panel from the ByteByteGo "B-Trees versus LSM Trees" reference.
 *
 * One outer panel with two sub-paths inside:
 *   Write path (left)  — Write → WAL → Memtable → flush → SSTables → Compaction
 *   Read  path (right) — Read key 350 → Memtable miss → Bloom filters → SSTable 1,2
 */
export const LsmTrees: React.FC<LsmTreesProps> = ({ debug = false }) => {
  return (
    <Canvas w={1600} h={780} debug={debug}>
      <At x={60} y={40}>
        <div style={{ width: 1480 }}>
          <Title accentColor="yellow" rightSlot="LSM Trees">
            Log-Structured Merge Trees
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
          Writes stay in memory; reads walk multiple files. Bloom filters save
          the day.
        </div>
      </At>

      <At x={60} y={160}>
        <div style={{ width: 1480, position: "relative" }}>
          <Panel title="LSM Trees" padding={28}>
            <div
              style={{
                position: "relative",
                width: 1420,
                height: 560,
                display: "flex",
              }}
            >
              <WritePath />
              {/* vertical separator */}
              <div
                style={{
                  position: "absolute",
                  left: 720,
                  top: 10,
                  bottom: 10,
                  width: 1,
                  borderLeft: `1px dashed ${ink.muted}`,
                  opacity: 0.6,
                }}
              />
              <ReadPath />
            </div>
          </Panel>
        </div>
      </At>
    </Canvas>
  );
};

// ------ Write path ------
const WritePath: React.FC = () => {
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 700, height: 560 }}>
      <At x={10} y={0}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 20,
            fontWeight: 700,
            color: ink.heading,
          }}
        >
          Write path
        </div>
      </At>
      <At x={10} y={30}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            color: ink.muted,
          }}
        >
          Fast because writes hit memory first, not disk
        </div>
      </At>

      {/* Memory row: Write → WAL → Memtable */}
      <At x={20} y={90}>
        <FlowBox
          debugId="write-entry"
          color="peach"
          title="Write"
          width={100}
          height={64}
          titleSize={20}
        />
      </At>
      <At x={180} y={90}>
        <FlowBox
          debugId="write-wal"
          color="yellow"
          title="WAL"
          subtitle="Crash safety"
          width={140}
          height={64}
          titleSize={20}
          subtitleSize={13}
        />
      </At>
      <At x={380} y={90}>
        <FlowBox
          debugId="write-memtable"
          color="blue"
          title="Memtable"
          subtitle="Sorted, in memory"
          width={180}
          height={64}
          titleSize={20}
          subtitleSize={13}
        />
      </At>
      <At x={600} y={112}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            fontWeight: 700,
            color: ink.muted,
            letterSpacing: 1,
          }}
        >
          MEMORY
        </div>
      </At>

      <Arrow
        from={{ x: 120, y: 122 }}
        to={{ x: 178, y: 122 }}
        strokeWidth={1.8}
      />
      <Arrow
        from={{ x: 320, y: 122 }}
        to={{ x: 378, y: 122 }}
        strokeWidth={1.8}
      />

      {/* Disk boundary label */}
      <At x={260} y={170}>
        <div
          style={{
            fontFamily: fonts.sansItalic,
            fontSize: 13,
            color: ink.muted,
            fontStyle: "italic",
          }}
        >
          Flush when full
        </div>
      </At>
      <At x={600} y={170}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            fontWeight: 700,
            color: ink.muted,
            letterSpacing: 1,
          }}
        >
          DISK
        </div>
      </At>
      {/* dashed separator between memory and disk */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 190,
          width: 700,
          borderTop: `1px dashed ${ink.muted}`,
          opacity: 0.5,
        }}
      />
      <Arrow
        from={{ x: 470, y: 158 }}
        to={{ x: 470, y: 218 }}
        strokeWidth={1.8}
      />

      {/* SSTable row 1-4 */}
      {[
        { id: "sst1", title: "SSTable 1", sub: "keys 1-500", x: 20 },
        { id: "sst2", title: "SSTable 2", sub: "keys 200-800", x: 195 },
        { id: "sst3", title: "SSTable 3", sub: "keys 600-1200", x: 370 },
        { id: "sst4", title: "SSTable 4", sub: "keys 1000-1500", x: 545 },
      ].map((s) => (
        <At key={s.id} x={s.x} y={220}>
          <FlowBox
            debugId={`write-${s.id}`}
            color="mint"
            title={s.title}
            subtitle={s.sub}
            width={160}
            height={70}
            titleSize={18}
            subtitleSize={12}
          />
        </At>
      ))}

      <At x={10} y={306}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            color: ink.muted,
            fontStyle: "italic",
          }}
        >
          Sorted, immutable files accumulate on disk over time
        </div>
      </At>

      <Arrow
        from={{ x: 350, y: 330 }}
        to={{ x: 350, y: 370 }}
        strokeWidth={1.8}
      />

      <At x={200} y={375}>
        <FlowBox
          debugId="write-compaction"
          color="mint"
          title="Compaction"
          subtitle="Merge, deduplicate, rewrite"
          width={300}
          height={68}
          titleSize={20}
          subtitleSize={13}
        />
      </At>
      <At x={210} y={455}>
        <div
          style={{
            fontFamily: fonts.sansItalic,
            fontSize: 13,
            color: palette.mint.text,
            fontStyle: "italic",
          }}
        >
          Uses CPU + disk I/O
        </div>
      </At>
    </div>
  );
};

// ------ Read path ------
const ReadPath: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: 740,
        top: 0,
        width: 680,
        height: 560,
      }}
    >
      <At x={10} y={0}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 20,
            fontWeight: 700,
            color: ink.heading,
          }}
        >
          Read path
        </div>
      </At>
      <At x={10} y={30}>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            color: ink.muted,
          }}
        >
          Slower because multiple SSTables may need checking
        </div>
      </At>

      {/* Read key 350 → Memtable Not found */}
      <At x={20} y={90}>
        <FlowBox
          debugId="read-entry"
          color="purple"
          title="Read"
          subtitle="key 350"
          width={130}
          height={68}
          titleSize={20}
          subtitleSize={13}
        />
      </At>
      <At x={210} y={90}>
        <FlowBox
          debugId="read-memtable"
          color="blue"
          title="Memtable"
          subtitle="Not found"
          width={170}
          height={68}
          titleSize={20}
          subtitleSize={13}
        />
      </At>
      <Arrow
        from={{ x: 152, y: 124 }}
        to={{ x: 208, y: 124 }}
        strokeWidth={1.8}
      />

      {/* Flow down to Bloom filters */}
      <Arrow
        from={{ x: 295, y: 160 }}
        to={{ x: 295, y: 220 }}
        strokeWidth={1.8}
      />

      <At x={180} y={222}>
        <FlowBox
          debugId="read-bloom"
          color="pink"
          title="Bloom filters"
          subtitle="Skip SSTable 3, 4"
          width={240}
          height={68}
          titleSize={20}
          subtitleSize={13}
        />
      </At>

      {/* Elbow arrow: left from bloom filters, then down into SSTable 1,2 */}
      <Arrow
        from={{ x: 180, y: 256 }}
        waypoints={[{ x: 115, y: 256 }]}
        to={{ x: 115, y: 318 }}
        strokeWidth={1.8}
      />

      <At x={10} y={320}>
        <FlowBox
          debugId="read-sst12"
          color="mint"
          title="SSTable 1, 2"
          subtitle="Check remaining files"
          width={210}
          height={68}
          titleSize={18}
          subtitleSize={13}
        />
      </At>

      <At x={10} y={420}>
        <div
          style={{
            fontFamily: fonts.sansItalic,
            fontSize: 13,
            color: ink.muted,
            fontStyle: "italic",
            width: 640,
            lineHeight: 1.4,
          }}
        >
          Bloom filters eliminate SSTables that definitely don't contain the
          key. Writes are fast (memory). Reads pay the cost of checking
          multiple files.
        </div>
      </At>
    </div>
  );
};
