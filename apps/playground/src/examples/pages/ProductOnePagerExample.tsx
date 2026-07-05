import React from "react";
import { Glyph, ProductOnePager, GlyphName } from "@allen-saji/diagram-kit";

export type ProductOnePagerExampleProps = {
  debug?: boolean;
};

const mediaTile = (name: GlyphName, tint: string, color: "mint" | "blue" | "purple" | "peach") => (
  <div
    style={{
      width: "100%",
      height: "100%",
      minHeight: 150,
      background: tint,
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Glyph name={name} color={color} size={104} />
  </div>
);

/**
 * `ProductOnePager` template dogfood — the kit promoting itself in the
 * BBG course-promo anatomy: centered two-tone headline, subtitle, four
 * FeatureCards with glyph media tiles, brand/CTA footer.
 */
export const ProductOnePagerExample: React.FC<ProductOnePagerExampleProps> = ({
  debug = false,
}) => {
  return (
    <ProductOnePager
      w={1600}
      h={1400}
      debug={debug}
      header={{
        title: (
          <>
            Ship Diagrams <span style={{ color: "#C8431F" }}>as Code</span>
          </>
        ),
        subtitle: "diagram-kit · React + Remotion · one source renders PNG posters and MP4 explainers",
      }}
      features={[
        {
          title: "Glyph Registry",
          color: "mint",
          bullets: [
            "21 lineal-color topic icons",
            "Palette-tinted per section",
            "Crisp at 8K, animatable",
            "Grown on demand per topic",
          ],
          media: mediaTile("llm", "#DFF1E7", "mint"),
        },
        {
          title: "Page Templates",
          color: "blue",
          bullets: [
            "Listicle posters",
            "Product one-pagers",
            "Comparison columns",
            "Carousel + A4 presets",
          ],
          media: mediaTile("report", "#DCEBF7", "blue"),
        },
        {
          title: "Collision Checker",
          color: "purple",
          bullets: [
            "Headless bbox extraction",
            "Arrow intersection tests",
            "Orphan text detection",
            "CI-green gate on every probe",
          ],
          media: mediaTile("shield", "#E9E2F6", "purple"),
        },
        {
          title: "Render Pipeline",
          color: "peach",
          bullets: [
            "Static PNG: blog to 8K",
            "Animated MP4 for X",
            "Debug overlay iteration",
            "Same comp, both outputs",
          ],
          media: mediaTile("gauge", "#FBE3DA", "peach"),
        },
      ]}
      footer={{
        left: <>◆ diagram-kit</>,
        right: <>github.com/Allen-Saji/diagram-kit</>,
      }}
    />
  );
};
