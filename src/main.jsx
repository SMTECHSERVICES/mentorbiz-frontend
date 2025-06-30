import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ServicesProvider } from './context/ServiceContext.jsx';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
 <ServicesProvider>
 <BrowserRouter>
    <App />
  </BrowserRouter>

 </ServicesProvider>
);
