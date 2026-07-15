export type NotificationPriorityLevel = "high" | "medium" | "low";

export type NotificationFilter = "all" | "unread";

export interface NotificationListItemViewModel {
  id: string;
  title: string;
  repo: string;
  author: string;
  bodyPreview: string;
  priority: NotificationPriorityLevel;
  isRead: boolean;
  isPinned: boolean;
  isSelected: boolean;
  initials: string;
  avatarClassName: string;
}
