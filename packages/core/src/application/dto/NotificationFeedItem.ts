import type { Notification } from "../../domain/entities/Notification.js";
import type { ForgeType, PriorityLevel } from "../../domain/entities/Notification.js";

export interface NotificationFeedItem {
  id: string;
  forge: ForgeType;
  title: string;
  bodyPreview: string;
  url: string;
  repoFullName: string;
  author: string;
  priorityScore: number;
  priorityLevel: PriorityLevel;
  isRead: boolean;
  isPinned: boolean;
  isArchived: boolean;
  isActionRequired: boolean;
  updatedAt: string;
}

export function toNotificationFeedItem(notification: Notification): NotificationFeedItem {
  return {
    id: notification.id,
    forge: notification.forge,
    title: notification.title,
    bodyPreview: notification.bodyPreview,
    url: notification.url,
    repoFullName: notification.repoFullName,
    author: notification.author,
    priorityScore: notification.priorityScore,
    priorityLevel: notification.priorityLevel,
    isRead: notification.state.isRead,
    isPinned: notification.state.isPinned,
    isArchived: notification.state.isArchived,
    isActionRequired: notification.isActionRequired,
    updatedAt: notification.updatedAt.toISOString(),
  };
}
