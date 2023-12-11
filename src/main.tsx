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
import ApiClientProvider from './api/ApiClientProvider.tsx';
import Auth from './auth/Auth.tsx';
import MembershipList from './membership/MembershipList.tsx';
import MembershipDetail from './membership/MemberShipDetail.tsx';
import CreditorList from './creditor/CreditorList.tsx';
import CreditorDetail from './creditor/CreditorDetail.tsx';
import DonorDetail from './donor/DonorDetail.tsx';
import DonorList from './donor/DonorList.tsx';

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
        path: '/memberships',
        element: <MembershipList />,
      },
      {
        path: '/memberships/:id',
        element: <MembershipDetail />,
      },
      {
        path: '/members',
        element: <MemberList />,
      },
      {
        path: '/members/:id',
        element: <MemberDetail />,
      },
      {
        path: '/creditors',
        element: <CreditorList />,
      },
      {
        path: '/creditors/:id',
        element: <CreditorDetail />,
      },
      {
        path: '/donors',
        element: <DonorList />,
      },
      {
        path: '/donors/:id',
        element: <DonorDetail />,
      },
    ],
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
