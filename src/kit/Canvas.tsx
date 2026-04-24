import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import { frame } from "./palette";
import { fonts } from "./fonts";
import { DebugProvider, useDebug } from "./Debug";

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
        <CanvasRoot w={w} h={h} background={background} style={style}>
          {children}
        </CanvasRoot>
      </CanvasContext.Provider>
    </DebugProvider>
  );
};

/**
 * Canvas inner root. Split out so it can read DebugContext and emit the
 * canvas origin's viewport position via `CANVAS::` — scripts/check.mjs
 * uses this to translate getBoundingClientRect coords back into
 * canvas-local space for arrow intersection checks.
 */
const CanvasRoot: React.FC<{
  w: number;
  h: number;
  background: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ w, h, background, style, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { emit } = useDebug();

  useLayoutEffect(() => {
    if (!emit || !ref.current) return;
    const root = ref.current;
    const r = root.getBoundingClientRect();
    // eslint-disable-next-line no-console
    console.log(
      `CANVAS::${JSON.stringify({
        x: Math.round(r.x),
        y: Math.round(r.y),
      })}`,
    );

    // Orphan text detection — any rendered text whose ancestors don't
    // include a [data-dk-id] element is not tracked by BBOX::. Emit an
    // ORPHAN:: rect for each so scripts/check.mjs can still treat it
    // as an obstacle for arrow intersection. This catches section
    // headers / subtitles written as raw <div> inside <At>.
    const walker = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      null,
    );
    const reported = new Set<HTMLElement>();
    let node: Node | null;
    // eslint-disable-next-line no-cond-assign
    while ((node = walker.nextNode())) {
      const text = (node.textContent ?? "").trim();
      if (!text) continue;
      const parent = node.parentElement;
      if (!parent) continue;
      // Climb ancestors looking for either:
      //  - data-dk-id: text is part of a tracked kit primitive, skip.
      //  - data-dk-skip: text is intentionally floating (e.g. arrow
      //    labels that sit on their own arrow's path), skip.
      let ancestor: HTMLElement | null = parent;
      let tracked = false;
      while (ancestor && ancestor !== root) {
        if (
          ancestor.hasAttribute("data-dk-id") ||
          ancestor.hasAttribute("data-dk-skip")
        ) {
          tracked = true;
          break;
        }
        ancestor = ancestor.parentElement;
      }
      if (tracked) continue;
      // Orphan text — report the parent element's rect once.
      if (reported.has(parent)) continue;
      reported.add(parent);
      const bb = parent.getBoundingClientRect();
      // eslint-disable-next-line no-console
      console.log(
        `ORPHAN::${JSON.stringify({
          text: text.slice(0, 60),
          rect: {
            x: Math.round(bb.x),
            y: Math.round(bb.y),
            w: Math.round(bb.width),
            h: Math.round(bb.height),
          },
        })}`,
      );
    }
  }, [emit]);

  return (
    <div
      ref={ref}
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
