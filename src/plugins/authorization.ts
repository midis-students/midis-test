import fp from 'fastify-plugin';
import JWT from '@fastify/jwt';
import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { MidisAPI, MidisMockAPI } from '@/lib/midis';
import { Role, User } from '@/entity/User';
import { MidisAPIBase } from '@/lib/midis/types';

declare module 'fastify' {
  interface FastifyInstance {
    midis: MidisAPIBase;
    authorize: FastifyAsyncHandler;
    administratorOnly: FastifyAsyncHandler;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { id: number };
    user: User;
  }
}

const useMock = true;

const authorization: FastifyPluginAsync = async fastify => {
  const { httpErrors } = fastify;

  fastify.decorate('midis', useMock ? new MidisMockAPI() : new MidisAPI());

  fastify.register(JWT, {
    secret: process.env.SECRET,
  });

  fastify.decorate('authorize', authorize);
  fastify.decorate('administratorOnly', administratorOnly);

  async function authorize(req: FastifyRequest) {
    try {
      await req.jwtVerify();
      const user = await User.findOne({ where: { id: req.user.id } });

      if (user) {
        return (req.user = user);
      }
    } catch (err) {
      throw httpErrors.unauthorized('Bad jwt token');
    }
  }

  async function administratorOnly(req: FastifyRequest) {
    if (req.user.role === Role.Admin || req.user.role === Role.Teacher)
      return true;
    throw httpErrors.forbidden();
  }
};

export default fp(authorization);
