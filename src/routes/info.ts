import { FastifyPluginAsync } from 'fastify';

export const autoPrefix = '/ping';

const PingRoutes: FastifyPluginAsync = async fastify => {
  fastify.get('/', async (req, reply) => {
    return { ok: true };
  });
};

export default PingRoutes;
