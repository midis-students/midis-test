import Header from '@/components/Header';
import Page from '@/components/Page';
import { Navigate, useParams } from 'react-router-dom';
import TaskView from '../(TaskView)';

export default function TaskPage() {
  const { id } = useParams();
  if (!id) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <Page>
        <TaskView id={+id} />
      </Page>
    </>
  );
}
