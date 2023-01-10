import {FastifyPluginAsync} from 'fastify';
import {Exercise} from '../entity/Exercise';
import {instanceToPlain} from 'class-transformer';

export const autoPrefix = '/exercise';

const ExerciseRoutes: FastifyPluginAsync = async (fastify) => {

	const {midis, authorize, administratorOnly} = fastify;

	fastify.addHook('onRequest', authorize);

	fastify.get('/', async (req, res) => {

		const list = await Exercise.find({
			relations: {
				tasks: true
			}
		});

		return list.map(exercise => instanceToPlain(exercise));
	});

	type ExerciseCreateDTO = {
		Body: {
			name: string;
		}
	}

	fastify.post<ExerciseCreateDTO>('/create', {onRequest: administratorOnly}, async (req, res) => {
		const {name} = req.body;
		const exercise = await Exercise.create({name});
		await exercise.save();

		return instanceToPlain(exercise);
	});

};

export default ExerciseRoutes;