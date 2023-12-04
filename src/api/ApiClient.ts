import { ProfileDto } from '../data/profile';
import { ApiError } from '../data/error';
import { MemberDto } from '../data/member';

export class ApiClient {
  constructor(private accessToken: string) {}

  public async fetchProfile(): Promise<Result<ProfileDto, ApiError>> {
    return fetchData('/api/profile', this.accessToken);
  }

  public async fetchMember(id: string): Promise<Result<MemberDto, ApiError>> {
    return fetchData(`/api/members/${id}`, this.accessToken);
  }

  public async fetchMembers(): Promise<Result<MemberDto[], ApiError>> {
    return fetchData('/api/members', this.accessToken);
  }
}

async function fetchData<T, E>(
  path: string,
  accessToken: string,
): Promise<Result<T, E>> {
  const response = await fetch(`http://localhost:8080${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status == 200) {
    return { status: response.status, value: await response.json() };
  } else {
    if (response.status >= 400) {
      return { status: response.status, error: await response.json() };
    }
  }

  return { status: response.status };
}

export interface Result<T, E> {
  status: number;
  value?: T;
  error?: E;
}
