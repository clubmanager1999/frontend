import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from 'react-oidc-context';

const oidcConfig = {
  authority: 'http://localhost:8081/realms/clubmanager1999',
  client_id: 'clubmanager1999-frontend',
  redirect_uri: 'http://localhost:5173',
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
