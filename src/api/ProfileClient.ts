import { ApiError } from '../data/error';
import { ProfileDto } from '../data/profile';
import { HttpClient, Result } from './HttpClient';

export class ProfileClient {
  constructor(private httpClient: HttpClient) {}

  public async get(): Promise<Result<ProfileDto, ApiError>> {
    return this.httpClient.get('/api/profile');
  }

  public async update(
    profile: ProfileDto,
  ): Promise<Result<ProfileDto, ApiError>> {
    return this.httpClient.put('/api/profile', profile);
  }
}
