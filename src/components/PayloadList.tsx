import { Payload } from '@/lib/api/type';
import { Stack } from '@mui/material';
import ViewPayload from '@/components/PayloadView';

type PayloadListProps = {
  payloads: Payload[];
};

export default function PayloadList({ payloads = [] }: PayloadListProps) {
  return (
    <Stack direction="row" spacing={1} sx={{ maxHeight: '64vh' }}>
      {payloads.map((payload) => (
        <>
          <ViewPayload
            key={'payload-' + payload}
            payload={payload}
            width={(1 / payloads.length) * 100 + '%'}
            height="auto"
          />
        </>
      ))}
    </Stack>
  );
}
