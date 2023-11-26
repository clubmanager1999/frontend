import React from 'react';
import './App.css';
import { useAuth } from 'react-oidc-context';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

function Auth() {
  const auth = useAuth();

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

  if (auth.isAuthenticated) {
    console.log(auth.user);
    return (
      <div>
        Hello {auth.user?.profile.preferred_username}
        <Button
          onClick={() => void auth.removeUser()}
          variant="contained"
          startIcon={<LogoutIcon />}
        >
          Log out
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => void auth.signinRedirect()}
      variant="contained"
      startIcon={<LoginIcon />}
    >
      Log in
    </Button>
  );
}

function App() {
  return <div className="App">{Auth()}</div>;
}

export default App;
