import Header from '@/components/Header';
import Page from '@/components/Page';
import TabsWrapper from '@/components/TabsWrapper';
import Exercises from './Exercises';
export default function MainPage() {
  //const isAdmin = useUser((select) => select.isAdmin());

  const tabs = [
    {
      label: 'Темы',
      element: <Exercises />,
    },
  ];

  // if (isAdmin) {
  //   tabs.push(
  //     {
  //       label: 'Студенты',
  //       element: <Students />,
  //     },
  //     {
  //       label: 'Список файлов',
  //       element: <Payloads />,
  //     }
  //   );
  // }

  return (
    <>
      <Header />
      <Page>
        <TabsWrapper tabs={tabs} orientation={'horizontal'} />
      </Page>
    </>
  );
}
