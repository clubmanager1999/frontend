import './App.css';
import { useAuth } from 'react-oidc-context';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Auth from './auth/Auth';

function App() {
  const auth = useAuth();
  return (
    <Auth>
      <div className="App">
        Hello {auth.user?.profile.preferred_username}
        <Button
          onClick={() => void auth.removeUser()}
          variant="contained"
          startIcon={<LogoutIcon />}
        >
          Log out
        </Button>
      </div>
    </Auth>
  );
}

export default App;
