import {FastifyPluginAsync} from 'fastify';

export const autoPrefix = '/exercise';

const ExerciseRoutes: FastifyPluginAsync = async (fastify) => {

	const {midis, authorize} = fastify;

	fastify.addHook('onRequest', authorize);

	fastify.get('/', async (req, res) => {
		console.log(req.user);

		return {status: 'ok', data: []};
	});

};

export default ExerciseRoutes;