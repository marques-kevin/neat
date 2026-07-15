import { createSlice } from "@reduxjs/toolkit";
import type { NotificationFeedItem } from "@app/core";
import {
  archiveNotificationThunk,
  markAsReadThunk,
  pinNotificationThunk,
  syncNotificationsThunk,
} from "../thunks/notificationThunks.js";
import { refreshNotificationFeedThunk } from "../thunks/refreshFeedThunk.js";
import type { NotificationsState } from "../types.js";

const initialState: NotificationsState = {
  items: [],
  unreadCount: 0,
  status: "idle",
  error: null,
  lastSyncedAt: null,
};

function replaceItem(items: NotificationFeedItem[], updated: NotificationFeedItem) {
  return items.map((item) => (item.id === updated.id ? updated : item));
}

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(syncNotificationsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(syncNotificationsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.unreadCount = action.payload.unreadCount;
        state.lastSyncedAt = action.payload.syncedAt;
      })
      .addCase(syncNotificationsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Sync failed";
      })
      .addCase(markAsReadThunk.fulfilled, (state, action) => {
        state.items = replaceItem(state.items, action.payload);
        state.unreadCount = state.items.filter((item) => !item.isRead).length;
      })
      .addCase(pinNotificationThunk.fulfilled, (state, action) => {
        state.items = replaceItem(state.items, action.payload);
      })
      .addCase(archiveNotificationThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        state.unreadCount = state.items.filter((item) => !item.isRead).length;
      })
      .addCase(refreshNotificationFeedThunk.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.unreadCount = action.payload.unreadCount;
      });
  },
});
