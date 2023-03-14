import { ExerciseModule } from '@/lib/test-system/ExerciseModule';
import { TaskModule } from '@/lib/test-system/TaskModule';
import { Variant } from '@/lib/test-system/Variant';
import { Input } from '@/modules/input';
import { Radio } from '@/modules/radio';
import { DnDList } from '@/modules/dndlist';

export const exercises = [
  new ExerciseModule()
    .setTitle('Ветвления')
    .setType('Практика')
    .addTasks(
      new TaskModule()
        .setTitle('1.	Выполните линейный алгоритм')
        .setQuery(
          `Выполните линейный алгоритм\n1. Дано число 74.\n2. Умножь на 2.\n3. Прибавь 14.\n4. Умножь на 4.\n5. Отними 46.`
        )
        .setTester(new Input().setValue('602')),
      new TaskModule()
        .setTitle('2.	Алгоритм посадки дерева')
        .setQuery('Алгоритм посадки дерева')
        .setTester(
          new DnDList().setData([
            new Variant<number>()
              .setLabel('Опустить в ямку саженец')
              .setValue(1),
            new Variant<number>().setLabel('Полить саженец водой').setValue(3),
            new Variant<number>()
              .setLabel('Засыпать ямку с саженцем землёй')
              .setValue(2),
            new Variant<number>().setLabel('Выкопать в земле ямку').setValue(0),
          ])
        ),
      new TaskModule()
        .setTitle('3.	Определите, возможно ли выполнить алгоритм')
        .setQuery(
          'Определите, возможно ли выполнить алгоритм\n1.	Прийти из университета.\n2.	Приготовить обед.\n3.	Посмотреть сериал.\n4.	Пойти в магазин.\nИсполнитель: студент.'
        )
        .setTester(
          new Radio().addVariants(
            new Variant<number>().setLabel('Возможно').setValue(0),
            new Variant<number>().setLabel('Невозможно').setValue(1)
          )
        ),
      new TaskModule()
        .setTitle(
          '4.	Какое значение получит переменная y после выполнения алгоритма?'
        )
        .setQuery(
          `Какое значение получит переменная y после выполнения алгоритма?\nx: = 2\ny: = 4 * x\ny: = y + 7\ny: = y * x\ny: = y + 9\ny: = y + 4\ny: = y * x`
        )
        .setTester(new Input().setValue('86')),
      new TaskModule()
        .setTitle('5.	Выберите подходящую блок-схему')
        .setQuery(
          'Выберите подходящую блок-схему\nПосле работы мама зайдет к подруге, затем заедет в магазин и вернётся домой вечером.'
        )
        .setTester(
          new Radio().addVariants(
            new Variant<number>().setLabel('1').setValue(1),
            new Variant<number>().setLabel('2').setValue(0),
            new Variant<number>().setLabel('3').setValue(0)
          )
        )
      // new TaskModule()
      //   .setTitle('Title radio')
      //   .setQuery('Query input')
      //   .setTester(
      //     new Radio()
      //       .setType('checkbox')
      //       .addVariants(
      //         new Variant<number>().setLabel('Вариант 1').setValue(0),
      //         new Variant<number>().setLabel('Вариант 2').setValue(1),
      //         new Variant<number>().setLabel('Вариант 3').setValue(1)
      //       )
      //   )
    ),
];
