import { FastifyReply, FastifyRequest } from "fastify";

export {};

declare module "fastify" {
  interface FastifyInstance {
    config: NodeJS.ProcessEnv;
  }
}

declare global {
  type FastifyAsyncHandler = (
    req: FastifyRequest,
    res: FastifyReply
  ) => Promise<void>;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: number;
      SECRET: string;
      MYSQL_HOST: string;
      MYSQL_PORT: number;
      MYSQL_USERNAME: string;
      MYSQL_PASSWORD: string;
      MYSQL_DATABASE: string;
    }
  }
}

/// @ts-ignore
declare module "async-request" {
  export type FetchConfig = {
    method: "GET" | "POST";
    data?: Record<string, any>;
    headers?: Record<string, any>;
  };

  export type FetchResponse<T> = {
    statusCode: number;
    body: T;
    headers: Record<string, any>;
  };

  function fetch<T>(
    url: string,
    config: FetchConfig
  ): Promise<FetchResponse<T>>;

  export default fetch;
}
