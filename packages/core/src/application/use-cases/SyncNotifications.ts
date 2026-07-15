import type { PriorityScorer } from "../../domain/services/PriorityScorer.js";
import type {
  IClock,
  IForgeAdapter,
  INotificationRepository,
  IOsNotificationService,
  SyncResult,
} from "../ports/index.js";

export interface SyncNotificationsInput {
  /** When true, emit OS banners for newly fetched notify-worthy items. */
  emitOsNotifications?: boolean;
}

export class SyncNotifications {
  constructor(
    private readonly forges: IForgeAdapter[],
    private readonly repository: INotificationRepository,
    private readonly scorer: PriorityScorer,
    private readonly clock: IClock,
    private readonly osNotifications: IOsNotificationService,
  ) {}

  async execute(input: SyncNotificationsInput = {}): Promise<SyncResult> {
    const emitOsNotifications = input.emitOsNotifications ?? false;
    const since = await this.repository.getLastSyncTime();
    const existing = await this.repository.findAll(true);
    const existingIds = new Set(existing.map((item) => item.id));

    const batches = await Promise.all(this.forges.map((forge) => forge.fetchNotifications(since)));
    const scored = batches.flat().map((notification) => this.scorer.score(notification));
    await this.repository.upsertMany(scored);

    if (emitOsNotifications) {
      const newcomers = scored.filter(
        (notification) =>
          !existingIds.has(notification.id) && this.scorer.shouldNotify(notification),
      );

      for (const notification of newcomers) {
        await this.osNotifications.notify(
          notification.title,
          notification.bodyPreview,
          notification.url,
        );
      }
    }

    return {
      count: scored.length,
      syncedAt: this.clock.now(),
    };
  }
}
