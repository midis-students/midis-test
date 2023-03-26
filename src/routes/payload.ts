import { FastifyPluginAsync } from 'fastify';
import { instanceToPlain } from 'class-transformer';
import { Payload, PayloadType } from '@/entity/Payload';

export const autoPrefix = '/payload';

const TaskRoute: FastifyPluginAsync = async fastify => {
  const { administratorOnly } = fastify;

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
    async req => {
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
    Params: {
      id: number;
    };
  };

  fastify.get<ReadPayloadDto>('/:id', async req => {
    const { id } = req.params;

    const payload: Payload | null = await Payload.findOne({
      where: { id },
    });

    if (!payload) return fastify.httpErrors.notFound('Payload not found');

    return payload.blob;
  });

  // ===================================

  type UpdatePayloadDto = {
    Params: {
      id: number;
    };
    Body: {
      blob: string;
    };
  };

  fastify.patch<UpdatePayloadDto>(
    '/:id',
    { onRequest: administratorOnly },
    async req => {
      const { id } = req.params;
      const { blob } = req.body;

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
    Params: {
      id: number;
    };
  };

  fastify.delete<DeletePayloadDto>(
    '/:id',
    { onRequest: administratorOnly },
    async req => {
      const { id } = req.params;

      const payload = await Payload.delete({
        id,
      });

      return instanceToPlain(payload, { enableCircularCheck: true });
    }
  );
};

export default TaskRoute;
