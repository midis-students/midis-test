import {FastifyPluginAsync} from 'fastify';
import {instanceToPlain} from 'class-transformer';
import {Exercise} from '../entity/Exercise';
import {DataCheckBox, DataDragAndDrop, DataInput, DataRaw, Task} from '../entity/Task';

export const autoPrefix = '/task';

const TaskRoute: FastifyPluginAsync = async (fastify) => {
	const {authorize, administratorOnly} = fastify;

	fastify.addHook('onRequest', authorize);

	// ===================================

	type CreateTaskDto = {
		Body: {
			exercise_id: number;
			type: "radio" | "input" | "raw" | "dnd";
		};
	};

	fastify.post<CreateTaskDto>('/', {onRequest: administratorOnly}, async (req, res) => {
		const {exercise_id, type} = req.body;

		const exercise = await Exercise.findOne({
			where: {id: exercise_id},
		});

		if (!exercise) throw fastify.httpErrors.badRequest(`Exercise not found`);

		let data: DataCheckBox | DataInput | DataRaw | DataDragAndDrop = {
			type:"raw",
			text: "",
			objects:{}
		};

		switch (type) {
			case "radio":
				data = {
					type,
					subtype: "radio",
					options:[]
				}
				break;
			case "input":
				data = {
					type,
					placeholder: "type some text",
					answer:"answer"
				}
				break;
			case "dnd":
				data = {
					type,
					blocks:[
						{
							text:"True",
							answer:true
						},
						{
							text:"ne True",
							answer:false
						}
					]
				}
				break;
		}

		const task: Task = Task.create({
			exercise,
			type,
			name: "Задача #" + ((await Task.count()) + 1),
			query: "Описание задачи",
			data
		});
		await task.save();

		exercise.tasks.push(task);
		await exercise.save();

		return instanceToPlain(task, {
			enableCircularCheck: true,
		});
	});

	// ===================================

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

	// ===================================

	type UpdateTaskDto = {
		Body: {
			id: number;
			name?: string;
			query?: string;
			data?: DataInput | DataCheckBox | DataRaw | DataDragAndDrop;
		};
	}

	fastify.patch<UpdateTaskDto>('/', {onRequest: administratorOnly}, async (req, res) => {
		const {id, ...body} = req.body;
		const task = await Task.findOne({where: {id}});
		if (task) {
			Object.assign(task, body);
			await task.save();

			return instanceToPlain(task, {enableCircularCheck: true});
		}

		throw fastify.httpErrors.badRequest(`Task not found`);
	});

	// ===================================

	type DeleteTaskDto = {
		Body: {
			id: number;
		}
	}

	fastify.delete<DeleteTaskDto>('/', {onRequest: administratorOnly}, async (req, res) => {
		const {id} = req.body;

		const task = await Task.delete({id});

		return instanceToPlain(task, {enableCircularCheck: true});
	});
};

export default TaskRoute;
