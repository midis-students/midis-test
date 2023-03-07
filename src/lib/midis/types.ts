export type ApiConfig = {
  secret: string;
};

export type UserToken = { Cookie: string; sessid: string; user_id: number };

export type MidisClient = MidisProfile & {
  token: UserToken;
};

export type MidisProfile = {
  id: number;
  name: string;
  pic: string;
  group: string;
  online: boolean;
  last_activity: number;
};

export interface MidisAPIBase {
  login(login: string, password: string): Promise<MidisClient>;
  getUser(id: number): Promise<MidisProfile | undefined>;
}
