import { TesterModule } from '@/lib/test-system/module';

type ModuleContainer = {
  value: string;
};

export type InputAcceptBody = {
  value: string;
};

export class Input extends TesterModule<ModuleContainer> {
  constructor() {
    super();
    this.container = {
      value: '',
    };
  }

  create(): ModuleContainer {
    return this.container;
  }

  setData(body: ModuleContainer) {
    this.container = body;
    return this;
  }

  setValue(value: string) {
    this.container.value = value;
    return this;
  }

  assert(body: InputAcceptBody): boolean {
    return this.container.value === body.value;
  }
}
