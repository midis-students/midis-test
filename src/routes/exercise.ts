import { FastifyPluginAsync } from 'fastify';
import { instanceToPlain } from 'class-transformer';
import { Exercise } from '@/entity/Exercise';

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
      const exercise = await Exercise.create({ name, tasks: [] });
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

  fastify.get<ExerciseGetDTO>('/', async req => {
    const { id } = req.query;
    if (id) {
      const exercise = await Exercise.findOne({
        where: { id },
        relations: {
          tasks: true,
        },
      });
      return instanceToPlain(exercise, {
        enableCircularCheck: true,
      });
    }

    const list = await Exercise.find({
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
      if (exercise) {
        Object.assign(exercise, body);
        await exercise.save();

        return instanceToPlain(exercise, {
          enableCircularCheck: true,
        });
      }

      throw fastify.httpErrors.badRequest(`Exercise not found`);
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
