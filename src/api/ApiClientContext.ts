import { createContext, useContext } from 'react';
import { ApiClient } from './ApiClient';

export const ApiClientContext = createContext<ApiClient>(
  null as unknown as ApiClient,
);

export function useApiClient() {
  return useContext(ApiClientContext);
}
