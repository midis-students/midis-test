import { Exercise } from '@/entity/Exercise';
import { Payload } from '@/entity/Payload';
import { Task } from '@/entity/Task';
import { FastifyBaseLogger } from 'fastify';

import { exercises } from './tasks';

export async function loadToDatabase(logger: FastifyBaseLogger) {
  for (const exercise of exercises) {
    let exerciseEntity = await Exercise.findOne({
      where: {
        name: exercise.title,
      },
    });

    if (exerciseEntity) {
      await Exercise.delete({
        id: exerciseEntity.id,
      });
    }

    exerciseEntity = Exercise.create({
      name: exercise.title,
      type: exercise.type,
      tasks: [],
    });
    exerciseEntity = await exerciseEntity.save();
    logger.info(`Exercise ${exercise.title} created`);

    for (const task of exercise.tasks) {
      let taskEntity = await Task.findOne({
        where: {
          name: task.title,
        },
      });

      if (!taskEntity) {
        taskEntity = Task.create({
          exercise: exerciseEntity,
          name: task.title,
          type: task.tester.constructor.name.toLowerCase(),
          query: task.query,
          data: JSON.stringify(task.tester.create()),
          payloads: task.payloads,
        });
        taskEntity = await taskEntity.save();
        logger.info(`Task ${task.title} created`);
      } else {
        await Task.update(
          {
            name: task.title,
          },
          {
            exercise: exerciseEntity,
            name: task.title,
            type: task.tester.constructor.name.toLowerCase(),
            query: task.query,
            data: JSON.stringify(task.tester.create()),
            payloads: task.payloads,
          }
        );
        logger.info(`Task ${task.title} updated`);
      }
    }
  }
}
