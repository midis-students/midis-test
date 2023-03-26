import { ExerciseModule } from '@/lib/test-system/ExerciseModule';
import { TaskModule } from '@/lib/test-system/TaskModule';
import { Variant } from '@/lib/test-system/Variant';
import { Input } from '@/modules/input';
import { Radio } from '@/modules/radio';
import { DnDList } from '@/modules/dndlist';

export const exercises = [
  new ExerciseModule()
    .setId('sledovanie_practic')
    .setTitle('Следование')
    .setType('Практика')
    .addTasks(
      new TaskModule()
        .setId('linear_1')
        .setTitle('1. Выполните линейный алгоритм')
        .setQuery(
          `Выполните линейный алгоритм\n1. Дано число 74.\n2. Умножь на 2.\n3. Прибавь 14.\n4. Умножь на 4.\n5. Отними 46.`
        )
        .setTester(new Input().setValue('602')),
      new TaskModule()
        .setId('algorithm_tree')
        .setTitle('2. Алгоритм посадки дерева')
        .setQuery('Алгоритм посадки дерева')
        .setTester(
          new DnDList().addVariants(
            new Variant().setLabel('Опустить в ямку саженец').setValue(1),
            new Variant().setLabel('Полить саженец водой').setValue(3),
            new Variant()
              .setLabel('Засыпать ямку с саженцем землёй')
              .setValue(2),
            new Variant().setLabel('Выкопать в земле ямку').setValue(0)
          )
        ),
      new TaskModule()
        .setId('check_can_execute')
        .setTitle('3. Определите, возможно ли выполнить алгоритм')
        .setQuery(
          'Определите, возможно ли выполнить алгоритм\n1.	Прийти из университета.\n2.	Приготовить обед.\n3.	Посмотреть сериал.\n4.	Пойти в магазин.\nИсполнитель: студент.'
        )
        .setTester(
          new Radio().addVariants(
            new Variant().setLabel('Возможно').setValue(0),
            new Variant().setLabel('Невозможно').setValue(1)
          )
        ),
      new TaskModule()
        .setId('check_variable')
        .setTitle(
          '4. Какое значение получит переменная y после выполнения алгоритма?'
        )
        .setQuery(
          `Какое значение получит переменная y после выполнения алгоритма?\nx: = 2\ny: = 4 * x\ny: = y + 7\ny: = y * x\ny: = y + 9\ny: = y + 4\ny: = y * x`
        )
        .setTester(new Input().setValue('86')),
      new TaskModule()
        .setId('choose_schema')
        .setTitle('5. Выберите подходящую блок-схему')
        .setQuery(
          'Выберите подходящую блок-схему\nПосле работы мама зайдет к подруге, затем заедет в магазин и вернётся домой вечером.'
        )
        .setTester(
          new Radio().addVariants(
            new Variant().setLabel('1').setValue(1),
            new Variant().setLabel('2').setValue(0),
            new Variant().setLabel('3').setValue(0)
          )
        )
        .addPayload(62, 63, 64),
      new TaskModule()
        .setId('sledovanie_6')
        .setTitle('6. Проанализируйте и запишите ответ')
        .setQuery(`Чему будет равно c, если a = 4, b = 9.`)
        .setTester(new Input().setValue('26'))
        .addPayload(65),
      new TaskModule()
        .setId('sledovanie_7')
        .setTitle('7. Проанализируйте и запишите ответ')
        .setQuery(`Чему будет равно c, если a = 9, b = 7.`)
        .setTester(new Input().setValue('46'))
        .addPayload(66)
      //8
      //9
      //10
    ),
  new ExerciseModule()
    .setId('vetvlenie_practic')
    .setTitle('Ветвление')
    .setType('Практика')
    .addTasks(
      //1 Rich
      new TaskModule()
        .setId('vetvlenie_practic_2')
        .setTitle('2. Выберите типовую блок-схему')
        .setQuery(
          `Выберите типовую блок-схему, которая решает данную задачу. Дано целое число. Если оно является положительным, то прибавить к нему 49, в противном случае не изменять его. Вывести полученное число.`
        )
        .setTester(
          new Radio().addVariants(
            new Variant().setLabel('1').setValue(0),
            new Variant().setLabel('2').setValue(1),
            new Variant().setLabel('3').setValue(0)
          )
        )
        .addPayload(9, 10, 11),
      //3 Rich
      new TaskModule()
        .setId('vetvlenie_practic_4')
        .setTitle('4. Ряд чисел')
        .setQuery(
          `Из ряда чисел 7, 14, 19, 22 выпишите те, которые удовлетворяют условию.\nЧисла в ответе идут в порядке возрастания и разделяются запятой без пробелов.\nНапример: 1,2`
        )
        .setTester(new Input().setValue('19,22'))
        .addPayload(12)
      //5 Картинка
      //6 Rich
      //7 Картинка
      //8 DnD с разными блоками
      // 9 Связи
      // 10 Связи
    ),
  new ExerciseModule()
    .setId('for_practic')
    .setTitle('Циклы')
    .setType('Практика')
    .addTasks(
      //1 Связи
      //2 Rich
      new TaskModule()
        .setId('for_practic_3')
        .setTitle('3. Определите значение')
        .setQuery(
          `Определите значение s после выполнения алгоритма.\n\nалг\n      нач\n   цел s, k\n   s := 0\n   нц для k от 3 до 7\n        s := s + 6\n   кц\n   вывод s\nкон`
        )
        .setTester(new Input().setValue('30')),
      //4 Выделение
      new TaskModule()
        .setId('for_practic_5')
        .setTitle('5. Черепашка')
        .setQuery(
          `Исполнитель Черепашка перемещается на экране компьютера, оставляя след в виде линии. В каждый конкретный момент известно положение исполнителя и направление его движения. У исполнителя существует две команды: Вперёд n (где n — целое число), вызывающая передвижение Черепашки на n шагов в направлении движения; Направо m (где m — целое число), вызывающая изменение направления движения на m градусов по часовой стрелке. Запись Повтори k [Команда1 Команда2 КомандаЗ] означает, что последовательность команд в скобках повторится k раз. Черепашке был дан для исполнения следующий алгоритм: Повтори 9 [Вперёд 70 Направо 90]. Какая фигура появится на экране?`
        )
        .setTester(
          new Radio().addVariants(
            new Variant().setLabel('правильный четырёхугольник').setValue(1),
            new Variant().setLabel('правильный восьмиугольник').setValue(0),
            new Variant().setLabel('правильный девятиугольник').setValue(0),
            new Variant().setLabel('незамкнутая ломаная линия').setValue(0)
          )
        ),
      new TaskModule()
        .setId('for_practic_6')
        .setTitle('6. Блок-схема')
        .setQuery(
          `Дана блок-схема. Какое значение будет иметь p на выходе, если x = 16?\nТочность ответа два знака после запятой.`
        )
        .setTester(new Input().setValue('14,25'))
        .addPayload(74)
      //7 Rich
      //8 Rich
      //9 Пазл
      //10 Нет-нет-нет
    ),
  new ExerciseModule()
    .setId('arrays_practic')
    .setTitle('Массивы')
    .setType('Практика')
    .addTasks(
      //1 Rich
      new TaskModule()
        .setId('arrays_practic_2')
        .setTitle('2. Окончание работы алгоритма')
        .setQuery(
          `При каких начальных значениях переменных алгоритм закончит работу?`
        )
        .setTester(
          new Radio().addVariants(
            new Variant().setLabel('a = -2, b = -3').setValue(0),
            new Variant().setLabel('a = -3, b = -2').setValue(0),
            new Variant().setLabel('a = -3, b = -3').setValue(0),
            new Variant().setLabel('a = -4, b = -3').setValue(0),
            new Variant().setLabel('при любых a и b').setValue(1)
          )
        )
        .addPayload(45),
      new TaskModule()
        .setId('arrays_practic_3')
        .setTitle('3. Выходные значения')
        .setQuery(
          `Определить выходные значения переменных A и C после выполнения алгоритма.`
        )
        .setTester(
          new Radio().addVariants(
            new Variant().setLabel('1, -1').setValue(0),
            new Variant().setLabel('1, 0').setValue(0),
            new Variant().setLabel('0, -1').setValue(1),
            new Variant().setLabel('0, 0').setValue(0),
            new Variant().setLabel('зацикливание').setValue(0)
          )
        )
        .addPayload(45),
      //4 Картинка
      new TaskModule()
        .setId('arrays_practic_5')
        .setTitle('5. Подберите подходящую блок-схему')
        .setQuery(
          `Подберите подходящую блок-схему алгоритма для решения данной задачи:\n\nТребуется расположить n элементов массива А(n) в порядке возрастания (убывания) их величин. Для решения задачи используется метод, основанный на поиске минимального (максимального) элемента массива или части массива, называемый сортировка выбором.
          `
        )
        .setTester(
          new Radio().addVariants(
            new Variant().setLabel('1').setValue(0),
            new Variant().setLabel('2').setValue(1),
            new Variant().setLabel('3').setValue(0)
          )
        )
        .addPayload(50, 51, 52)
    ),
];
