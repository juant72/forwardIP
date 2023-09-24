import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


function detectProxy() {
  // Verificar si el encabezado X-Forwarded-For está presente en la solicitud.
  if (typeof window !== 'undefined' && window.navigator && window.navigator.userAgent) {
    const ua = window.navigator.userAgent;
    if (ua.includes('Proxy')) {
      // Si el agente de usuario contiene "Proxy", podría indicar el uso de un proxy.
      console.log('Posible uso de proxy');
    }
  }

  // Verificar la presencia de encabezados HTTP específicos en las solicitudes AJAX.
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/detect-proxy', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const responseHeaders = xhr.getAllResponseHeaders();
        if (responseHeaders.toLowerCase().includes('x-forwarded-for')) {
          // Si la respuesta contiene el encabezado X-Forwarded-For, podría indicar el uso de un proxy.
          console.log('Posible uso de proxy');
        }
      }
    }
  };
  xhr.send();
}

detectProxy();



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
