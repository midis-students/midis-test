import { useSettings } from "@/store/settings";

type ViewPayloadProps = {
  payload: number;
  width: string;
  height: string;
};

export default function ViewPayload(props: ViewPayloadProps) {
  const apiHost = useSettings((select) => select.apiHost);

  const style: React.CSSProperties = {
    objectFit: "contain"
  };

  const src = apiHost + "payload?id=" + props.payload;

  return (
    <img src={src} width={props.width} height={props.height} style={style} alt={"payload-" + props.payload} />
  );
}
