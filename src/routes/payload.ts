import { FastifyPluginAsync } from "fastify";
import { instanceToPlain } from "class-transformer";
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
    "/",
    { onRequest: administratorOnly },
    async (req, res) => {
      const { blob, type } = req.body;

      const payload = Payload.create({
        blob,
        type
      })
      await payload.save();

      return instanceToPlain(payload, {enableCircularCheck: true});
    }
  );

  // ===================================

  type ReadPayloadDto = {
    Querystring: {
    	id: number;
    };
  };

  fastify.get<ReadPayloadDto>(
    "/",
    // { onRequest: administratorOnly },
    async (req, res) => {
      const { id } = req.query;

      const payload = await Payload.findOne({
        where: {id}
      })

      const query = instanceToPlain(payload, {enableCircularCheck: true});

      console.log(query)

      return {ok:true};
    }
  );

  // ===================================

  type UpdatePayloadDto = {
    Body: {
    	id: number;
      blob: string;
    };
  };

  fastify.patch<UpdatePayloadDto>(
    "/",
    { onRequest: administratorOnly },
    async (req, res) => {
      const { id, blob } = req.body;

      const payload = await Payload.update({
        id
      }, {
        blob
      })

      return instanceToPlain(payload, {enableCircularCheck: true});
    }
  );

  // ===================================

  type DeletePayloadDto = {
    Body: {
    	id: number;
    };
  };

  fastify.delete<DeletePayloadDto>(
    "/",
    { onRequest: administratorOnly },
    async (req, res) => {
      const { id } = req.body;

      const payload = await Payload.delete({
        id
      })

      return instanceToPlain(payload, {enableCircularCheck: true});
    }
  );

  
};

export default TaskRoute;
