import { TesterModule } from '@/lib/test-system/module';
import { Variant } from '@/lib/test-system/Variant';

type VariantExt = Variant<number>;

type ModuleContainer = {
  variants: VariantExt[];
};

export type RadioAcceptBody = {
  list: string[];
};

type RadioSetData = {
  list: Array<{
    id: string;
    value: number;
  }>;
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

  setData(body: RadioSetData) {
    this.container.variants = body.list.map(variant => {
      return new Variant<number>(variant.id).setValue(variant.value);
    });
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
