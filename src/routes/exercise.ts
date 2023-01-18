import {FastifyPluginAsync} from 'fastify';
import {instanceToPlain} from 'class-transformer';
import {Exercise} from '../entity/Exercise';

export const autoPrefix = '/exercise';

const ExerciseRoutes: FastifyPluginAsync = async (fastify) => {
	const {midis, authorize, administratorOnly} = fastify;

	fastify.addHook('onRequest', authorize);

	type ExerciseGetDTO = {
		Querystring: {
			id?: number;
		}
	}

	fastify.get<ExerciseGetDTO>('/', async (req, res) => {

		const {id} = req.query;
		if (id) {
			const exercise = await Exercise.findOne({
				where: {id},
				relations: {
					tasks: true
				}
			});
      return instanceToPlain(exercise, {
        enableCircularCheck: true
      })
		}

		const list = await Exercise.find({
			relations: {
				tasks: true,
			},
		});

		return list.map((exercise) =>
			instanceToPlain(exercise, {
				enableCircularCheck: true,
			})
		);
	});

	type ExerciseCreateDTO = {
		Body: {
			name: string;
		};
	};

	fastify.post<ExerciseCreateDTO>(
		'/create',
		{onRequest: administratorOnly},
		async (req, res) => {
			const {name} = req.body;
			const exercise = await Exercise.create({name, tasks: []});
			await exercise.save();

			return instanceToPlain(exercise);
		}
	);

	type ExerciseUpdateDTO = {
		Body: Partial<Exercise> & {
			id: number;
		};
	};

	fastify.post<ExerciseUpdateDTO>(
		'/update',
		{onRequest: administratorOnly},
		async (req, res) => {
			const {id, ...body} = req.body;
			const exercise = await Exercise.findOne({where: {id}});
			if (exercise) {
				Object.assign(exercise, body);
				await exercise.save();

				return exercise;
			}

			throw fastify.httpErrors.badRequest(`Exercise not found`);
		}
	);
};

export default ExerciseRoutes;
