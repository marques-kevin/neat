import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "./store.js";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { createAppStore } from "./store.js";
export type { AppDispatch, AppStore, RootState } from "./store.js";
export * from "./selectors/index.js";
export * from "./slices/uiSlice.js";
export * from "./slices/settingsSlice.js";
export * from "./thunks/notificationThunks.js";
export * from "./thunks/settingsThunks.js";
export * from "./thunks/refreshFeedThunk.js";
