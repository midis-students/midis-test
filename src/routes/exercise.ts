import { FastifyPluginAsync } from 'fastify';
import { instanceToPlain } from 'class-transformer';
import { Exercise } from '@/entity/Exercise';
import { Answer } from '@/entity/Answer';
import { In } from 'typeorm';
import { Task } from '@/entity/Task';

export const autoPrefix = '/exercise';

const ExerciseRoutes: FastifyPluginAsync = async fastify => {
  const { authorize, administratorOnly } = fastify;

  fastify.addHook('onRequest', authorize);

  // ===================================

  type ExerciseCreateDTO = {
    Body: {
      name: string;
    };
  };

  fastify.post<ExerciseCreateDTO>(
    '/',
    { onRequest: administratorOnly },
    async req => {
      const { name } = req.body;
      const exercise = Exercise.create({ name, tasks: [] });
      await exercise.save();

      return instanceToPlain(exercise);
    }
  );

  // ===================================

  type ExerciseGetDTO = {
    Querystring: {
      id?: number;
    };
  };

  type ExerciseOutput = Exercise & {
    tasks: number;
  };

  type TaskWithAnswer = Task & {
    answer?: boolean | null;
  };

  fastify.get<ExerciseGetDTO>('/', async req => {
    const { id } = req.query;
    if (id) {
      const exercise = await Exercise.findOne({
        where: { id },
        relations: {
          tasks: true,
        },
      });

      if (!exercise) throw fastify.httpErrors.badRequest(`Exercise not found`);

      const answers = await Answer.find({
        where: {
          task: { id: In(exercise.tasks.map(({ id }) => id)) },
          user: { id: req.user.id },
        },
        relations: {
          task: true,
        },
      });
      exercise.tasks = exercise.tasks.map((task: TaskWithAnswer) => {
        const answer = answers.find(answer => answer.task.id == task.id);
        task.answer = answer?.isCorrect ?? null;
        return task;
      });

      return instanceToPlain(exercise, {
        enableCircularCheck: true,
      });
    }

    const list: Exercise[] | ExerciseOutput[] = await Exercise.find({
      relations: {
        tasks: true,
      },
    });

    return list.map(exercise =>
      instanceToPlain(exercise, {
        enableCircularCheck: true,
      })
    );
  });

  // ===================================

  type ExerciseUpdateDTO = {
    Body: Partial<Exercise> & {
      id: number;
    };
  };

  fastify.patch<ExerciseUpdateDTO>(
    '/',
    { onRequest: administratorOnly },
    async req => {
      const { id, ...body } = req.body;
      const exercise = await Exercise.findOne({ where: { id } });
      if (!exercise) throw fastify.httpErrors.badRequest(`Exercise not found`);

      Object.assign(exercise, body);
      await exercise.save();

      return instanceToPlain(exercise, {
        enableCircularCheck: true,
      });
    }
  );

  // ===================================

  type ExerciseDeleteDTO = {
    Body: {
      id: number;
    };
  };

  fastify.delete<ExerciseDeleteDTO>(
    '/',
    { onRequest: administratorOnly },
    async req => {
      const { id } = req.body;
      const exercise = await Exercise.delete({ id });
      return instanceToPlain(exercise, {
        enableCircularCheck: true,
      });
    }
  );
};

export default ExerciseRoutes;
