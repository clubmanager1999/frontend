export class HttpClient {
  constructor(private accessToken: string) {}

  async get<T, E>(path: string): Promise<Result<T, E>> {
    return this.fetch(path);
  }

  async post<T, E>(path: string, body: T): Promise<Result<T, E>> {
    return this.fetch(
      path,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
      {
        'Content-Type': 'application/json',
      },
    );
  }

  async put<T, E>(path: string, body: T): Promise<Result<T, E>> {
    return this.fetch(
      path,
      {
        method: 'PUT',
        body: JSON.stringify(body),
      },
      {
        'Content-Type': 'application/json',
      },
    );
  }

  async delete<E>(path: string): Promise<Result<void, E>> {
    return this.fetch(path, {
      method: 'Delete',
    });
  }

  async fetch<T, E>(
    path: string,
    init?: RequestInit,
    extraHeaders?: Record<string, string>,
  ): Promise<Result<T, E>> {
    const response = await fetch(`http://localhost:8080${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
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
}

export interface Result<T, E> {
  status: number;
  value?: T;
  error?: E;
}
