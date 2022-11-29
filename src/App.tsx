import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ExercisePage from './pages/Exercise';
import LoginPage from './pages/Login';
import MainPage from './pages/Main';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/exercise/:id" element={<ExercisePage />} />
    </Routes>
  );
}

export default App;
