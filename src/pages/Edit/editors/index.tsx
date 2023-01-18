import EditorMain from '@/pages/Edit/editors/main';
import EditorTasks from '@/pages/Edit/editors/tasks';
import EditorResult from '@/pages/Edit/editors/results';
import React from 'react';
import TabsWrapper from '@/components/TabsWrapper';

export type EditorProps = {
  id: number;
};

export default function Editor({ id }: EditorProps) {
  const tabs = [
    {
      label: 'Основное',
      element: <EditorMain id={+id} />,
    },
    {
      label: 'Задачи',
      element: <EditorTasks id={+id} />,
    },
    {
      label: 'Результаты',
      element: <EditorResult id={+id} />,
    },
  ];

  return <TabsWrapper tabs={tabs} orientation={'horizontal'} />;
}
