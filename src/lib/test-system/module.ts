export abstract class TesterModule<T> {
  protected container: T;
  abstract create(): T;
  abstract assert(body: unknown): boolean;
}
