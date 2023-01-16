import { FastifyPluginAsync } from "fastify";
import { instanceToPlain } from "class-transformer";
import { Exercise, Task } from "../entity/Exercise";
import { Payload, PayloadType } from "../entity/Payload";

export const autoPrefix = "/payload";

const TaskRoute: FastifyPluginAsync = async (fastify) => {
  const { authorize, administratorOnly } = fastify;

  fastify.addHook("onRequest", authorize);

  
  type CreatePayloadDto = {
    Body: {
    	blob: string;
      type: PayloadType;
    };
  };

  fastify.post<CreatePayloadDto>(
    "/create",
    { onRequest: administratorOnly },
    async (req, res) => {
      const { blob, type } = req.body;

      const payload = Payload.create({
        blob,
        type
      })
      await payload.save();

      return instanceToPlain(payload);
    }
  );

  // ===================================

  type ReadPayloadDto = {
    Querystring: {
    	id: number;
    };
  };

  fastify.get<ReadPayloadDto>(
    "/get",
    { onRequest: administratorOnly },
    async (req, res) => {
      const { id } = req.query;

      const payload = await Payload.findOne({
        where: {id}
      })

      return instanceToPlain(payload);
    }
  );

  // ===================================

  type UpdatePayloadDto = {
    Body: {
    	id: number;
      blob: string;
    };
  };

  fastify.post<UpdatePayloadDto>(
    "/update",
    { onRequest: administratorOnly },
    async (req, res) => {
      const { id, blob } = req.body;

      const payload = await Payload.update({
        id
      }, {
        blob
      })

      return instanceToPlain(payload);
    }
  );

  // ===================================

  type DeletePayloadDto = {
    Body: {
    	id: number;
    };
  };

  fastify.post<DeletePayloadDto>(
    "/delete",
    { onRequest: administratorOnly },
    async (req, res) => {
      const { id } = req.body;

      const payload = await Payload.delete({
        id
      })

      return instanceToPlain(payload);
    }
  );

  
};

export default TaskRoute;
