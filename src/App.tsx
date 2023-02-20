import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthOutlet } from '@/components/Outlets';
import LoginPage from '@/pages/Login';
import MainPage from '@/pages/Main';
import TaskPage from './pages/Task';
import ExercisePage from './pages/Exercise';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<AuthOutlet />}>
        <Route index element={<MainPage />} />
        <Route path="task/:id" element={<TaskPage />} />
        <Route path="exercise/:exercise" element={<ExercisePage />} />
      </Route>
    </Routes>
  );
}

export default App;
