import { TesterModule } from '@/lib/test-system/module';
import { Variant } from '@/lib/test-system/Variant';

type ModuleContainer = {
  variants: Variant<number>[];
};

export type AcceptBody = {
  list: number[];
};

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

  setData(body: SetData) {
    this.container.variants = body;
    return this;
  }

  assert(body: AcceptBody): boolean {
    for (let i = 0; i < this.container.variants.length; i++) {
      if (this.container.variants[i].value != body.list[i]) {
        return false;
      }
    }

    return true;
  }
}
