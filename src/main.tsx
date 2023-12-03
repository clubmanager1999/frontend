import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from 'react-oidc-context';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './home/Home.tsx';
import Profile from './profile/Profile.tsx';
import MemberList from './member/MemberList.tsx';
import MemberDetail from './member/MemberDetail.tsx';

const config = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/members',
        element: <MemberList />,
      },
      {
        path: '/members/:id',
        element: <MemberDetail />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider {...config}>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
