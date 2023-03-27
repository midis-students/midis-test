import { FastifyPluginAsync } from 'fastify';

export const autoPrefix = '/info';

const InfoRoutes: FastifyPluginAsync = async fastify => {
  fastify.get('/', async (req, reply) => {
    return { ok: true };
  });
};

export default InfoRoutes;
