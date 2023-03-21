import { FastifyPluginAsync } from 'fastify';
import { instanceToPlain } from 'class-transformer';
import { Exercise } from '@/entity/Exercise';
import { Task } from '@/entity/Task';
import Modules from '@/modules';
import { DeepRemove } from '@/lib/Utils';

export const autoPrefix = '/task';

const TaskRoute: FastifyPluginAsync = async fastify => {
  const { authorize, administratorOnly } = fastify;

  fastify.addHook('onRequest', authorize);

  // ===================================

  type CreateTaskDto = {
    Body: {
      exercise_id: number;
      type: keyof typeof Modules;
    };
  };

  fastify.post<CreateTaskDto>(
    '/',
    { onRequest: administratorOnly },
    async req => {
      const { exercise_id, type } = req.body;

      const exercise = await Exercise.findOne({
        where: { id: exercise_id },
        relations: { tasks: true },
      });

      if (!exercise) throw fastify.httpErrors.badRequest(`Exercise not found`);

      if (!(type in Modules))
        throw fastify.httpErrors.badRequest(`Type ${type} not recognized`);

      const testModule = Modules[type];

      const data = new testModule().create();
      const count = await Task.count();

      const task = Task.create({
        exercise,
        type,
        name: 'Задача #' + (count + 1),
        query: 'Описание задачи',
        data: JSON.stringify(data),
      });
      await task.save();

      exercise.tasks.push(task);
      await exercise.save();

      return instanceToPlain(task, {
        enableCircularCheck: true,
      });
    }
  );

  // ===================================

  type GetTaskDto = {
    Querystring: {
      id: number;
    };
  };

  fastify.get<GetTaskDto>('/', async req => {
    const { id } = req.query;

    const task = await Task.findOne({ where: { id } });

    if (!task) return fastify.httpErrors.notFound('Task not found');
    const data = DeepRemove(JSON.parse(task.data), 'value');
    return instanceToPlain({ ...task, data }, { enableCircularCheck: true });
  });

  // ===================================

  type UpdateTaskDto = {
    Body: {
      id: number;
      name?: string;
      query?: string;
      data?: unknown;
    };
  };

  fastify.patch<UpdateTaskDto>(
    '/',
    { onRequest: administratorOnly },
    async req => {
      const { id, ...body } = req.body;
      const task = await Task.findOne({ where: { id } });
      if (task) {
        Object.assign(task, body);
        await task.save();
        const data = JSON.parse(task.data);
        return instanceToPlain(
          { ...task, data },
          { enableCircularCheck: true }
        );
      }

      throw fastify.httpErrors.badRequest(`Task not found`);
    }
  );

  // ===================================

  type DeleteTaskDto = {
    Body: {
      id: number;
    };
  };

  fastify.delete<DeleteTaskDto>(
    '/',
    { onRequest: administratorOnly },
    async req => {
      const { id } = req.body;

      const task = await Task.delete({ id });

      return instanceToPlain(task, { enableCircularCheck: true });
    }
  );
};

export default TaskRoute;
