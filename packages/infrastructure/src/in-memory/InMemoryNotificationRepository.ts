import type { Notification } from "@app/core";

export class InMemoryNotificationRepository {
  private items = new Map<string, Notification>();
  private lastSync?: Date;

  async getLastSyncTime(): Promise<Date | undefined> {
    return this.lastSync;
  }

  async findById(id: string): Promise<Notification | undefined> {
    return this.items.get(id);
  }

  async findAll(_includeArchived = false): Promise<Notification[]> {
    return [...this.items.values()];
  }

  async upsertMany(notifications: Notification[]): Promise<void> {
    for (const notification of notifications) {
      this.items.set(notification.id, notification);
    }
    this.lastSync = new Date();
  }

  async save(notification: Notification): Promise<void> {
    this.items.set(notification.id, notification);
  }
}
