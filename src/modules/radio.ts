import { TesterModule } from '@/lib/test-system/module';
import { Variant } from '@/lib/test-system/Variant';

type VariantExt = Variant<number>;

type ModuleContainer = {
  variants: VariantExt[];
};

export type RadioAcceptBody = string[];

export class Radio extends TesterModule<ModuleContainer> {
  type: 'radio' | 'checkbox';

  constructor() {
    super();
    this.container = {
      variants: [],
    };
  }

  create(): ModuleContainer {
    return this.container;
  }

  setData(body: ModuleContainer) {
    // this.container.variants = body.list.map(variant => {
    //   return new Variant<number>(variant.id).setValue(variant.value);
    // });
    this.container = body;
    return this;
  }

  setType(type: 'radio' | 'checkbox') {
    this.type = type;
    return this;
  }

  addVariants(...variants: VariantExt[]) {
    this.container.variants.push(...variants);
    return this;
  }

  assert(body: RadioAcceptBody): boolean {
    let isCorrect = true,
      correctCount = 0;

    const correctLength = this.container.variants.filter(
      ({ value }) => value === 1
    ).length;

    for (const variant of this.container.variants) {
      if (body.indexOf(variant.id) != -1) {
        if (variant.value === 0) {
          isCorrect = false;
        } else {
          correctCount++;
        }
      }
    }

    if (correctLength !== correctCount) isCorrect = false;

    return isCorrect;
  }
}
