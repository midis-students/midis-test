import Header from '@/components/Header';
import Page from '@/components/Page';
import { useAppSelector } from '@/store/hooks';
import { useExercise } from '@/store/slices/Exercies';

export default function EditPage() {
  const exercies = useExercise(0);
  console.log(exercies);

  return (
    <>
      <Header />
      <Page>123</Page>
    </>
  );
}
