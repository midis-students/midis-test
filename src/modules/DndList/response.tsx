import update from 'immutability-helper';
import { Variant } from '@/lib/api/type';
import { useTaskView } from '@/pages/(TaskView)/context';
import { Box, FormControl, FormLabel } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { ResponseProps } from '@/modules/type';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndCard } from '@/modules/DndList/dndcard';

type DndListProps = {
  variants: Variant[];
};

export default function Response({ data }: ResponseProps<DndListProps>) {
  const { setResponse } = useTaskView();
  const [variants, setVariants] = useState<Variant[]>(data.variants);

  useEffect(() => {
    setResponse(variants.map((variant) => variant.id));
  }, [variants]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setVariants((prev) =>
      update(prev, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prev[dragIndex]],
        ],
      })
    );
  }, []);

  const renderCard = useCallback((card: Variant, index: number) => {
    return (
      <DndCard
        key={card.id}
        id={card.id}
        text={card.label}
        index={index}
        moveCard={moveCard}
      />
    );
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <FormControl>
        <FormLabel>Перетаскивайте элементы в правильном порядке</FormLabel>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            marginTop: '1em',
          }}
        >
          {variants.map((option: Variant, index: number) =>
            renderCard(option, index)
          )}
        </Box>
      </FormControl>
    </DndProvider>
  );
}
