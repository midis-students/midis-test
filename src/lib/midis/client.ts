import { UserToken } from './types';

type FetchClientConfig = {
  baseUrl: string;
};

interface FetchConfig {
  body?: Record<string, unknown>;
  query?: Record<string, unknown>;
  headers?: Record<string, unknown>;
  method: 'GET' | 'POST';
}

export class FetchClient {
  constructor(private config: FetchClientConfig) {}

  async rest<T = Record<string, unknown>>(
    UserToken: UserToken,
    method: string,
    params: Record<string, unknown> = {}
  ): Promise<{ result: T }> {
    const response = await this.request(`rest/${method}.json`, {
      method: 'POST',
      headers: {
        Cookie: UserToken.Cookie,
      },
      body: {
        sessid: UserToken.sessid,
        ...params,
      },
    });
    if (response.status != 200) {
      throw new Error('Midis Rest error: ' + method);
    }
    return response.json();
  }

  async ajax<T = Record<string, unknown>>(
    UserToken: UserToken,
    method: string,
    data: Record<string, unknown>
  ): Promise<T> {
    const response = await this.request(`bitrix/${method}`, {
      method: 'POST',
      headers: {
        'bx-ajax': 'true',
        'x-bitrix-site-id': 's1',
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: UserToken.Cookie,
        'x-bitrix-csrf-token': UserToken.sessid,
      },
      body: data,
    });
    if (response.status != 200) {
      throw new Error('Midis Ajax error');
    }

    return response.json();
  }

  request(endpoint: string, config: FetchConfig) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    if (config.headers) {
      for (const [key, value] of Object.entries(config.headers)) {
        headers[key] = '' + value;
      }
    }

    const fetchConfig: RequestInit = {
      method: config.method,
      headers,
    };
    if (config.method === 'POST' && config.body) {
      fetchConfig['body'] = this.queryBuilder(config.body);
    }
    let url = this.config.baseUrl + endpoint;
    if (config.query) {
      url += '?' + this.queryBuilder(config.query);
    }
    return fetch(url, fetchConfig);
  }

  private queryBuilder(query: Record<string, unknown>) {
    return Object.entries(query)
      .map(([key, value]) => `${key}=${encodeURIComponent('' + value)}`)
      .join('&');
  }
}
