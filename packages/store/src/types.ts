import type { AppContainer } from "@app/core";
import type { NotificationFeedItem } from "@app/core";

export interface StoreExtra {
  container: AppContainer;
}

export interface NotificationsState {
  items: NotificationFeedItem[];
  unreadCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  lastSyncedAt: string | null;
}

export interface SettingsState {
  locale: string;
  pollingIntervalMs: number;
}

export interface UiState {
  focusMode: boolean;
  selectedId: string | null;
}

export interface RootState {
  notifications: NotificationsState;
  settings: SettingsState;
  ui: UiState;
}
