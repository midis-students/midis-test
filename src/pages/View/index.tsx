import Header from '@/components/Header';
import Page from '@/components/Page';
import TabsWrapper from '@/components/TabsWrapper';
import ResultTab from '@/pages/View/Results';

export default function ViewPage() {
  const tabs = [
    {
      label: 'Результаты',
      element: <ResultTab />,
    },
  ];

  return (
    <>
      <Header />
      <Page>
        <TabsWrapper tabs={tabs} orientation={'horizontal'} />
      </Page>
    </>
  );
}
