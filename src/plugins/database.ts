import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { BaseEntity, DataSource, EntitySchema } from 'typeorm';
import fs from 'fs';
import path from 'path';
import { Colors } from '@/lib/Colors';
import * as process from 'process';
import { loadToDatabase } from '@/scripts/taskGenerator';

const DatabasePlugin: FastifyPluginAsync = async fastify => {
  const logger = fastify.log.child({ name: 'Database' });

  type EntityClass = { new (): EntitySchema };
  type ImportModule = Record<string, EntityClass>;

  const entities: EntityClass[] = [];

  const entityPath = path.resolve('src/entity');
  const files = fs
    .readdirSync(entityPath)
    .map(file => path.join(entityPath, file));

  for (const file of files) {
    const module: ImportModule = await import(file);
    Object.values(module).forEach(entity => {
      if (entity.prototype instanceof BaseEntity) {
        entities.push(entity);
      }
    });
  }

  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: false,
    entities,
  });

  await dataSource.initialize();
  if (dataSource.isInitialized) {
    logger.info('MySQL connected to ' + process.env.MYSQL_HOST);

    for (const entity of entities) {
      logger.info(
        `Entity ${Colors.FgYellow + entity.name + Colors.FgCyan} loaded`
      );
    }

    await loadToDatabase(logger.child({ name: 'Script' })).catch(e =>
      logger.error(e)
    );
  } else {
    throw Error(`Can't connect to MySQL server`);
  }
};

export default fp(DatabasePlugin);
