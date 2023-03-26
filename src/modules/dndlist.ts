import { TesterModule } from '@/lib/test-system/module';
import { Variant } from '@/lib/test-system/Variant';

type VariantExt = Variant<number>;

type ModuleContainer = {
  variants: VariantExt[];
};

export type AcceptBody = number[];

type SetData = Variant<number>[];

export class DnDList extends TesterModule<ModuleContainer> {
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
    this.container = body;
    return this;
  }

  addVariants(...variants: VariantExt[]) {
    this.container.variants.push(...variants);
    return this;
  }

  assert(body: AcceptBody): boolean {
    for (let i = 0; i < this.container.variants.length; i++) {
      if (this.container.variants[i].value != body[i]) {
        return false;
      }
    }

    return true;
  }
}
