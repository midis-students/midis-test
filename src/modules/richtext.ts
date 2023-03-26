import { TesterModule } from '@/lib/test-system/module';
import { Variant } from '@/lib/test-system/Variant';

/*

 
  1) Ввести {id1, }
  2) Вычислить площадь прямоугольника по формуле P = {text} * ( a + {text} )
  3) Вывести результат {select, a / P / d}

  options = [
    {
      id: "id1",
      type:"select",
      args: ["стороны параллелограмма c, d ", "площадь параллелограмма", "стороны параллелограмма a, b" ]
    },
    {
      id: "id2",
      type: "text",
      args: []
    },
    {
      id: "id3",
      type: "text",
      args: []
    }
  ]
*/

// type VariantExt = Variant<number>;

// type ModuleContainer = {
//   list: Array<{
//     id: string;
//     value: number;
//   }>;
// };

// export type RichTextAcceptBody = {
//   list: Array<{
//     id: string;
//     value: number;
//   }>;
// };

// type RichTextSetData = {
//   list: Array<{
//     id: string;
//     value: number;
//   }>;
// };

// export class RichText extends TesterModule<ModuleContainer> {
//   type: 'radio' | 'checkbox';

//   constructor() {
//     super();
//     this.container = {
//       list: [],
//     };
//   }

//   create(): ModuleContainer {
//     return this.container;
//   }

//   setData(body: RadioSetData) {
//     this.container.variants = body.list.map(variant => {
//       return new Variant<number>(variant.id).setValue(variant.value);
//     });
//     return this;
//   }

//   setType(type: 'radio' | 'checkbox') {
//     this.type = type;
//     return this;
//   }

//   addVariants(...variants: VariantExt[]) {
//     this.container.variants.push(...variants);
//     return this;
//   }

//   assert(body: RadioAcceptBody): boolean {
//     let isCorrect = false;

//     for (const value of body.list) {
//       const variant = this.container.variants.find(
//         variant => variant.id === value
//       );
//       if (variant && variant.value === 1) {
//         isCorrect = true;
//       }
//     }

//     return isCorrect;
//   }
// }
