import { NotificationNotFoundError } from "../../domain/errors/NotificationNotFoundError.js";
import type { INotificationRepository } from "../ports/index.js";

export interface ArchiveNotificationInput {
  id: string;
}

export class ArchiveNotification {
  constructor(private readonly repository: INotificationRepository) {}

  async execute(input: ArchiveNotificationInput): Promise<void> {
    const notification = await this.repository.findById(input.id);
    if (!notification) {
      throw new NotificationNotFoundError(input.id);
    }

    await this.repository.save(notification.archive());
  }
}
