import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Background,
  Connection,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodeTypes from './nodes';
import { useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/material';

type NodeType = keyof typeof NodeTypes;

type NodeExt = Omit<Node, 'type'> & {
  type: NodeType;
};

const initialNodes: NodeExt[] = [
  {
    id: 'start',
    data: { type: 'start' },
    type: 'StartEnd',
    position: { x: 0, y: -100 },
  },
  {
    id: '1',
    data: { label: 'Node 1', children: 'input' },
    position: { x: -200, y: 5 },
    type: 'Block',
  },
  {
    id: '2',
    data: { label: 'Node 2' },
    position: { x: 0, y: 100 },
    type: 'If',
  },
  {
    id: 'end',
    data: { type: 'end' },
    type: 'StartEnd',
    position: { x: 0, y: 200 },
  },
];

const initialEdges: Edge[] = [
  { id: 'start-1', source: 'start', target: '1', type: 'step' },
  { id: 'e1-2', source: '1', target: '2', type: 'step' },
  { id: '2-end', source: '2', target: 'end', type: 'step' },
];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    /// @ts-ignore
    window.setNodes = setNodes;
    /// @ts-ignore
    window.setEdges = setEdges;
    /// @ts-ignore
    window.toggleEdit = () => setEditMode((prev) => !prev);
    ///@ts-ignore
    window.showNodes = () => {
      console.log({
        nodes,
        edges,
      });
    };

    document
      .querySelector(
        'div.react-flow__panel.react-flow__attribution.bottom.right'
      )
      ?.remove();
  }, []);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: 'step',
          },
          eds
        )
      ),
    [setEdges]
  );

  const editProps = editMode
    ? {
        onNodesChange: onNodesChange,
        onEdgesChange: onEdgesChange,
        panOnDrag: true,
        zoomOnScroll: true,
      }
    : {
        panOnDrag: false,
        zoomOnScroll: false,
      };

  return (
    <Container maxWidth="xl" sx={{ height: '100%', display: 'flex' }}>
      <ReactFlow
        nodeTypes={NodeTypes}
        nodes={nodes}
        edges={edges}
        {...editProps}
        onConnect={onConnect}
        fitView
        style={{
          border: '1px solid #000',
        }}
      >
        <Background />
      </ReactFlow>
    </Container>
  );
}
