import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from 'react-oidc-context';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ApiClientProvider from './api/ApiClientProvider.tsx';
import Auth from './auth/Auth.tsx';
import { routes } from './routes.tsx';

const config = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: routes,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...config}>
      <Auth>
        <ApiClientProvider>
          <RouterProvider router={router} />
        </ApiClientProvider>
      </Auth>
    </AuthProvider>
  </React.StrictMode>,
);
