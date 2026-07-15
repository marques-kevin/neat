import type { IPreferencesStore, SetLocaleInput, SetLocaleResult } from "../ports/index.js";

export class SetLocale {
  constructor(private readonly preferences: IPreferencesStore) {}

  async execute(input: SetLocaleInput): Promise<SetLocaleResult> {
    await this.preferences.set("locale", input.locale);
    return { locale: input.locale };
  }
}
