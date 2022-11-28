import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Handle, Position } from 'reactflow';
import { Box } from '@mui/material';

export function DragNode() {
  const [text, setText] = React.useState('drag here');

  const [, drop] = useDrop(() => ({
    accept: 'box',
    drop: (item: { text: string }) => {
      setText(item.text);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <Box
      ref={drop}
      sx={{
        border: '1px solid gray',
        width: '128px',
        textAlign: 'center',
      }}>
      <Handle type="target" position={Position.Top} />
      {text}
      <Handle type="source" position={Position.Bottom} />
    </Box>
  );
}

export function DragNodeValue({ text }: { text: string }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: { text },

    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return <div ref={drag}>{text}</div>;
}
