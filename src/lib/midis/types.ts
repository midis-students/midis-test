export interface Session {
  Cookie: string;
  sessid: string;
  user_id: number;
  time: number;
}

export interface MidisProfile {
  id: number;
  name: string;
  avatar: string;
  group: string;
  type: string;
  online: boolean;
  last_activity: number;
}
