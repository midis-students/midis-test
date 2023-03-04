import { TesterModule } from '@/lib/test-system/module';
import { Variant } from '@/lib/test-system/Variant';

type ModuleContainer = {
  variants: Variant<number>[];
};

type RadioAcceptBody = {
  id: string;
};

export class Radio extends TesterModule<ModuleContainer> {
  assert(body: RadioAcceptBody): boolean {
    const variant = this.container.variants.find(
      variant => variant.id === body.id
    );
    if (!variant) return false;
    return variant.value === 1;
  }

  create(): ModuleContainer {
    this.container.variants = [];
    return this.container;
  }
}

type CheckboxAcceptBody = {
  list: string[];
};

export class Checkbox extends TesterModule<ModuleContainer> {
  create(): ModuleContainer {
    this.container.variants = [];
    return this.container;
  }

  assert(body: CheckboxAcceptBody): boolean {
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
