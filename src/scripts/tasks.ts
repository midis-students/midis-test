import { ExerciseModule } from '@/lib/test-system/ExerciseModule';
import { TaskModule } from '@/lib/test-system/TaskModule';
import { Variant } from '@/lib/test-system/Variant';
import { Input } from '@/modules/input';
import { Radio } from '@/modules/radio';

export const exercises = [
  new ExerciseModule()
    .setTitle('Первая глава')
    .setType('НеТестовый')
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
