import { useAuth } from 'react-oidc-context';
import { ReactNode } from 'react';
import { ApiClient } from './ApiClient';
import { ApiClientContext } from './ApiClientContext';

interface ApiClientProviderProps {
  children?: ReactNode;
}

export default function ApiClientProvider(props: ApiClientProviderProps) {
  const auth = useAuth();

  if (!auth.user?.access_token) {
    throw new Error('User has no access token');
  }

  return (
    <ApiClientContext.Provider value={new ApiClient(auth.user?.access_token)}>
      {props.children}
    </ApiClientContext.Provider>
  );
}
