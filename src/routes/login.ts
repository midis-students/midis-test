import { FastifyPluginAsync } from 'fastify';
import { User } from '@/entity/User';
import { MidisClient } from '@/lib/midis';

export const autoPrefix = '/login';

const LoginRoutes: FastifyPluginAsync = async fastify => {
  const { jwt } = fastify;
  const logger = fastify.log.child({ name: 'Midis' });

  type PostLoginBody = { Body: { login: string; password: string } };

  fastify.post<PostLoginBody>('/', async (req, reply) => {
    if (req.body) {
      const { login, password } = req.body;

      try {
        logger.info('Try login to: ' + login);
        const midisClient = await MidisClient.Login(login, password);
        const profile = await midisClient.getProfile();
        logger.info('Success login to: ' + profile.name);

        let user = await User.findOne({ where: { id: profile.id } });

        if (!user) {
          user = User.create({
            id: profile.id,
          });
        }

        user.name = profile.name;
        user.group = profile.group;

        await user.save();

        const token = jwt.sign({ id: user.id });
        return reply.send({ status: 'ok', token });
      } catch (error: unknown) {
        if (error instanceof Error)
          throw fastify.httpErrors.unauthorized(error.message);
      }
    }
    throw fastify.httpErrors.badRequest('login or password not specified');
  });
};

export default LoginRoutes;
