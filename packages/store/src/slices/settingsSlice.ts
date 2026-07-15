import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { setLocaleThunk } from "../thunks/settingsThunks.js";
import type { SettingsState } from "../types.js";

const initialState: SettingsState = {
  locale: "auto",
  pollingIntervalMs: 60_000,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setPollingInterval(state, action: PayloadAction<number>) {
      state.pollingIntervalMs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setLocaleThunk.fulfilled, (state, action) => {
      state.locale = action.payload.locale;
    });
  },
});

export const { setPollingInterval } = settingsSlice.actions;
