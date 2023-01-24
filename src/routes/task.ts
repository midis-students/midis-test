import {FastifyPluginAsync} from 'fastify';
import {instanceToPlain} from 'class-transformer';
import {Exercise} from '../entity/Exercise';
import {Task} from '../entity/Task';

export const autoPrefix = '/task';

const TaskRoute: FastifyPluginAsync = async (fastify) => {
	const {authorize, administratorOnly} = fastify;

	fastify.addHook('onRequest', authorize);

	type GetTaskDto = {
		Querystring: {
			id: number;
		}
	}

	fastify.get<GetTaskDto>('/', async (req, res) => {
		const {id} = req.query;

		const task = await Task.findOne({where: {id}});

		return instanceToPlain(task, {enableCircularCheck: true});
	});

	type CreateTaskDto = {
		Body: {
			exercise_id: number;
			type: string;
		};
	};

	fastify.post<CreateTaskDto>('/create', {onRequest: administratorOnly}, async (req, res) => {
		const {exercise_id, type} = req.body;

		const exercise = await Exercise.findOne({
			where: {id: exercise_id},
			relations: {tasks: true},
		});

		if (!exercise) throw fastify.httpErrors.badRequest(`Exercise not found`);

		const task = Task.create({
			exercise,
			name: 'Задача #' + ((await Task.count()) + 1),
			type
		});
		await task.save();

		exercise.tasks.push(task);
		await exercise.save();

		return instanceToPlain(task, {
			enableCircularCheck: true,
		});
	});
};

export default TaskRoute;
