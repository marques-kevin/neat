import { createAsyncThunk } from "@reduxjs/toolkit";
import type { StoreExtra } from "../types.js";

export const setLocaleThunk = createAsyncThunk<{ locale: string }, string, { extra: StoreExtra }>(
  "settings/setLocale",
  async (locale, { extra }) => {
    const result = await extra.container.setLocale.execute({ locale });
    return result;
  },
);

export const initializeLocaleThunk = createAsyncThunk<
  { locale: string },
  string,
  { extra: StoreExtra }
>("settings/initializeLocale", async (resolvedLocale, { extra }) => {
  const stored = await extra.container.setLocale.execute({ locale: resolvedLocale });
  return stored;
});
