import { TesterModule } from '@/lib/test-system/module';
import { Variant } from '@/lib/test-system/Variant';

type ModuleContainer = Variant<string>;

type InputAcceptBody = {
  value: string;
};

export class Input extends TesterModule<ModuleContainer> {
  create(): ModuleContainer {
    this.container.value = '';
    return this.container;
  }

  assert(body: InputAcceptBody): boolean {
    return this.container.value === body.value;
  }
}
