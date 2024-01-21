import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from 'react-hot-toast';
import ContextProvider from './context/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider>
        <Toaster />
        <App />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>
);