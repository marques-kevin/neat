import type { NotificationFeedItem } from "@app/core";
import type { NotificationListItemViewModel } from "../components/NotificationList/NotificationList.types.js";

export function toNotificationListItemViewModel(
  item: NotificationFeedItem,
  selectedId: string | null,
): NotificationListItemViewModel {
  return {
    id: item.id,
    title: item.title,
    repo: item.repoFullName,
    author: item.author,
    bodyPreview: item.bodyPreview,
    priority: item.priorityLevel,
    isRead: item.isRead,
    isPinned: item.isPinned,
    isSelected: item.id === selectedId,
  };
}
