export type TesterModuleUnknown = new () => TesterModule<unknown>;

export abstract class TesterModule<T> {
  protected container: T;

  abstract create(): T;
  abstract assert(body: unknown): boolean;
  abstract setData(body: unknown): this;
}
