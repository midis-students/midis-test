import {FastifyPluginAsync} from 'fastify';

export const autoPrefix = '/login';

const LoginRoutes: FastifyPluginAsync = async (fastify) => {

	const {midis} = fastify;

	type PostLoginBody = { Body: { login: string, password: string } };

	fastify.post<PostLoginBody>('/', async (req, reply) => {
		if (req.body) {
			const {login, password} = req.body;

			const user = await midis.login(login, password);

			/// TODO: cypher user_session in cookies

			reply.setCookie('user_session', JSON.stringify(user), {
				secure: process.env.NODE_ENV === 'production',
				httpOnly: true,
				signed: true,
			});

			return reply.send({status: 'ok', user_id: user.user_id});
		}
		throw fastify.httpErrors.badRequest('login or password not specified');
	});

};

export default LoginRoutes;