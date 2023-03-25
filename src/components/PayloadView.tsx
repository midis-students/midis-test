import { useSettings } from '@/store/settings';
import { Payload } from '@/lib/api/type';
import { CSSProperties } from 'react';

type ViewPayloadProps = {
  payload: Payload;
  width: string;
  height: string;
};

export default function ViewPayload(props: ViewPayloadProps) {
  const apiHost = useSettings((select) => select.apiHost);

  const style: CSSProperties = {
    objectFit: 'contain',
  };

  const src = apiHost + 'payload?id=' + props.payload.id;

  return (
    <img
      src={src}
      width={props.width}
      height={props.height}
      style={style}
      alt={'payload-' + props.payload.description}
    />
  );
}
