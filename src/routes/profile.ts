import {FastifyPluginAsync} from 'fastify';
import {instanceToPlain} from 'class-transformer';
import {User} from '../entity/User';

export const autoPrefix = 'profile';

const ProfileRoute: FastifyPluginAsync = async (fastify) => {

	const {authorize, administratorOnly} = fastify;

	fastify.addHook('onRequest', authorize);

	fastify.get('/', async (req, res) => {

		const user = req.user;

		return instanceToPlain(user);
	});

	fastify.get('/list', {onRequest: administratorOnly}, async (req, res) => {

		const list = await User.find();

		return list.map(user => instanceToPlain(user));

	});

};

export default ProfileRoute;