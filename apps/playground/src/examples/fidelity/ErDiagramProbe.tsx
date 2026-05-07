import React from "react";
import {
  Canvas,
  At,
  Title,
  Annotation,
  Card,
  Arrow,
  RelationshipNode,
  Cylinder,
  IconNode,
} from "@allen-saji/diagram-kit";

export type ErDiagramProbeProps = {
  debug?: boolean;
};

/**
 * Probe for `RelationshipNode`, `Cylinder`, and `IconNode`
 * (shape="document", shape="server-rack"). Lays them out as a small
 * ER-style sketch — a User entity owns Document(s) which are stored
 * in a Database, with a Server-rack as the deployment target.
 *
 * Relationship pills sit on connector lines via `<At>` placement at
 * the segment midpoint. Arrows do not auto-place labels along curved
 * routes, so for ER diagrams it's cleaner to position the
 * RelationshipNode independently with `<At>`.
 */
export const ErDiagramProbe: React.FC<ErDiagramProbeProps> = ({
  debug = false,
}) => {
  return (
    <Canvas w={1600} h={780} debug={debug} theme="light">
      <At x={60} y={50}>
        <div style={{ width: 1480 }}>
          <Title accentColor="blue" rightSlot="diagram-kit · ER + shapes">
            Storage Pipeline
          </Title>
        </div>
      </At>

      <At x={60} y={150}>
        <Annotation tone="gray" debugId="er-note">
          User -&gt; Document -&gt; Database, with a Server rack as the host
        </Annotation>
      </At>

      {/* Entities */}
      <At x={140} y={400} anchor="center">
        <Card debugId="user-entity" color="mint" title="User" subtitle="id, email" />
      </At>

      <At x={520} y={400} anchor="center">
        <IconNode debugId="doc-entity" shape="document" color="peach" label="Document" />
      </At>

      <At x={920} y={400} anchor="center">
        <Cylinder debugId="db-entity" color="blue" label="Postgres" />
      </At>

      <At x={1320} y={400} anchor="center">
        <IconNode
          debugId="rack-entity"
          shape="server-rack"
          color="purple"
          label="Production"
        />
      </At>

      {/* Connectors between entities */}
      <Arrow
        debugId="user-doc"
        from={{ x: 230, y: 400 }}
        to={{ x: 460, y: 400 }}
      />
      <Arrow
        debugId="doc-db"
        from={{ x: 580, y: 400 }}
        to={{ x: 870, y: 400 }}
      />
      <Arrow
        debugId="db-rack"
        from={{ x: 970, y: 400 }}
        to={{ x: 1280, y: 400 }}
      />

      {/* Relationship pills sit above the connector lines via At. */}
      <At x={345} y={372} anchor="center">
        <RelationshipNode debugId="rel-owns" tone="accent" color="mint">
          owns
        </RelationshipNode>
      </At>
      <At x={725} y={372} anchor="center">
        <RelationshipNode debugId="rel-stored-in">stored in</RelationshipNode>
      </At>
      <At x={1125} y={372} anchor="center">
        <RelationshipNode debugId="rel-runs-on">runs on</RelationshipNode>
      </At>
    </Canvas>
  );
};
