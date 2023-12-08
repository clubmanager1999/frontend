import { useAuth } from 'react-oidc-context';
import { ReactNode } from 'react';
import { ApiClient } from './ApiClient';
import { ApiClientContext } from './ApiClientContext';
import { ProfileClient } from './ProfileClient';
import { HttpClient } from './HttpClient';
import { CrudClient } from './CrudClient';
import { MemberDto } from '../data/member';
import { MembershipDto } from '../data/membership';

interface ApiClientProviderProps {
  children?: ReactNode;
}

export default function ApiClientProvider(props: ApiClientProviderProps) {
  const auth = useAuth();
  const accessToken = auth.user?.access_token;

  if (!accessToken) {
    throw new Error('User has no access token');
  }

  const httpClient = new HttpClient(accessToken);

  const apiClient: ApiClient = {
    profile: new ProfileClient(httpClient),
    members: new CrudClient<MemberDto>(httpClient, '/api/members'),
    memberships: new CrudClient<MembershipDto>(httpClient, '/api/memberships'),
  };

  return (
    <ApiClientContext.Provider value={apiClient}>
      {props.children}
    </ApiClientContext.Provider>
  );
}
