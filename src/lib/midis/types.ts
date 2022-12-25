export type ApiConfig = {
    secret: string;
};

export type UserToken = { Cookie: string; sessid: string; user_id: number };

export type MidisProfile = {
    id: number;
    name: string;
    pic: string;
    group: string;
    type: string;
    online: boolean;
    last_activity: number;
};