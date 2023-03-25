import { FC, useRef } from "react";
import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";
import { Card } from "@mui/material";

type DndCardProps = {
  id: string;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

type DragItem = {
  index: number;
  id: string;
  type: string;
}

const DndCardType = "DND-LIST";

export const DndCard: FC<DndCardProps> = ({ id, text, index, moveCard }) => {

  const ref = useRef<HTMLDivElement | null>(null);
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: DndCardType,
    collect: monitor => ({ handlerId: monitor.getHandlerId() }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: DndCardType,
    item: () => ({ id, index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return <Card ref={ref} sx={{
    opacity, padding: "0.5em 1em", cursor: "move"
  }} data-handler-id={handlerId}
               variant="outlined">
    {text}
  </Card>;

};