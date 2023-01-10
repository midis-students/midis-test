import type { store as Store } from '@/store';
import {
  ApiLoginResponse,
  ApiProfileResponse,
  ApiResponse,
} from '@/lib/Service.type';

type RequestConfig = {
  method: 'GET' | 'POST';
  body?: Record<string, any>;
  query?: Record<string, any>;
};

export class Services {
  constructor(private store: typeof Store) {}

  login(login: string, password: string) {
    return this.request<ApiLoginResponse>('login', {
      method: 'POST',
      body: { login, password },
    });
  }

  getProfile(id = -1) {
    return this.request<ApiProfileResponse>('profile', {
      method: 'GET',
      query: { id },
    });
  }

  getProfileList(query = {}) {
    return this.request<ApiProfileResponse[]>('profile/list', {
      method: 'GET',
      query,
    });
  }

  private async request<T>(
    url: string,
    config: RequestConfig,
  ): Promise<ApiResponse<T>> {
    const { apiHost } = this.store.getState().settings;
    const { token } = this.store.getState().auth;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (config.query) {
      url +=
        '?' +
        Object.entries(config.query)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&');
    }

    const requestInit: RequestInit = {
      method: config.method,
      headers,
    };

    if (config.method === 'POST') {
      requestInit['body'] = JSON.stringify(config.body);
    }

    const response = await fetch(`${apiHost}/${url}`, requestInit);

    const data = await response.json();
    if (response.status == 200) {
      return { status: response.status, data };
    }
    return data;
  }
}
