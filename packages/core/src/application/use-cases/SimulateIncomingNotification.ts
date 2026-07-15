import { Notification } from "../../domain/entities/Notification.js";
import type { PriorityScorer } from "../../domain/services/PriorityScorer.js";
import type { IClock, INotificationRepository, IOsNotificationService } from "../ports/index.js";

export class SimulateIncomingNotification {
  constructor(
    private readonly repository: INotificationRepository,
    private readonly osNotifications: IOsNotificationService,
    private readonly scorer: PriorityScorer,
    private readonly clock: IClock,
  ) {}

  async execute(): Promise<{ id: string }> {
    const now = this.clock.now();
    const id = `sim-${now.getTime()}`;

    const scored = this.scorer.score(
      new Notification({
        id,
        forge: "github",
        type: "pull_request",
        reason: "review_requested",
        title: "Review requested on feat/push-simulation",
        bodyPreview: "@you was requested for review (simulated)",
        url: "https://github.com/org/web/pull/999",
        repoFullName: "org/web",
        author: "simulator",
        priorityScore: 0,
        state: { isRead: false, isPinned: false, isArchived: false },
        fetchedAt: now,
        updatedAt: now,
      }),
    );

    await this.repository.save(scored);
    await this.osNotifications.notify(scored.title, scored.bodyPreview, scored.url);

    return { id: scored.id };
  }
}
