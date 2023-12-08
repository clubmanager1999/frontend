import { ApiError } from '../data/error';
import { HttpClient, Result } from './HttpClient';

export class CrudClient<T> {
  constructor(
    private httpClient: HttpClient,
    private path: string,
  ) {}

  public async create(t: T): Promise<Result<T, ApiError>> {
    return this.httpClient.post(this.path, t);
  }

  public async getById(id: string): Promise<Result<T, ApiError>> {
    return this.httpClient.get(`${this.path}/${id}`);
  }

  public async getAll(): Promise<Result<T[], ApiError>> {
    return this.httpClient.get(this.path);
  }

  public async update(id: string, t: T): Promise<Result<T, ApiError>> {
    return this.httpClient.put(`${this.path}/${id}`, t);
  }

  public async delete(id: string): Promise<Result<void, ApiError>> {
    return this.httpClient.delete(`${this.path}/${id}`);
  }
}
