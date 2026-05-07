import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import { fonts } from "./fonts";

type DebugConfig = {
  /** When true, every kit element with a debugId renders its bbox overlay. */
  on: boolean;
  /** Stroke color for the overlay outline. */
  color: string;
  /** Font size for the tag label. */
  tagSize: number;
  /** When true, bboxes are emitted via console.log for the collision checker. */
  emit: boolean;
};

const DebugContext = createContext<DebugConfig>({
  on: false,
  color: "#E11D48",
  tagSize: 10,
  emit: false,
});

export const useDebug = () => useContext(DebugContext);

export const DebugProvider: React.FC<{
  debug?: boolean;
  color?: string;
  tagSize?: number;
  /** Emit BBOX:: logs for scripts/check.mjs. Default true when debug is on. */
  emit?: boolean;
  children: React.ReactNode;
}> = ({
  debug = false,
  color = "#E11D48",
  tagSize = 10,
  emit,
  children,
}) => {
  return (
    <DebugContext.Provider
      value={{ on: debug, color, tagSize, emit: emit ?? debug }}
    >
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
 * Wrap any kit primitive's root element with this.
 *
 * - Off: transparent passthrough (renders children as-is).
 * - Visual debug on: adds a dashed outline and a small top-left tag
 *   labelling the element's kind and debugId.
 * - Emit on: the wrapped content's bounding box is logged via
 *   console.log (prefix "BBOX::") so scripts/check.mjs can capture
 *   it via Remotion's onBrowserLog and run collision checks.
 */
export const DebugOverlay: React.FC<OverlayProps> = ({
  id,
  kind,
  children,
}) => {
  const { on, color, tagSize, emit } = useDebug();
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!emit || !id || !contentRef.current) return;
    const r = contentRef.current.getBoundingClientRect();
    const payload = {
      id,
      kind,
      rect: {
        x: Math.round(r.x),
        y: Math.round(r.y),
        w: Math.round(r.width),
        h: Math.round(r.height),
      },
    };
    // eslint-disable-next-line no-console
    console.log(`BBOX::${JSON.stringify(payload)}`);
  }, [emit, id, kind]);

  // Entirely transparent when nothing is active.
  if (!id || (!on && !emit)) return <>{children}</>;

  return (
    <div
      ref={contentRef}
      style={{
        position: "relative",
        display: "inline-block",
        outline: on ? `1px dashed ${color}` : undefined,
        outlineOffset: on ? -1 : undefined,
      }}
      data-dk-id={id}
      data-dk-kind={kind}
    >
      {on ? (
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
      ) : null}
      {children}
    </div>
  );
};
