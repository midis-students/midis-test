import {FetchClient} from './client';
import {MidisAPIBase, UserToken} from './types';

export class MidisAPI implements MidisAPIBase {

	private client = new FetchClient({baseUrl: 'https://portal.midis.info/'});

	async login(login: string, password: string): Promise<UserToken> {
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
			method: 'POST',
			body: {
				AUTH_FORM: 'Y',
				TYPE: 'AUTH',
				backurl: '/',
				USER_LOGIN: login,
				USER_PASSWORD: password
			},
			query: {
				login: 'yes',
				backurl: '/auth/'
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});

		return response.headers['set-cookie']?.at(0);
	}
}

export class MidisMockAPI implements MidisAPIBase {
	async login(login: string, password: string): Promise<UserToken> {
		return {
			Cookie: `${login}-${password}`,
			sessid: `${login}-${password}`.split('').map(char => Math.floor(Math.random()*char.charCodeAt(0)).toString(32)).join(''),
			user_id: this.loginHash(login)
		};
	}

	private loginHash(login: string) {
		return login.split("").map(char=>char.charCodeAt(0)).reduce((acc,value)=>acc + value, 0);
	}
}