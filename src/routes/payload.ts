import { FastifyPluginAsync } from 'fastify';
import { instanceToPlain } from 'class-transformer';
import { Payload, PayloadType } from '@/entity/Payload';

export const autoPrefix = '/payload';

const TaskRoute: FastifyPluginAsync = async fastify => {
  const { authorize, administratorOnly } = fastify;

  type CreatePayloadDto = {
    Body: {
      blob: string;
      type: PayloadType;
      description: string;
    };
  };

  fastify.post<CreatePayloadDto>(
    '/',
    { onRequest: administratorOnly },
    async (req, res) => {
      const { blob, type, description } = req.body;

      const payload = Payload.create({
        blob: Buffer.from(blob, 'base64'),
        type,
        description,
      });
      await payload.save();

      return instanceToPlain(payload, { enableCircularCheck: true });
    }
  );

  // ===================================

  type ReadPayloadDto = {
    Querystring: {
      id: number;
    };
  };

  fastify.get<ReadPayloadDto>('/', async (req, res) => {
    const { id } = req.query;

    const payload: Payload | null = await Payload.findOne({
      where: { id },
    });

    if (!payload) return fastify.httpErrors.notFound('Payload not found');

    return payload.blob;
  });

  // ===================================

  type UpdatePayloadDto = {
    Body: {
      id: number;
      blob: string;
    };
  };

  fastify.patch<UpdatePayloadDto>(
    '/',
    { onRequest: administratorOnly },
    async req => {
      const { id, blob } = req.body;

      const payload = await Payload.update(
        {
          id,
        },
        {
          blob: Buffer.from(blob, 'base64'),
        }
      );

      return instanceToPlain(payload, { enableCircularCheck: true });
    }
  );

  // ===================================

  type DeletePayloadDto = {
    Body: {
      id: number;
    };
  };

  fastify.delete<DeletePayloadDto>(
    '/',
    { onRequest: administratorOnly },
    async req => {
      const { id } = req.body;

      const payload = await Payload.delete({
        id,
      });

      return instanceToPlain(payload, { enableCircularCheck: true });
    }
  );
};

export default TaskRoute;
