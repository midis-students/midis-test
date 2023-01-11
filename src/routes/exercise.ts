import { FastifyPluginAsync } from "fastify";
import { Exercise } from "../entity/Exercise";
import { instanceToPlain } from "class-transformer";

export const autoPrefix = "/exercise";

const ExerciseRoutes: FastifyPluginAsync = async (fastify) => {
  const { midis, authorize, administratorOnly } = fastify;

  fastify.addHook("onRequest", authorize);

  fastify.get("/", async (req, res) => {
    const list = await Exercise.find({
      relations: {
        tasks: true,
      },
    });

    return list.map((exercise) => instanceToPlain(exercise));
  });

  type ExerciseCreateDTO = {
    Body: {
      name: string;
    };
  };

  fastify.post<ExerciseCreateDTO>(
    "/create",
    { onRequest: administratorOnly },
    async (req, res) => {
      const { name } = req.body;
      const exercise = await Exercise.create({ name });
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
    "/update",
    { onRequest: administratorOnly },
    async (req, res) => {
      const { id, ...body } = req.body;
      const exercise = await Exercise.findOne({ where: { id } });
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
