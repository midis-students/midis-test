import { FastifyPluginAsync } from "fastify";
import { instanceToPlain } from "class-transformer";
import { Exercise, Task } from "../entity/Exercise";

export const autoPrefix = "/task";

const TaskRoute: FastifyPluginAsync = async (fastify) => {
  const { authorize, administratorOnly } = fastify;

  fastify.addHook("onRequest", authorize);

  type CreateTaskDto = {
    Body: {
      exercise_id: number;
    };
  };

  fastify.post<CreateTaskDto>(
    "/create",
    { onRequest: administratorOnly },
    async (req, res) => {
      const { exercise_id } = req.body;

      const exercise = await Exercise.findOne({
        where: { id: exercise_id },
        relations: { tasks: true },
      });

      if (!exercise) throw fastify.httpErrors.badRequest(`Exercise not found`);

      console.log(exercise);

      const task = Task.create({
        exercise,
        name: "Task-" + ((await Task.count()) + 1),
      });
      await task.save();

      exercise.tasks.push(task);
      await exercise.save();

      return instanceToPlain(task, {
        enableCircularCheck: true,
      });
    }
  );
};

export default TaskRoute;
