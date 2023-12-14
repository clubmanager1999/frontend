import { useAuth } from 'react-oidc-context';
import { ReactNode } from 'react';
import { ApiClient } from './ApiClient';
import { ApiClientContext } from './ApiClientContext';
import { ProfileClient } from './ProfileClient';
import { HttpClient } from './HttpClient';
import { CrudClient } from './CrudClient';
import { MemberDto } from '../data/member';
import { MembershipDto } from '../data/membership';
import { CreditorDto } from '../data/creditor';
import { DonorDto } from '../data/donor';
import { AreaDto } from '../data/area';
import { PurposeDto } from '../data/purpose';
import { MappingDto } from '../data/mapping';

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
    creditors: new CrudClient<CreditorDto>(httpClient, '/api/creditors'),
    donors: new CrudClient<DonorDto>(httpClient, '/api/donors'),
    areas: new CrudClient<AreaDto>(httpClient, '/api/areas'),
    purposes: new CrudClient<PurposeDto>(httpClient, '/api/purposes'),
    mappings: new CrudClient<MappingDto>(httpClient, '/api/mappings'),
  };

  return (
    <ApiClientContext.Provider value={apiClient}>
      {props.children}
    </ApiClientContext.Provider>
  );
}
