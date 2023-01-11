///@ts-ignore
import Fetch, { FetchConfig as FetchRequestConfig } from "async-request";
import { UserToken } from "./types";

type FetchClientConfig = {
  baseUrl: string;
};

interface FetchConfig {
  body?: Record<string, any>;
  query?: Record<string, any>;
  headers?: Record<string, any>;
  method: "GET" | "POST";
}

export class FetchClient {
  constructor(private config: FetchClientConfig) {}

  async rest<T = Record<string, any>>(
    UserToken: UserToken,
    method: string,
    params: Record<string, any> = {}
  ): Promise<{ result: T }> {
    const response = await this.request<string>(`rest/${method}.json`, {
      method: "POST",
      headers: {
        Cookie: UserToken.Cookie,
      },
      body: {
        sessid: UserToken.sessid,
        ...params,
      },
    });
    if (response.statusCode != 200) {
      throw new Error("Midis Rest error: " + method);
    }
    return JSON.parse(response.body);
  }

  async ajax<T = Record<string, any>>(
    UserToken: UserToken,
    method: string,
    data: Record<string, any>
  ): Promise<T> {
    const response = await this.request<string>(`bitrix/${method}`, {
      method: "POST",
      headers: {
        "bx-ajax": "true",
        "x-bitrix-site-id": "s1",
        "Content-Type": "application/x-www-form-urlencoded",
        Cookie: UserToken.Cookie,
        "x-bitrix-csrf-token": UserToken.sessid,
      },
      body: data,
    });
    if (response.statusCode != 200) {
      throw new Error("Midis Ajax error");
    }
    return JSON.parse(response.body);
  }

  request<T = Record<string, any>>(endpoint: string, config: FetchConfig) {
    const fetchConfig: FetchRequestConfig = {
      method: config.method,
      headers: config.headers,
    };
    if (config.method === "POST") {
      fetchConfig["data"] = config.body;
    }
    let url = this.config.baseUrl + endpoint;
    if (config.query) {
      url += "?" + this.queryBuilder(config.query);
    }
    return Fetch<T>(url, fetchConfig);
  }

  private queryBuilder(query: Record<string, any>) {
    return Object.entries(query)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  }
}
