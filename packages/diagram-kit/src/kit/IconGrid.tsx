import React from "react";
import { PaletteColor } from "./palette";
import { useInk } from "./theme";
import { fonts } from "./fonts";
import { DebugOverlay } from "./Debug";
import { Glyph, GlyphName } from "./Glyph";

export type IconGridItem = {
  /** A registry glyph name, or any custom node (LogoChip, image, svg). */
  icon: GlyphName | React.ReactNode;
  caption: React.ReactNode;
};

type IconGridProps = {
  items: IconGridItem[];
  cols: number;
  /** Cell width. Default 104. */
  cellWidth?: number;
  /** Glyph tint when `icon` is a registry name. Default `gray`. */
  color?: PaletteColor;
  iconSize?: number;
  captionSize?: number;
  gapX?: number;
  gapY?: number;
  style?: React.CSSProperties;
  debugId?: string;
};

/**
 * Captioned icon grid — the "Customer 360" treatment in enterprise
 * architecture slides: many small icons, tiny captions, tight grid.
 * Registry glyph names tint via `color`; pass ReactNodes for brand
 * logos or custom artwork.
 */
export const IconGrid: React.FC<IconGridProps> = ({
  items,
  cols,
  cellWidth = 104,
  color = "gray",
  iconSize = 40,
  captionSize = 13,
  gapX = 8,
  gapY = 18,
  style,
  debugId,
}) => {
  const ink = useInk();
  return (
    <DebugOverlay id={debugId} kind="icon-grid">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${cellWidth}px)`,
          columnGap: gapX,
          rowGap: gapY,
          fontFamily: fonts.sans,
          ...style,
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 7,
              textAlign: "center",
            }}
          >
            {typeof item.icon === "string" ? (
              <Glyph name={item.icon as GlyphName} color={color} size={iconSize} />
            ) : (
              item.icon
            )}
            <span
              style={{
                fontSize: captionSize,
                fontWeight: 600,
                color: ink.body,
                lineHeight: 1.2,
              }}
            >
              {item.caption}
            </span>
          </div>
        ))}
      </div>
    </DebugOverlay>
  );
};
