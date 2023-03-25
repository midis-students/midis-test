import { Box, TextField, Typography } from "@mui/material";
import { Handle, Position } from "reactflow";

type TextProps = {
  data: { label: string };
};

export default function Text({ data }: TextProps) {
  return (
    <Box
      sx={{
        border: "1px solid gray",
        background: "white",
        p: 1
      }}
    >
      <Handle
        type='target'
        position={Position.Top}
      />
      <Typography>{data.label}</Typography>
      <TextField variant="standard" size="small" fullWidth />
      <Handle
        type='source'
        position={Position.Bottom}
      />
    </Box>
  );
}