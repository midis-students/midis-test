import { TesterModule } from '@/lib/test-system/module';

type ModuleContainer = string;

type InputAcceptBody = {
  value: string;
};

export class Input extends TesterModule<ModuleContainer> {
  constructor() {
    super();
    this.container = '';
  }

  create(): ModuleContainer {
    return this.container;
  }

  setValue(value: string) {
    this.container = value;
    return this;
  }

  assert(body: InputAcceptBody): boolean {
    return this.container === body.value;
  }
}
