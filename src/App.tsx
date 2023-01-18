import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EditPage from './pages/Edit';
import ExercisePage from './pages/Exercise';
import LoginPage from './pages/Login';
import MainPage from './pages/Main';
import { AuthOutlet, PrivateOutlet } from '@/components/Outlets';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<AuthOutlet />}>
        <Route index element={<MainPage />} />
        <Route path="/exercise/:id" element={<ExercisePage />} />
        <Route path="/" element={<PrivateOutlet />}>
          <Route path="edit/:id" element={<EditPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
