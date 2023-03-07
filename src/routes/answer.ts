import { FastifyPluginAsync } from 'fastify';
import Modules from '@/modules';
export const autoPrefix = 'answer';

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
    const { type } = req.body;

    if (!Modules[type]) return fastify.httpErrors.notFound('Type not found');

    //const task = Modules[type](task_id, answer);
  });
};

export default ProfileRoute;
