import { Box, TextField, Typography } from '@mui/material';
import { Handle, Position } from 'reactflow';

type TextProps = {
  data: { label: string; children: 'input' };
};

export default function Block({ data }: TextProps) {
  return (
    <Box
      sx={{
        border: '1px solid gray',
        background: 'white',
        p: 1,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Typography>{data.label}</Typography>
      {data.children === 'input' && (
        <TextField variant="standard" size="small" fullWidth />
      )}
      <Handle type="source" position={Position.Bottom} />
    </Box>
  );
}
