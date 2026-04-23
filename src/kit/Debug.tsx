import React, { createContext, useContext } from "react";
import { fonts } from "./fonts";

type DebugConfig = {
  /** When true, every kit element with a debugId renders its bbox overlay. */
  on: boolean;
  /** Stroke color for the overlay outline. */
  color?: string;
  /** Font size for the tag label. */
  tagSize?: number;
};

const DebugContext = createContext<DebugConfig>({ on: false });

export const useDebug = () => useContext(DebugContext);

export const DebugProvider: React.FC<{
  debug?: boolean;
  color?: string;
  tagSize?: number;
  children: React.ReactNode;
}> = ({ debug = false, color = "#E11D48", tagSize = 10, children }) => {
  return (
    <DebugContext.Provider value={{ on: debug, color, tagSize }}>
      {children}
    </DebugContext.Provider>
  );
};

type OverlayProps = {
  id?: string;
  kind?: string;
  children: React.ReactNode;
};

/**
 * Wrap any kit primitive's root element with this. When debug context is on,
 * the wrapper adds a dashed outline and a small top-left tag labelling the
 * element's kind and debugId. When off, it is a transparent passthrough.
 *
 * The wrapper uses `display: contents` when off so it does not affect layout.
 * When on, it switches to `position: relative` to anchor the tag — this may
 * slightly affect layout but only inside debug renders, which is acceptable
 * since debug is a separate composition variant.
 */
export const DebugOverlay: React.FC<OverlayProps> = ({ id, kind, children }) => {
  const { on, color, tagSize } = useDebug();

  if (!on || !id) return <>{children}</>;

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        outline: `1px dashed ${color}`,
        outlineOffset: -1,
      }}
      data-dk-id={id}
      data-dk-kind={kind}
    >
      <div
        style={{
          position: "absolute",
          top: -14,
          left: 0,
          fontFamily: fonts.mono,
          fontSize: tagSize,
          background: color,
          color: "#fff",
          padding: "1px 5px",
          borderRadius: 3,
          lineHeight: 1.2,
          zIndex: 20,
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        {kind ? `${kind}·` : ""}
        {id}
      </div>
      {children}
    </div>
  );
};
