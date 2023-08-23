export default class StorageService {
  PREFIX = '--weather-widget-';

  has(key: string): boolean {
    return localStorage.getItem(this.PREFIX.concat(key)) !== null;
  }

  get<T>(key: string): T | never {
    const item = localStorage.getItem(this.PREFIX.concat(key));

    if (item) {
      return JSON.parse(item);
    }

    throw new Error(`Item is not found in Storage by key ${key}`);
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(
      this.PREFIX.concat(key),
      JSON.stringify(value)
    );
  }
}