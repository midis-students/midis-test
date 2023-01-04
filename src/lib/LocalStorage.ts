export class LocalStorage {
  static save<T extends object>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static load<T extends object>(key: string): T | null {
    return JSON.parse(localStorage.getItem(key) || '');
  }
}