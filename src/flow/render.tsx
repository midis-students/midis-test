import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Background,
  Connection
} from "reactflow";
import "reactflow/dist/style.css";
import NodeTypes from "./nodes";
import { useCallback, useEffect } from "react";
import { Container } from "@mui/material";

type NodeType = keyof typeof NodeTypes;

type NodeExt = Omit<Node, "type"> & {
  type: NodeType;
}

const initialNodes: NodeExt[] = [
  {
    id: "start",
    data: { type: "start" },
    type: "StartEnd",
    position: { x: 0, y: -100 }
  },
  {
    id: "1",
    data: { label: "Node 1" },
    position: { x: 5, y: 5 },
    type: "Text"
  },
  {
    id: "2",
    data: { label: "Node 2" },
    position: { x: 0, y: 100 },
    type: "Text"
  },
  {
    id: "end",
    data: { type: "end" },
    type: "StartEnd",
    position: { x: 0, y: 200 }
  }
];

const initialEdges: Edge[] = [
  { id: "start-1", source: "start", target: "1", type: "step" },
  { id: "e1-2", source: "1", target: "2", type: "step" },
  { id: "2-end", source: "2", target: "end", type: "step" }
];


export default function Flow() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


  useEffect(() => {

    /// @ts-ignore
    window.setNodes = setNodes;
    /// @ts-ignore
    window.setEdges = setEdges();

    document
      .querySelector(
        "div.react-flow__panel.react-flow__attribution.bottom.right"
      )
      ?.remove();
  }, []);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: "step"
          },
          eds
        )
      ),
    [setEdges]
  );


  return <Container maxWidth="xl" sx={{ height: "100%", display: "flex" }}>
    <ReactFlow
      nodeTypes={NodeTypes}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      panOnDrag={true}
      zoomOnScroll={true}
      style={{
        border: "1px solid #000"
      }}
    >
      <Background />
    </ReactFlow>
  </Container>;
}