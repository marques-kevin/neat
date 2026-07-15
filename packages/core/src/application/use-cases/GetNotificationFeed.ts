import { toNotificationFeedItem } from "../dto/NotificationFeedItem.js";
import type {
  GetNotificationFeedInput,
  GetNotificationFeedResult,
  INotificationRepository,
} from "../ports/index.js";

export class GetNotificationFeed {
  constructor(private readonly repository: INotificationRepository) {}

  async execute(input: GetNotificationFeedInput = {}): Promise<GetNotificationFeedResult> {
    const notifications = await this.repository.findAll(false);
    const visible = notifications
      .filter((notification) => !notification.state.isArchived)
      .filter((notification) => (input.focusMode ? notification.isActionRequired : true))
      .sort((a, b) => {
        if (a.state.isPinned !== b.state.isPinned) {
          return a.state.isPinned ? -1 : 1;
        }
        return b.priorityScore - a.priorityScore;
      });

    const items = visible.map(toNotificationFeedItem);
    const unreadCount = items.filter((item) => !item.isRead).length;

    return { items, unreadCount };
  }
}
