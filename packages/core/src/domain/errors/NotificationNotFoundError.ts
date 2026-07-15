export class NotificationNotFoundError extends Error {
  constructor(id: string) {
    super(`Notification not found: ${id}`);
    this.name = "NotificationNotFoundError";
  }
}
