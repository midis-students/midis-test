import { Box, Typography } from '@mui/material';
import { Handle, Position } from 'reactflow';

type StartEndProps = {
  data: { type: 'start' | 'end' };
};

export default function StartEnd({ data }: StartEndProps) {
  return (
    <Box
      sx={{
        border: '1px solid gray',
        borderRadius: '50%',
        p: 1,
      }}
    >
      <Typography>{data.type == 'start' ? 'Начало' : 'Конец'}</Typography>
      <Handle
        type={data.type == 'start' ? 'source' : 'target'}
        position={data.type == 'start' ? Position.Bottom : Position.Top}
      />
    </Box>
  );
}