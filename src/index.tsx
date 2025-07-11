import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Verificação de tipo para o elemento root
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure you have a div with id="root" in your index.html');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/Apenas-um-Catolico">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Registrar Service Worker
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      if (process.env.NODE_ENV === 'development') {
        console.log('SW registered successfully:', registration);
      }
      
      // Escutar atualizações do service worker
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Nova versão disponível
              if (window.confirm('Nova versão disponível! Recarregar página?')) {
                window.location.reload();
              }
            }
          });
        }
      });
      
      // Solicitar permissão para notificações
      if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission();
      }
      
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log('SW registration failed:', error);
      }
    }
  });
} 