import './App.css';
import { useAuth } from 'react-oidc-context';

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
        <button onClick={() => void auth.removeUser()}>Log out</button>
      </div>
    );
  }

  return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}

function App() {
  return <div className="App">{Auth()}</div>;
}

export default App;
