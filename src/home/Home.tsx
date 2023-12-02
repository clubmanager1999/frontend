import { useAuth } from 'react-oidc-context';

function Home() {
  const auth = useAuth();

  return <div>Hallo {auth.user?.profile.preferred_username}</div>;
}

export default Home;
