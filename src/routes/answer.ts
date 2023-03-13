import { FastifyPluginAsync } from 'fastify';
import Modules from '@/modules';
import { Task } from '@/entity/Task';
export const autoPrefix = 'answer';
import { TesterModuleUnknown } from '@/lib/test-system/module';
import { Answer } from '@/entity/Answer';
import { instanceToPlain } from 'class-transformer';

const ProfileRoute: FastifyPluginAsync = async fastify => {
  const { authorize } = fastify;

  fastify.addHook('onRequest', authorize);

  // ===================================

  type CreateAnswerDto = {
    Body: {
      task_id: number;
      type: keyof typeof Modules;
      answer: unknown;
    };
  };

  fastify.post<CreateAnswerDto>('/', async req => {
    const { task_id, type } = req.body;

    if (!(type in Modules))
      throw fastify.httpErrors.badRequest(`Type ${type} not recognized`);

    const task = await Task.findOne({
      where: { id: task_id },
    });

    if (!task) throw fastify.httpErrors.badRequest(`Task not found`);

    const testModule: TesterModuleUnknown = Modules[type];

    const isCorrect = new testModule()
      .setData(JSON.parse(task.data))
      .assert(req.body.answer);

    const answer = Answer.create({
      task,
      user: req.user,
      isCorrect,
    });
    await task.save();

    return instanceToPlain(answer, {
      enableCircularCheck: true,
    });
  });
};

export default ProfileRoute;
