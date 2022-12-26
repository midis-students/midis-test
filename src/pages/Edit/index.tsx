import Header from '@/components/Header';
import Page from '@/components/Page';
import { useAppSelector } from '@/store/hooks';
import { useExercies } from '@/store/slices/Exercies';

export default function EditPage() {
  const exercies = useExercies(0);
  console.log(exercies);

  return (
    <>
      <Header />
      <Page>123</Page>
    </>
  );
}
