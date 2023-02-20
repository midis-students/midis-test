import { Suspense } from 'react';
import { Container, SxProps, CircularProgress } from '@mui/material';

type PageProps = {
  children: React.ReactNode;
  sx?: SxProps;
};

export default function Page(props: PageProps) {
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        p: 1,
        gap: 1,
        flexDirection: 'column',
        mt: 1,
        overflow: 'hidden',
        height: '90vh',
        ...props.sx,
      }}
    >
      <Suspense
        fallback={<CircularProgress sx={{ margin: 'auto' }} size={64} />}
      >
        {props.children}
      </Suspense>
    </Container>
  );
}
