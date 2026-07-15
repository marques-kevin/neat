import { configureStore } from "@reduxjs/toolkit";
import type { AppContainer } from "@app/core";
import { notificationsSlice } from "./slices/notificationsSlice.js";
import { settingsSlice } from "./slices/settingsSlice.js";
import { uiSlice } from "./slices/uiSlice.js";
import type { RootState, StoreExtra } from "./types.js";

export function createAppStore(container: AppContainer) {
  return configureStore({
    reducer: {
      notifications: notificationsSlice.reducer,
      settings: settingsSlice.reducer,
      ui: uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: { container } satisfies StoreExtra,
        },
      }),
  });
}

export type AppStore = ReturnType<typeof createAppStore>;
export type AppDispatch = AppStore["dispatch"];

export type { RootState, StoreExtra };
