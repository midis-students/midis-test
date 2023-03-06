import { Task } from '@/entity/Task';
import { TaskModule } from '@/lib/test-system/TaskModule';
import { Variant } from '@/lib/test-system/Variant';
import { Input } from '@/modules/input';
import { Radio } from '@/modules/radio';

const questions = [
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
    ),
];

const buildQuestions = questions.map(quest => {
  const task = new Task();
  task.name = quest.title;
  task.query = quest.query;
  task.payloads = [];
  task.payloads.push(...quest.payloads);
  task.data = JSON.stringify(quest.tester.create());
  return task;
});

console.log(buildQuestions);
