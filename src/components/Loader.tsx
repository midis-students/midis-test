import { Container, CircularProgress } from '@mui/material';

export default function Loader() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: '100%',
        display: 'flex',
      }}
    >
      <CircularProgress sx={{ margin: 'auto' }} size={64} />
    </Container>
  );
}
