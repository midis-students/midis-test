import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EditPage from './pages/Edit';
import ExercisePage from './pages/Exercise';
import LoginPage from './pages/Login';
import MainPage from './pages/Main';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/exercise/:id" element={<ExercisePage />} />
      <Route path="/edit/:id" element={<EditPage />} />
    </Routes>
  );
}

export default App;
