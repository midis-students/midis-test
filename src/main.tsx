import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { configure } from '@yoskutik/react-vvm';
import CssBaseline from '@mui/material/CssBaseline';
import './global.css';
import { BrowserRouter } from 'react-router-dom';
import { container } from 'tsyringe';

configure({
  vmFactory: (VM) => container.resolve(VM),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
