import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState, StoreExtra } from "../types.js";

export const refreshNotificationFeedThunk = createAsyncThunk<
  { items: RootState["notifications"]["items"]; unreadCount: number },
  void,
  { extra: StoreExtra; state: RootState }
>("notifications/refreshFeed", async (_arg, { extra, getState }) => {
  const { focusMode } = getState().ui;
  const feed = await extra.container.getNotificationFeed.execute({ focusMode });
  return {
    items: feed.items,
    unreadCount: feed.unreadCount,
  };
});
