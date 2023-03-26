import { Answer } from '@/entity/Answer';
import { TesterModule } from '@/lib/test-system/module';
import { Variant } from '@/lib/test-system/Variant';

type VariantExt = Variant<number>;

type ModuleContainer = {
  variants: VariantExt[];
};

export type AcceptBody = string[];

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
    if (body.length != this.container.variants.length) return false;
    for (let i = 0; i < this.container.variants.length; i++) {
      const answer = this.container.variants.find(({ id }) => id == body[i]);
      if (!answer || i != answer.value) return false;
    }

    return true;
  }
}
