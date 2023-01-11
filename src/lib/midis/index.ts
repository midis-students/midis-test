import { FetchClient } from "./client";
import { MidisAPIBase, MidisClient, MidisProfile, UserToken } from "./types";

export class MidisAPI implements MidisAPIBase {
  private client = new FetchClient({ baseUrl: "https://portal.midis.info/" });

  /// @ts-ignore
  async login(login: string, password: string) {
    const Cookie = await this.getCookie(login, password);
    const response = await this.client.request(
      "company/personal/user/1/common_security/",
      {
        method: "GET",
        query: {
          IFRAME: "Y",
          IM_AJAX_CALL: "Y",
        },
        headers: {
          Cookie,
        },
      }
    );
    if (response.statusCode != 200) {
      throw new Error(`Can't get bitrix sessid`);
    }

    let bx = "";
    for (let group of response.body.matchAll(
      /\(window\.BX\|\|top\.BX\)\.message\((.*)\)/gm
    )) {
      bx = group[1].replace(/\'/g, '"');
    }

    if (bx) {
      const { bitrix_sessid, USER_ID } = JSON.parse(bx) as {
        bitrix_sessid: string;
        USER_ID: string;
      };
      return {
        Cookie,
        sessid: bitrix_sessid,
        user_id: +USER_ID,
      };
    }
    throw new Error(`Can't parse BX`);
  }

  /// @ts-ignore
  async getUser(id: number) {
    throw new Error("Not implemented");
  }

  private async getCookie(login: string, password: string) {
    const response = await this.client.request(`/auth/index.php`, {
      method: "POST",
      body: {
        AUTH_FORM: "Y",
        TYPE: "AUTH",
        backurl: "/",
        USER_LOGIN: login,
        USER_PASSWORD: password,
      },
      query: {
        login: "yes",
        backurl: "/auth/",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.headers["set-cookie"]?.at(0);
  }
}

export class MidisMockAPI implements MidisAPIBase {
  private mockUsers: Record<string, MidisProfile & { password: string }> = {
    ukDBhd: {
      password: "Wutu6w",
      name: "Дамир Лутфрахманов",
      group: "П-38",
      id: this.loginHash("ukDBhd"),
      pic: "https://web.damirlut.online/avatar.png",
      last_activity: Date.now(),
      online: true,
    },
    admin: {
      password: "admin",
      name: "Преподователь",
      group: "Администратор",
      id: 0,
      pic: "https://web.damirlut.online/pchel.png",
      last_activity: Date.now(),
      online: true,
    },
  };

  async login(login: string, password: string): Promise<MidisClient> {
    if (!(login in this.mockUsers)) throw new Error("Midis user not found");
    if (password !== this.mockUsers[login].password)
      throw new Error("Password wrong");

    const user = this.mockUsers[login];

    return {
      ...user,
      token: {
        Cookie: login,
        sessid: `${login}-${password}`
          .split("")
          .map((char) =>
            Math.floor(Math.random() * char.charCodeAt(0)).toString(32)
          )
          .join(""),
      },
    };
  }

  async getUser(id: number) {
    return Object.entries(this.mockUsers)
      .find(([login, user]) => user.id == id)
      ?.at(1) as MidisProfile;
  }

  private loginHash(login: string) {
    return login
      .split("")
      .map((char) => char.charCodeAt(0))
      .reduce((acc, value) => acc + value, 0);
  }
}
