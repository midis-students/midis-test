import { FastifyPluginAsync } from 'fastify';
import { instanceToPlain } from 'class-transformer';
import { Exercise } from '@/entity/Exercise';
import { Task } from '@/entity/Task';
import Modules from '@/modules';
import { DeepRemove } from '@/lib/Utils';
import { Answer } from '@/entity/Answer';

export const autoPrefix = '/task';

const TaskRoute: FastifyPluginAsync = async fastify => {
  const { authorize, administratorOnly } = fastify;

  fastify.addHook('onRequest', authorize);

  // ===================================

  type CreateTaskDto = {
    Body: {
      type: keyof typeof Modules;
    };
    Params: {
      exercise_id: number;
    };
  };

  fastify.post<CreateTaskDto>(
    '/:exercise_id',
    { onRequest: administratorOnly },
    async req => {
      const { exercise_id } = req.params;
      const { type } = req.body;

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
    Params: {
      id: number;
    };
  };

  fastify.get<GetTaskDto>('/:id', async req => {
    const { id } = req.params;

    const task = await Task.findOne({
      where: { id },
      relations: ['payloads'],
    });

    if (!task) return fastify.httpErrors.notFound('Task not found');

    const answer = await Answer.findOne({
      where: {
        task: { id: task.id },
        user: { id: req.user.id },
      },
      relations: {
        task: true,
      },
    });

    const data = DeepRemove(JSON.parse(task.data), 'value');
    return instanceToPlain(
      { ...task, data, answer: answer?.isCorrect ?? null },
      { enableCircularCheck: true }
    );
  });

  // ===================================

  type UpdateTaskDto = {
    Params: {
      id: number;
    };
    Body: {
      name?: string;
      query?: string;
      data?: unknown;
    };
  };

  fastify.patch<UpdateTaskDto>(
    '/:id',
    { onRequest: administratorOnly },
    async req => {
      const { id } = req.params;
      const task = await Task.findOne({ where: { id } });
      if (task) {
        Object.assign(task, req.body);
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
    Params: {
      id: number;
    };
  };

  fastify.delete<DeleteTaskDto>(
    '/:id',
    { onRequest: administratorOnly },
    async req => {
      const { id } = req.params;

      const task = await Task.delete({ id });

      return instanceToPlain(task, { enableCircularCheck: true });
    }
  );
};

export default TaskRoute;
