import {FastifyPluginAsync} from 'fastify';
import {instanceToPlain} from 'class-transformer';
import {Exercise} from '../entity/Exercise';
import {DataCheckBox, DataDragAndDrop, DataInput, DataRaw, Task} from '../entity/Task';

export const autoPrefix = '/task';

export function toJson(task: Task) {
	return {...task, data:task?.json ?? {}}
}

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
			relations: {tasks: true},
		});

		if (!exercise) throw fastify.httpErrors.badRequest(`Exercise not found`);

		var data: DataCheckBox | DataInput | DataRaw | DataDragAndDrop = {
			type: "raw",
			text: "",
			objects:{},
			payloads:[]
		};

		switch (type) {
			case "radio":
				data = {
					type,
					subtype: "radio",
					options:[],
					payloads:[]
				}
				break;
			case "input":
				data = {
					type,
					placeholder: "type some text",
					answer:"answer",
					payloads:[]
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
					],
					payloads:[]
				}
				break;
		}

		const task: Task = Task.create({
			exercise,
			type,
			name: "Задача #" + ((await Task.count()) + 1),
			query: "Описание задачи",
			data:JSON.stringify(data)
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

		if(!task) return fastify.httpErrors.notFound("Task not found");

		return instanceToPlain(toJson(task), {enableCircularCheck: true});
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

			return instanceToPlain(toJson(task), {enableCircularCheck: true});
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
