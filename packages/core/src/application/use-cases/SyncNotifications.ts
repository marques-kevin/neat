import type { PriorityScorer } from "../../domain/services/PriorityScorer.js";
import type { IClock, IForgeAdapter, INotificationRepository, SyncResult } from "../ports/index.js";

export class SyncNotifications {
  constructor(
    private readonly forges: IForgeAdapter[],
    private readonly repository: INotificationRepository,
    private readonly scorer: PriorityScorer,
    private readonly clock: IClock,
  ) {}

  async execute(): Promise<SyncResult> {
    const since = await this.repository.getLastSyncTime();
    const batches = await Promise.all(this.forges.map((forge) => forge.fetchNotifications(since)));
    const scored = batches.flat().map((notification) => this.scorer.score(notification));
    await this.repository.upsertMany(scored);

    return {
      count: scored.length,
      syncedAt: this.clock.now(),
    };
  }
}
