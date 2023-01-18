import Header from '@/components/Header';
import Page from '@/components/Page';
import TabsWrapper from '@/components/TabsWrapper';
import React from 'react';
import EditorMain from '@/pages/Edit/editors/main';
import EditorTasks from '@/pages/Edit/editors/tasks';
import EditorResult from '@/pages/Edit/editors/results';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function EditPage() {
  const { id } = useParams() as unknown as { id: number };
  const navigate = useNavigate();

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

  return (
    <>
      <Header />
      <Page>
        <Box>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
            Назад
          </Button>
        </Box>
        <TabsWrapper tabs={tabs} orientation={'horizontal'} />
      </Page>
    </>
  );
}
