import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import English from './English';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Analytics />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/english" element={<English />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
