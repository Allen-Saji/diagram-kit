import React from "react";
import {
  At,
  Annotation,
  BulletList,
  Card,
  Cylinder,
  Glyph,
  MiniChart,
  ListiclePoster,
} from "@allen-saji/diagram-kit";

export type ListiclePosterExampleProps = {
  debug?: boolean;
};

/**
 * `ListiclePoster` template fidelity clone — a four-panel cut of BBG's
 * "Top Anti-Patterns in Service Architecture". Proves the template
 * chrome (title row, dashed panel grid, numbered pills straddling
 * panel borders) and mixed panel content: narrative charts, glyph
 * scenes, and verdict cards.
 */
export const ListiclePosterExample: React.FC<ListiclePosterExampleProps> = ({
  debug = false,
}) => {
  return (
    <ListiclePoster
      w={1600}
      h={1560}
      debug={debug}
      title="Top Anti-Patterns in Service Architecture"
      accentColor="mint"
      rightSlot="diagram-kit"
      cols={2}
      panels={[
        {
          title: "Splitting Early",
          content: (box) => (
            <>
              <At x={box.w / 2} y={30} anchor="top-center">
                <MiniChart
                  debugId="p1-chart"
                  variant="line"
                  w={Math.min(560, box.w - 20)}
                  h={330}
                  series={[
                    { label: "cost to change", color: "pink", points: [1, 1.6, 5.4, 7.8] },
                    { label: "what we know", color: "mint", points: [0.6, 1.1, 4.2, 6.2] },
                  ]}
                  xLabels={["Early", "Mature"]}
                  marker={{ at: 0.2, label: "split here", color: "mint" }}
                />
              </At>
              <At x={box.w / 2} y={box.h - 46} anchor="top-center">
                <Annotation tone="gray" debugId="p1-note">
                  The longer we wait, the more we know — and the more a change costs
                </Annotation>
              </At>
            </>
          ),
        },
        {
          title: "Wrong Boundaries",
          content: (box) => (
            <>
              <At x={box.w / 2 - 150} y={60} anchor="top-center">
                <Glyph name="filter" color="pink" size={88} debugId="p2-glyph-bad" />
              </At>
              <At x={box.w / 2 + 150} y={60} anchor="top-center">
                <Glyph name="shield" color="mint" size={88} debugId="p2-glyph-good" />
              </At>
              <At x={box.w / 2 - 150} y={190} anchor="top-center">
                <Card debugId="p2-bad" color="pink" title="One Feature," subtitle="Three Services" />
              </At>
              <At x={box.w / 2 + 150} y={190} anchor="top-center">
                <Card debugId="p2-good" color="mint" title="One Feature," subtitle="One Service" />
              </At>
              <At x={box.w / 2} y={330} anchor="top-center">
                <BulletList
                  debugId="p2-bullets"
                  color="blue"
                  marker="dash"
                  items={["Boundaries follow features, not layers", "A request should stay in one service"]}
                />
              </At>
            </>
          ),
        },
        {
          title: "Call Chains",
          content: (box) => (
            <>
              <At x={box.w / 2} y={20} anchor="top-center">
                <MiniChart
                  debugId="p3-chart"
                  variant="bar"
                  w={Math.min(480, box.w - 20)}
                  h={320}
                  bars={[
                    { label: "1 hop", value: 20, color: "mint" },
                    { label: "3 hops", value: 60, color: "yellow" },
                    { label: "5 hops", value: 100, color: "pink" },
                  ]}
                />
              </At>
              <At x={box.w / 2} y={box.h - 92} anchor="top-center">
                <Card
                  debugId="p3-verdict"
                  color="peach"
                  title="5 Hops Chained Together"
                  subtitle="about 99.5% available · about 100 ms"
                />
              </At>
            </>
          ),
        },
        {
          title: "Shared Database",
          content: (box) => (
            <>
              {[-1, 0, 1].map((k) => (
                <At key={k} x={box.w / 2 + k * 170} y={40} anchor="top-center">
                  <Glyph name="server" color="mint" size={80} label="Service" debugId={`p4-svc-${k + 1}`} />
                </At>
              ))}
              <At x={box.w / 2} y={230} anchor="top-center">
                <Cylinder
                  debugId="p4-db"
                  color="peach"
                  width={210}
                  height={170}
                  label="Shared Database"
                />
              </At>
              <At x={box.w / 2} y={box.h - 46} anchor="top-center">
                <Annotation tone="red" debugId="p4-note">
                  Every service couples to one schema — one migration breaks all three
                </Annotation>
              </At>
            </>
          ),
        },
      ]}
    />
  );
};
