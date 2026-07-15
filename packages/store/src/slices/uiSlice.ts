import { createSlice } from "@reduxjs/toolkit";
import { syncNotificationsThunk } from "../thunks/notificationThunks.js";
import type { UiState } from "../types.js";

const initialState: UiState = {
  focusMode: false,
  selectedId: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleFocusMode(state) {
      state.focusMode = !state.focusMode;
    },
    selectNotification(state, action: { payload: string | null }) {
      state.selectedId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(syncNotificationsThunk.fulfilled, (state, action) => {
      if (state.selectedId && !action.payload.items.some((item) => item.id === state.selectedId)) {
        state.selectedId = action.payload.items[0]?.id ?? null;
      }
    });
  },
});

export const { toggleFocusMode, selectNotification } = uiSlice.actions;
