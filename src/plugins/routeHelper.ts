import fp from 'fastify-plugin';
import {FastifyPluginAsync} from 'fastify';
import {Colors} from '../lib/Colors';

const routeHelper: FastifyPluginAsync = async (fastify) => {

	const logger = fastify.log.child({name: 'Route'});

	const methodColor: Record<string, Colors> = {
		'POST': Colors.FgMagenta,
		'GET': Colors.FgGreen
	};

	fastify.addHook('onRoute', route => {
		const method = methodColor[route.method.toString()] + route.method + Colors.FgCyan;
		logger.info(`${method} ${Colors.FgWhite + route.url}`);
	});
};

export default fp(routeHelper);