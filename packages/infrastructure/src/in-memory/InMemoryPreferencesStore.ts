import type { IPreferencesStore } from "@app/core";

export class InMemoryPreferencesStore implements IPreferencesStore {
  private values = new Map<string, unknown>();

  async get<T>(key: string): Promise<T | undefined> {
    return this.values.get(key) as T | undefined;
  }

  async set<T>(key: string, value: T): Promise<void> {
    this.values.set(key, value);
  }
}
