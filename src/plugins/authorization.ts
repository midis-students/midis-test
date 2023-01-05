import fp from 'fastify-plugin';
import JWT, {FastifyJWT} from '@fastify/jwt';
import {FastifyPluginAsync, FastifyReply, FastifyRequest} from 'fastify';
import {MidisAPI, MidisMockAPI} from '../lib/midis';
import {User} from '../entity/User';

declare module 'fastify' {
	interface FastifyInstance {
		midis: MidisAPI;
		authorize: FastifyAsyncHandler;
	}
}

declare module '@fastify/jwt' {
	interface FastifyJWT {
		payload: { id: number };
		user: User;
	}
}

const useMock = true;

const authorization: FastifyPluginAsync = async (fastify, options) => {
	const {httpErrors, config} = fastify;

	fastify.decorate('midis', useMock ? new MidisMockAPI() : new MidisAPI());

	fastify.register(JWT, {
		secret: process.env.SECRET,
	});

	fastify.decorate('authorize', authorize);


	async function authorize(req: FastifyRequest, reply: FastifyReply) {
		try {
			await req.jwtVerify();
			const user = await User.findOne({where: {id: req.user.id}});
			if (user) {
				return req.user = user;
			}
			throw httpErrors.unauthorized('User not found');
		} catch (err) {
			throw httpErrors.unauthorized('Bad jwt token');
		}
	}

};

export default fp(authorization);