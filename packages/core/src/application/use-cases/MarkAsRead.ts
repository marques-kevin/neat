import { NotificationNotFoundError } from "../../domain/errors/NotificationNotFoundError.js";
import type { IForgeAdapter, INotificationRepository } from "../ports/index.js";

export interface MarkAsReadInput {
  id: string;
}

export class MarkAsRead {
  constructor(
    private readonly repository: INotificationRepository,
    private readonly forges: IForgeAdapter[],
  ) {}

  async execute(input: MarkAsReadInput): Promise<void> {
    const notification = await this.repository.findById(input.id);
    if (!notification) {
      throw new NotificationNotFoundError(input.id);
    }

    const updated = notification.markAsRead();
    await this.repository.save(updated);

    const forge = this.forges.find((adapter) => adapter.forge === notification.forge);
    if (forge?.getCapabilities().markAsRead) {
      await forge.markAsRead(notification.id);
    }
  }
}
