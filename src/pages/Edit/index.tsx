import React from 'react';
import Header from '@/components/Header';
import Page from '@/components/Page';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Editor from '@/pages/Edit/editors';

export default function EditPage() {
  const { id } = useParams() as unknown as { id: number };
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Page>
        <Box>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
            Назад
          </Button>
        </Box>
        <Editor id={id} />
      </Page>
    </>
  );
}
