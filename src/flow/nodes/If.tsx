import { Box, TextField, Typography } from '@mui/material';
import { Handle, Position } from 'reactflow';

type TextProps = {
  data: { label: string; children: 'input' };
};

export default function If({ data }: TextProps) {
  return (
    <Box
      sx={{
        p: 1,
        position: 'relative',
      }}
    >
      <svg
        width="100"
        height="100"
        style={{
          display: 'block',
          overflow: 'visible',
        }}
      >
        <path
          d="M0,50 L50,0 L100,50 L50,100 z"
          fill="white"
          strokeWidth="1"
          stroke="gray"
        ></path>
      </svg>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Handle type="target" position={Position.Top} />
        <Typography>{data.label}</Typography>
        {data.children === 'input' && (
          <TextField variant="standard" size="small" fullWidth />
        )}
        <Handle type="source" position={Position.Bottom} />
      </div>
    </Box>
  );
}
