import { Exercise } from '@/entity/Exercise';
import { Task } from '@/entity/Task';
import { FastifyBaseLogger } from 'fastify';
import fs from 'fs';
import path from 'path';
import { exercises } from './tasks';

const tempFile = 'generator-temp.json';
const tempPath = path.resolve(tempFile);

function LocalStorage<Storage extends Record<string, unknown>>() {
  const storage = {} as Storage;

  if (fs.existsSync(tempPath)) {
    const json = fs.readFileSync(tempPath, 'utf-8');
    const data = JSON.parse(json);
    Object.assign(storage, data);
  }

  const save = () => {
    fs.writeFileSync(tempPath, JSON.stringify(storage, null, 2));
  };
  const get = <T extends keyof Storage>(key: T): Storage[T] | undefined =>
    storage[key];
  const set = <T extends keyof Storage>(key: T, value: Storage[T]) =>
    (storage[key] = value);

  return {
    get,
    set,
    save,
  };
}

/// Storage Format
type Storage = {
  [exercise: string]: {
    id: number;
    tasks: {
      [task: string]: number;
    };
  };
};

const storage = LocalStorage<Storage>();

export async function loadToDatabase(logger: FastifyBaseLogger) {
  for (const exercise of exercises) {
    let storageExercise = storage.get(exercise.id);
    if (storageExercise) {
      await Exercise.update(
        {
          id: storageExercise.id,
        },
        {
          name: exercise.title,
          type: exercise.type,
        }
      );

      logger.info(`Exercise ${exercise.id} updated`);
    } else {
      const exerciseEntity = Exercise.create({
        name: exercise.title,
        type: exercise.type,
        tasks: [],
      });
      await exerciseEntity.save();

      storageExercise = {
        id: exerciseEntity.id,
        tasks: {},
      };

      storage.set(exercise.id, storageExercise);

      logger.info(`Exercise ${exercise.id} created`);
    }

    for (const task of exercise.tasks) {
      const taskStorage = storageExercise.tasks[task.id];

      const taskData = {
        name: task.title,
        type: task.tester.constructor.name.toLowerCase(),
        query: task.query,
        data: JSON.stringify(task.tester.create()),
      };

      if (taskStorage) {
        await Task.update(
          {
            id: taskStorage,
          },
          taskData
        );
        logger.info(`Task ${task.id} updated`);
      } else {
        const taskEntity = Task.create({
          exercise: { id: storageExercise.id },
          ...taskData,
        });
        await taskEntity.save();

        storageExercise.tasks[task.id] = taskEntity.id;
        logger.info(`Task ${task.id} created`);
      }
    }

    storage.save();
  }
}
