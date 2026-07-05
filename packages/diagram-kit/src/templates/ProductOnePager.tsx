import React from "react";
import { Canvas, At } from "../kit/Canvas";
import { PageHeader } from "../kit/PageHeader";
import { PageFooter } from "../kit/PageFooter";
import { FeatureCard } from "../kit/FeatureCard";
import { PaletteColor } from "../kit/palette";
import { type Theme } from "../kit/theme";

export type OnePagerFeature = {
  title: React.ReactNode;
  number?: number | string;
  color?: PaletteColor;
  pillTone?: "ink" | PaletteColor;
  bullets?: React.ReactNode[];
  media?: React.ReactNode;
  mediaPosition?: "right" | "bottom";
  mediaWidth?: number;
};

type ProductOnePagerProps = {
  header: {
    title: React.ReactNode;
    subtitle?: React.ReactNode;
  };
  features: OnePagerFeature[];
  /** Grid columns. Default 2. */
  cols?: number;
  footer?: { left?: React.ReactNode; right?: React.ReactNode };
  /** Default accent for cards that don't set their own. Default `mint`. */
  accentColor?: PaletteColor;
  w: number;
  h: number;
  theme?: Theme;
  debug?: boolean;
  margin?: number;
  gap?: number;
};

/**
 * Product / course promo one-pager — the BBG "Build With Claude Code"
 * page anatomy: centered headline + subtitle, a grid of FeatureCards
 * (pill title, bullets, media thumbnail), and a brand/CTA footer.
 *
 * Media slots take any node; for the BBG look, drop a scaled-down
 * kit composition or a Glyph on a tinted rounded div.
 */
export const ProductOnePager: React.FC<ProductOnePagerProps> = ({
  header,
  features,
  cols = 2,
  footer,
  accentColor = "mint",
  w,
  h,
  theme = "light",
  debug = false,
  margin = 50,
  gap = 28,
}) => {
  const headerH = header.subtitle != null ? 150 : 110;
  const footerH = footer ? 76 : 0;
  const rows = Math.ceil(features.length / cols);
  const cardW = (w - margin * 2 - gap * (cols - 1)) / cols;
  const cardH = (h - margin - headerH - footerH - margin - gap * (rows - 1)) / rows;
  return (
    <Canvas w={w} h={h} debug={debug} theme={theme}>
      <At x={w / 2} y={margin} anchor="top-center">
        <PageHeader
          title={header.title}
          subtitle={header.subtitle}
          width={w - margin * 2}
          debugId="onepager-header"
        />
      </At>
      {features.map((feat, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = margin + col * (cardW + gap);
        const y = margin + headerH + row * (cardH + gap);
        return (
          <At key={i} x={x} y={y}>
            <FeatureCard
              title={feat.title}
              number={feat.number}
              color={feat.color ?? accentColor}
              pillTone={feat.pillTone}
              bullets={feat.bullets}
              media={feat.media}
              mediaPosition={feat.mediaPosition}
              mediaWidth={feat.mediaWidth}
              width={cardW}
              height={cardH}
              debugId={`onepager-card-${i}`}
            />
          </At>
        );
      })}
      {footer ? (
        <At x={margin} y={h - margin - 40}>
          <PageFooter
            left={footer.left}
            right={footer.right}
            width={w - margin * 2}
            debugId="onepager-footer"
          />
        </At>
      ) : null}
    </Canvas>
  );
};
