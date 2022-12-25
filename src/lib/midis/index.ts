import {FetchClient} from "./client";

export class MidisAPI {

    private client = new FetchClient({baseUrl: "https://portal.midis.info/"})

    async login(login: string, password: string) {
        const Cookie = await this.getCookie(login, password);
        const response = await this.client.request(
            'company/personal/user/1/common_security/',
            {
                method: 'GET',
                query: {
                    IFRAME: 'Y',
                    IM_AJAX_CALL: 'Y',
                },
                headers: {
                    Cookie,
                },
            },
        );
        if (response.statusCode != 200) {
            throw new Error(`Can't get bitrix sessid`);
        }

        let bx = '';
        for (let group of response.body.matchAll(/\(window\.BX\|\|top\.BX\)\.message\((.*)\)/gm)) {
            bx = group[1].replace(/\'/g, '"');
        }

        if (bx) {
            const {bitrix_sessid, USER_ID} = JSON.parse(bx) as {
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

    private async getCookie(login: string, password: string) {
        const response = await this.client.request(`/auth/index.php`, {
            method: "POST",
            body: {
                AUTH_FORM: "Y",
                TYPE: "AUTH",
                backurl: "/",
                USER_LOGIN: login,
                USER_PASSWORD: password
            },
            query: {
                login: "yes",
                backurl: "/auth/"
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        return response.headers['set-cookie']?.at(0)
    }
}
