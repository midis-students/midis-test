import { useSettings } from '@/store/settings';
import { useAuth } from '@/store/authorization';
import { ExerciseModule } from './module/exercize';
import { TaskModule } from './module/task';
import { PayloadModule } from './module/payload';
import { ProfileModule } from './module/profile';

type RequestConfig = {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown>;
  query?: Record<string, string>;
};

export class Api {
  static instance = new Api();
  private token: string | undefined = undefined;

  readonly exercise = new ExerciseModule(this);
  readonly task = new TaskModule(this);
  readonly payload = new PayloadModule(this);
  readonly profile = new ProfileModule(this);

  private constructor() {
    this.token = useAuth.getState().token;
  }

  async login(login: string, password: string) {
    const { token } = await this.request<{ token: string }>('login', {
      method: 'POST',
      body: { login, password },
    });

    if (token) {
      this.token = token;
      useAuth.setState({ token });
    }
  }

  async logout() {
    this.token = undefined;
    useAuth.setState({ token: undefined });
  }

  get host() {
    return useSettings.getState().apiHost;
  }

  async request<T>(endpoint: string, config: RequestConfig): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const requestInit: RequestInit = {
      method: config.method,
      headers,
    };

    let url = this.host + endpoint;

    if (config.query) {
      url += '?' + new URLSearchParams(config.query).toString();
    }

    if (['POST', 'PATCH'].includes(config.method) && config.body) {
      requestInit['body'] = JSON.stringify(config.body);
    }

    const response = await fetch(url, requestInit);
    const json = await response.json();

    if (response.status === 200) {
      return json;
    }

    throw new Error(json.message, { cause: json });
  }
}

/// @ts-ignore
window.api = Api.instance;
