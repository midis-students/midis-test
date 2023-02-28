import { FastifyPluginAsync } from "fastify";
import { instanceToPlain } from "class-transformer";
import { Answer } from "../entity/Answer";
import { DataCheckBoxAnswer } from "../entity/Task";
import { Modules } from "../modules";

export const autoPrefix = "answer";

const ProfileRoute: FastifyPluginAsync = async (fastify) => {
  const { authorize, administratorOnly } = fastify;

  fastify.addHook("onRequest", authorize);

	// ===================================

  type CreateAnswerDto = {
		Body: {
			task_id: number;
			type: keyof typeof Modules;
      answer: unknown;
		};
	};

	fastify.post<CreateAnswerDto>('/', async (req, res) => {
    const {task_id, type, answer} = req.body;
    
    if(!Modules[type]) return fastify.httpErrors.notFound("Type not found");

    const task = 

    Modules[type](task_id, answer);
	});
};

export default ProfileRoute;
