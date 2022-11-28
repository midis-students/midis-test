import { Box, Container } from '@mui/material';
import React from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Background,
  Controls,
  Connection,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { DragNode, DragNodeValue } from '../CustomNode/DragNode';
import StartEndNode from '../CustomNode/StartEndNode';

const initialNodes: Node[] = [
  { id: 'start', data: { type: 'start' }, type: 'StartEndNode', position: { x: 0, y: -100 } },
  { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 }, type: 'DragNode' },
  { id: '2', data: { label: 'Node 2' }, position: { x: 0, y: 100 }, type: 'DragNode' },
  { id: 'end', data: { type: 'end' }, type: 'StartEndNode', position: { x: 0, y: 200 } },
];

const initialEdges: Edge[] = [
  { id: 'start-1', source: 'start', target: '1', type: 'step' },
  { id: 'e1-2', source: '1', target: '2', type: 'step' },
  { id: '2-end', source: '2', target: 'end', type: 'step' },
];

const nodeTypes = { DragNode: DragNode, StartEndNode: StartEndNode };

export default function FlowChart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  React.useEffect(() => {
    document.querySelector('div.react-flow__panel.react-flow__attribution.bottom.right')?.remove();
  }, []);

  const onConnect = React.useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            type: 'step',
          },
          eds,
        ),
      ),
    [setEdges],
  );

  return (
    <Container maxWidth="xl" sx={{ height: '100%', display: 'flex' }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        panOnDrag={false}
        zoomOnScroll={false}
        style={{
          border: '1px solid #000',
        }}>
        <Background />
      </ReactFlow>
      <Box sx={{ width: '90%', p: 5 }}>
        <DragNodeValue text={'hello'} />
        <DragNodeValue text="World" />
      </Box>
    </Container>
  );
}
