import fp from 'fastify-plugin';
import Cookie from '@fastify/cookie';
import {FastifyPluginAsync, FastifyReply, FastifyRequest} from 'fastify';
import {MidisAPI} from '../lib/midis';
import {User} from '../entity/User';

declare module 'fastify' {
	interface FastifyInstance {
		midis: MidisAPI;
		authorize: FastifyAsyncHandler;
		user: User;
	}
}

const authorization: FastifyPluginAsync = async (fastify, options) => {
	const {httpErrors, config} = fastify;

	fastify.decorate('midis', new MidisAPI());

	await fastify.register(Cookie, {
		secret: config.COOKIE_SECRET
	});

	fastify.decorate('authorize', authorize);

	fastify.decorateRequest('user', null);


	async function authorize(req: FastifyRequest, reply: FastifyReply) {
		const {user_session} = req.cookies;
		if (!user_session) {
			throw httpErrors.unauthorized('Missing session cookie');
		}

		const cookie = req.unsignCookie(user_session);
		if (!cookie.valid) {
			throw httpErrors.unauthorized('Invalid cookie signature');
		}

		console.log(cookie.value);
	}


};

export default fp(authorization);