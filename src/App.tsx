import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthOutlet } from '@/components/Outlets';
import LoginPage from '@/pages/Login';
import MainPage from '@/pages/Main';
import TaskPage from './pages/Task';
import ExercisePage from './pages/Exercise';
import Settings from './components/Settings';
import { useAuth } from './store/authorization';
import { Api } from './lib/api';
import TestPage from '@/pages/Test';

function App() {
  const navigate = useNavigate();
  const token = useAuth((select) => select.token);

  useEffect(() => {
    if (token) {
      Api.instance.profile.get();
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/settings"
        element={<Settings open={true} onClose={() => navigate('/')} />}
      />
      <Route path="/" element={<AuthOutlet />}>
        <Route index element={<MainPage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="task/:id" element={<TaskPage />} />
        <Route path="exercise/:exercise/:task" element={<ExercisePage />} />
      </Route>
    </Routes>
  );
}

export default App;
