import React, { ReactNode } from 'react';
import './Auth.css';
import { AuthContextProps, useAuth } from 'react-oidc-context';

interface AuthProps {
  children?: ReactNode;
}

function status(auth: AuthContextProps) {
  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <div>Signing in...</div>;
    case 'signoutRedirect':
      return <div>Signing out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Failed to login: {auth.error.message}</div>;
  }

  auth.signinRedirect();
  return <div>Redirecting...</div>;
}

function Auth(props: AuthProps) {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <div>{props.children}</div>;
  }

  return <div className="Auth">{status(auth)}</div>;
}

export default Auth;
