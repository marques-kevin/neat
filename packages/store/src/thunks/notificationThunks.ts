import { createAsyncThunk } from "@reduxjs/toolkit";
import type { NotificationFeedItem } from "@app/core";
import type { RootState, StoreExtra } from "../types.js";

export const syncNotificationsThunk = createAsyncThunk<
  { items: NotificationFeedItem[]; unreadCount: number; syncedAt: string },
  void,
  { extra: StoreExtra; state: RootState }
>("notifications/sync", async (_arg, { extra, getState }) => {
  const { focusMode } = getState().ui;
  const sync = await extra.container.syncNotifications.execute();
  const feed = await extra.container.getNotificationFeed.execute({ focusMode });

  return {
    items: feed.items,
    unreadCount: feed.unreadCount,
    syncedAt: sync.syncedAt.toISOString(),
  };
});

export const markAsReadThunk = createAsyncThunk<
  NotificationFeedItem,
  string,
  { extra: StoreExtra; state: RootState }
>("notifications/markAsRead", async (id, { extra, getState }) => {
  await extra.container.markAsRead.execute({ id });
  const feed = await extra.container.getNotificationFeed.execute({
    focusMode: getState().ui.focusMode,
  });
  const updated = feed.items.find((item) => item.id === id);
  if (!updated) {
    throw new Error(`Notification not found after update: ${id}`);
  }
  return updated;
});

export const pinNotificationThunk = createAsyncThunk<
  NotificationFeedItem,
  string,
  { extra: StoreExtra; state: RootState }
>("notifications/pin", async (id, { extra, getState }) => {
  await extra.container.pinNotification.execute({ id });
  const feed = await extra.container.getNotificationFeed.execute({
    focusMode: getState().ui.focusMode,
  });
  const updated = feed.items.find((item) => item.id === id);
  if (!updated) {
    throw new Error(`Notification not found after pin: ${id}`);
  }
  return updated;
});

export const archiveNotificationThunk = createAsyncThunk<
  { id: string },
  string,
  { extra: StoreExtra }
>("notifications/archive", async (id, { extra }) => {
  await extra.container.archiveNotification.execute({ id });
  return { id };
});

export const openNotificationThunk = createAsyncThunk<void, string, { extra: StoreExtra }>(
  "notifications/open",
  async (id, { extra }) => {
    const feed = await extra.container.getNotificationFeed.execute();
    const item = feed.items.find((notification) => notification.id === id);
    if (item) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    }
  },
);
