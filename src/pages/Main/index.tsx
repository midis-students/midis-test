import React from 'react';
import Header from '@/components/Header';
import { useAppSelector } from '@/store/hooks';
import Page from '@/components/Page';
import TabsWrapper from '@/components/TabsWrapper';
import { useIsAdmin } from '@/store/slices/User';

const Exercises = React.lazy(() => import('./Exercises'));
const Students = React.lazy(() => import('./Students'));
const Payloads = React.lazy(() => import('./Payload'));

export default function MainPage() {
  const isAdmin = useIsAdmin();

  const tabs = [
    {
      label: 'Темы',
      element: <Exercises />,
    },
  ];

  if (isAdmin) {
    tabs.push({
      label: 'Студенты',
      element: <Students />,
    },{
      label: "Список файлов",
      element: <Payloads />
    }
    );
  }

  return (
    <>
      <Header />
      <Page>
        <TabsWrapper tabs={tabs} orientation={'horizontal'} />
      </Page>
    </>
  );
}
