import { Exercise } from '@/entity/Exercise';
import { Task } from '@/entity/Task';
import { ExerciseModule } from '@/lib/test-system/ExerciseModule';
import { TaskModule } from '@/lib/test-system/TaskModule';
import { Variant } from '@/lib/test-system/Variant';
import { Input } from '@/modules/input';
import { Radio } from '@/modules/radio';
import { FastifyBaseLogger } from 'fastify';

const exercises = [
  new ExerciseModule()
    .setTitle('Первая глава')
    .setType('Тестовый')
    .addTasks(
      new TaskModule()
        .setTitle('Title input')
        .setQuery('Query input')
        .setTester(new Input().setValue('value')),
      new TaskModule()
        .setTitle('Title radio')
        .setQuery('Query input')
        .setTester(
          new Radio().addVariants(
            new Variant<number>().setLabel('Вариант 1').setValue(0),
            new Variant<number>().setLabel('Вариант 2').setValue(1)
          )
        ),
      new TaskModule()
        .setTitle('Title radio')
        .setQuery('Query input')
        .setTester(
          new Radio()
            .setType('checkbox')
            .addVariants(
              new Variant<number>().setLabel('Вариант 1').setValue(0),
              new Variant<number>().setLabel('Вариант 2').setValue(1),
              new Variant<number>().setLabel('Вариант 3').setValue(1)
            )
        )
    ),
];

export async function loadToDatabase(logger: FastifyBaseLogger) {
  for (const exercise of exercises) {
    let exerciseEntity = Exercise.create({
      name: exercise.title,
      type: exercise.type,
      tasks: [],
    });

    exerciseEntity = await exerciseEntity.save();

    logger.info(`Exercise ${exercise.title} created`);
    logger.info(exerciseEntity);

    for (const task of exercise.tasks) {
      const taskEntity = Task.create({
        exercise: exerciseEntity,
        name: task.title,
        query: task.query,
        payloads: task.payloads,
        type: task.tester.constructor.name.toLowerCase(),
        data: JSON.stringify(task.tester.create()),
      });

      await taskEntity.save();

      logger.info(`Task ${task.title} created`);
    }
  }
}
