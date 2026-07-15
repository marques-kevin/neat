import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../types.js";

export const selectNotificationsState = (state: RootState) => state.notifications;
export const selectUiState = (state: RootState) => state.ui;
export const selectSettingsState = (state: RootState) => state.settings;

export const selectNotificationFeed = createSelector(
  [selectNotificationsState],
  (notifications) => notifications.items,
);

export const selectUnreadCount = createSelector(
  [selectNotificationsState],
  (notifications) => notifications.unreadCount,
);

export const selectFocusMode = createSelector([selectUiState], (ui) => ui.focusMode);

export const selectLocale = createSelector([selectSettingsState], (settings) => settings.locale);

export const selectSyncStatus = createSelector(
  [selectNotificationsState],
  (notifications) => notifications.status,
);

export const selectSelectedNotification = createSelector(
  [selectNotificationFeed, selectUiState],
  (items, ui) => items.find((item) => item.id === ui.selectedId) ?? items[0] ?? null,
);
