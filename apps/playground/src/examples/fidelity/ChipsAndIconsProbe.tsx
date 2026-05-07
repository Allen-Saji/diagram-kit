import React from "react";
import {
  Canvas,
  At,
  Title,
  Annotation,
  Label,
  TagChip,
  IconBadge,
  StatusIcon,
  Card,
} from "@allen-saji/diagram-kit";

export type ChipsAndIconsProbeProps = {
  debug?: boolean;
};

/**
 * Probe for the small marker primitives — `TagChip`, `IconBadge`,
 * `StatusIcon`. These share a layout role (inline marker next to a
 * label or card), so one probe verifies the trio side-by-side.
 *
 * Each row shows a primitive in its expected variants. None of them
 * participate in arrow intersection; their purpose is visual cue.
 */
export const ChipsAndIconsProbe: React.FC<ChipsAndIconsProbeProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={760} debug={debug} theme="light">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="purple" rightSlot="diagram-kit · markers">
            Inline Markers
          </Title>
        </div>
      </At>

      {/* TagChip row */}
      <At x={60} y={170}>
        <Label debugId="tag-row-label" size={15}>
          TagChip — short uppercase verbs
        </Label>
      </At>
      <At x={60} y={210}>
        <Annotation tone="gray" debugId="tag-row-note">
          Use for HTTP methods, CRUD verbs, role markers — color-keyed by category.
        </Annotation>
      </At>
      <At x={60} y={260}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <TagChip debugId="tag-create" color="mint">CREATE</TagChip>
          <TagChip debugId="tag-read" color="blue">READ</TagChip>
          <TagChip debugId="tag-update" color="peach">UPDATE</TagChip>
          <TagChip debugId="tag-delete" color="pink">DELETE</TagChip>
          <span style={{ width: 32 }} />
          <TagChip debugId="tag-get" color="blue">GET</TagChip>
          <TagChip debugId="tag-post" color="mint">POST</TagChip>
        </div>
      </At>

      {/* IconBadge row */}
      <At x={60} y={350}>
        <Label debugId="icon-row-label" size={15}>
          IconBadge — entity / category markers
        </Label>
      </At>
      <At x={60} y={390}>
        <Annotation tone="gray" debugId="icon-row-note">
          Solid + outline variants, palette-keyed; inner icon is any ReactNode.
        </Annotation>
      </At>
      <At x={60} y={440}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <IconBadge debugId="icon-user-solid" icon="U" color="blue" />
          <IconBadge debugId="icon-user-outline" icon="U" color="blue" variant="outline" size={40} />
          <IconBadge debugId="icon-doc" icon="D" color="peach" />
          <IconBadge debugId="icon-lock" icon="L" color="pink" />
          <IconBadge debugId="icon-key" icon="K" color="yellow" />
        </div>
      </At>

      {/* StatusIcon row */}
      <At x={60} y={530}>
        <Label debugId="status-row-label" size={15}>
          StatusIcon — pass / fail / warn
        </Label>
      </At>
      <At x={60} y={570}>
        <Annotation tone="gray" debugId="status-row-note">
          Color stays consistent across themes since the semantics are universal.
        </Annotation>
      </At>
      <At x={60} y={620}>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <StatusIcon debugId="status-ok" status="ok" size={24} />
          <Card debugId="status-ok-card" color="mint" title="Migration applied" />
          <span style={{ width: 16 }} />
          <StatusIcon debugId="status-fail" status="fail" size={24} />
          <Card debugId="status-fail-card" color="pink" title="Schema check failed" />
          <span style={{ width: 16 }} />
          <StatusIcon debugId="status-warn" status="warn" size={24} />
          <Card debugId="status-warn-card" color="peach" title="Deprecated column" />
        </div>
      </At>
    </Canvas>
  );
};
