import {FastifyPluginAsync} from 'fastify';
import {User} from '../entity/User';

export const autoPrefix = '/login';

const LoginRoutes: FastifyPluginAsync = async (fastify) => {

	const {midis, jwt} = fastify;

	type PostLoginBody = { Body: { login: string, password: string } };

	fastify.post<PostLoginBody>('/', async (req, reply) => {
		if (req.body) {
			const {login, password} = req.body;

			const midisuser = await midis.login(login, password);

			let user = await User.findOne({where: {midis_id: midisuser.user_id}});

			if (!user) {
				user = User.create({midis_id: midisuser.user_id});
			}

			user.name = login;
			user.group = 'П-38';
			user.midis_token = JSON.stringify({Cookie: midisuser.Cookie, sessid: midisuser.sessid});

			await user.save();

			const token = jwt.sign({id: user.id});
			return reply.send({status: 'ok', token});
		}
		throw fastify.httpErrors.badRequest('login or password not specified');
	});
};

export default LoginRoutes;