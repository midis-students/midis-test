import { Box, TextField, Typography } from '@mui/material';
import { Handle, Position } from 'reactflow';

type TextProps = {
  data: { label: string; children: 'input' };
};

const skew = 160;

export default function InputOutput({ data }: TextProps) {
  return (
    <Box
      sx={{
        p: 1,
        '&:before': {
          content: "' '",
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'white',
          border: '1px solid gray',
          zIndex: -1,
          transform: `skew(${skew}deg)`,
        },
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
