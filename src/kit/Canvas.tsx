import React, { createContext, useContext } from "react";
import { frame } from "./palette";
import { fonts } from "./fonts";
import { DebugProvider } from "./Debug";

type CanvasSize = { w: number; h: number };

const CanvasContext = createContext<CanvasSize>({ w: 1920, h: 1080 });

export const useCanvas = () => useContext(CanvasContext);

type CanvasProps = {
  w: number;
  h: number;
  children: React.ReactNode;
  background?: string;
  style?: React.CSSProperties;
  /**
   * When true, every kit element with a debugId renders its bbox overlay.
   * Typically threaded in through a composition's `debug` prop for use
   * with the iterate.sh workflow.
   */
  debug?: boolean;
};

/**
 * Fixed-size absolute-positioning container for a diagram.
 * All Cards/Panels/Arrows inside should position themselves with absolute coords.
 */
export const Canvas: React.FC<CanvasProps> = ({
  w,
  h,
  children,
  background = frame.pageBg,
  style,
  debug = false,
}) => {
  return (
    <DebugProvider debug={debug}>
      <CanvasContext.Provider value={{ w, h }}>
        <div
          style={{
            position: "relative",
            width: w,
            height: h,
            background,
            fontFamily: fonts.sans,
            overflow: "hidden",
            ...style,
          }}
        >
          {children}
        </div>
      </CanvasContext.Provider>
    </DebugProvider>
  );
};

/** Absolutely position any child at (x, y). Defaults to top-left anchor. */
type AtProps = {
  x: number;
  y: number;
  /** Anchor within the child to place at (x, y). Default is "top-left". */
  anchor?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "center"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const anchorTransform: Record<NonNullable<AtProps["anchor"]>, string> = {
  "top-left": "translate(0, 0)",
  "top-center": "translate(-50%, 0)",
  "top-right": "translate(-100%, 0)",
  center: "translate(-50%, -50%)",
  "bottom-left": "translate(0, -100%)",
  "bottom-center": "translate(-50%, -100%)",
  "bottom-right": "translate(-100%, -100%)",
};

export const At: React.FC<AtProps> = ({
  x,
  y,
  anchor = "top-left",
  children,
  style,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: anchorTransform[anchor],
        ...style,
      }}
    >
      {children}
    </div>
  );
};
