import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { DataProvider } from './context/DataContext.jsx';
import './index.css';
import './glass-theme.css';
import './site-motion.css';
import './mobile.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);

