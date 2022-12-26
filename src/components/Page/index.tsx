import { Container, SxProps } from '@mui/material';

type PageProps = {
  children: React.ReactNode;
  sx?: SxProps;
};

export default function Page(props: PageProps) {
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: '100%',
        display: 'flex',
        p: 1,
        gap: 1,
        flexDirection: 'column',
        mt: 1,
        ...props.sx,
      }}>
      {props.children}
    </Container>
  );
}
