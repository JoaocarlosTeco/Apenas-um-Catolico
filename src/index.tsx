import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Elemento #root não encontrado no index.html');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Service worker: deixa o site instalável e abre as páginas já visitadas sem internet.
// PUBLIC_URL vem do "homepage" do package.json ("/Apenas-um-Catolico").
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL}/sw.js`)
      .catch(() => {
        // sem service worker o site continua funcionando normalmente
      });
  });
}
