import { NotificationNotFoundError } from "../../domain/errors/NotificationNotFoundError.js";
import type { INotificationRepository } from "../ports/index.js";

export interface PinNotificationInput {
  id: string;
}

export class PinNotification {
  constructor(private readonly repository: INotificationRepository) {}

  async execute(input: PinNotificationInput): Promise<void> {
    const notification = await this.repository.findById(input.id);
    if (!notification) {
      throw new NotificationNotFoundError(input.id);
    }

    const updated = notification.state.isPinned ? notification.unpin() : notification.pin();

    await this.repository.save(updated);
  }
}
