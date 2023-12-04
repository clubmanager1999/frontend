import { ProfileDto } from '../data/profile';
import { ApiError } from '../data/error';
import { MemberDto } from '../data/member';
import { MembershipDto } from '../data/membership';

export class ApiClient {
  constructor(private accessToken: string) {}

  public async fetchProfile(): Promise<Result<ProfileDto, ApiError>> {
    return fetchData('/api/profile', this.accessToken);
  }

  public async updateProfile(
    profile: ProfileDto,
  ): Promise<Result<ProfileDto, ApiError>> {
    return putData(`/api/profile`, this.accessToken, profile);
  }

  public async fetchMember(id: string): Promise<Result<MemberDto, ApiError>> {
    return fetchData(`/api/members/${id}`, this.accessToken);
  }

  public async updateMember(
    id: string,
    member: MemberDto,
  ): Promise<Result<MemberDto, ApiError>> {
    return putData(`/api/members/${id}`, this.accessToken, member);
  }

  public async fetchMembers(): Promise<Result<MemberDto[], ApiError>> {
    return fetchData('/api/members', this.accessToken);
  }

  public async fetchMemberships(): Promise<Result<MembershipDto[], ApiError>> {
    return fetchData('/api/memberships', this.accessToken);
  }
}

async function fetchData<T, E>(
  path: string,
  accessToken: string,
): Promise<Result<T, E>> {
  return exec(path, accessToken);
}

async function putData<T, E>(
  path: string,
  accessToken: string,
  body: T,
): Promise<Result<T, E>> {
  return exec(
    path,
    accessToken,
    {
      method: 'PUT',
      body: JSON.stringify(body),
    },
    {
      'Content-Type': 'application/json',
    },
  );
}

async function exec<T, E>(
  path: string,
  accessToken: string,
  init?: RequestInit,
  extraHeaders?: Record<string, string>,
): Promise<Result<T, E>> {
  const response = await fetch(`http://localhost:8080${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...extraHeaders,
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
