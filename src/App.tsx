import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthOutlet } from '@/components/Outlets';
import LoginPage from '@/pages/Login';
import MainPage from '@/pages/Main';
import TaskPage from './pages/Task';
import ExercisePage from './pages/Exercise';
import Settings from './components/Settings';

function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/settings"
        element={<Settings open={true} onClose={() => navigate('/')} />}
      />
      <Route path="/" element={<AuthOutlet />}>
        <Route index element={<MainPage />} />
        <Route path="task/:id" element={<TaskPage />} />
        <Route path="exercise/:exercise" element={<ExercisePage />} />
      </Route>
    </Routes>
  );
}

export default App;
