import { TesterModule } from '@/lib/test-system/module';
import { Variant } from '@/lib/test-system/Variant';

type VariantExt = Variant<number>;

type ModuleContainer = {
  variants: VariantExt[];
};

type RadioAcceptBody = {
  list: string[];
};

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

  setType(type: 'radio' | 'checkbox') {
    this.type = type;
    return this;
  }

  addVariants(...variants: VariantExt[]) {
    this.container.variants.push(...variants);
    return this;
  }

  assert(body: RadioAcceptBody): boolean {
    let isCorrect = false;

    for (const value of body.list) {
      const variant = this.container.variants.find(
        variant => variant.id === value
      );
      if (variant && variant.value === 1) {
        isCorrect = true;
      }
    }

    return isCorrect;
  }
}
