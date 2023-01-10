import {FastifyPluginAsync} from 'fastify';
import {User} from '../entity/User';

export const autoPrefix = '/login';

const LoginRoutes: FastifyPluginAsync = async (fastify) => {

	const {midis, jwt} = fastify;

	type PostLoginBody = { Body: { login: string, password: string } };

	fastify.post<PostLoginBody>('/', async (req, reply) => {
		if (req.body) {
			const {login, password} = req.body;

			try {

				const midisUser = await midis.login(login, password);

				let user = await User.findOne({where: {id: midisUser.id}});

				if (!user) {
					user = User.create({
						id: midisUser.id,
					});
				}

				user.name = midisUser.name;
				user.group = midisUser.group;
				user.midis_token = JSON.stringify(midisUser.token);

				await user.save();

				const token = jwt.sign({id: user.id});
				return reply.send({status: 'ok', token,});
			} catch (err: any) {
				throw fastify.httpErrors.unauthorized(err.message);
			}
		}
		throw fastify.httpErrors.badRequest('login or password not specified');
	});
};

export default LoginRoutes;