import { describe, expect, it } from "vitest";
import { Notification } from "../entities/Notification.js";
import { PriorityScorer } from "./PriorityScorer.js";
import { GetNotificationFeed } from "../../application/use-cases/GetNotificationFeed.js";
import { MarkAsRead } from "../../application/use-cases/MarkAsRead.js";
import type { IForgeAdapter, INotificationRepository } from "../../application/ports/index.js";

function createNotification(
  overrides: Partial<ConstructorParameters<typeof Notification>[0]> = {},
): Notification {
  const now = new Date();
  return new Notification({
    id: "1",
    forge: "github",
    type: "pull_request",
    reason: "review_requested",
    title: "Review requested",
    bodyPreview: "Please review",
    url: "https://github.com/org/repo/pull/1",
    repoFullName: "org/repo",
    author: "alice",
    priorityScore: 0,
    state: { isRead: false, isPinned: false, isArchived: false },
    fetchedAt: now,
    updatedAt: now,
    ...overrides,
  });
}

class InMemoryRepo implements INotificationRepository {
  private items = new Map<string, Notification>();
  private lastSync?: Date;

  async getLastSyncTime(): Promise<Date | undefined> {
    return this.lastSync;
  }

  async findById(id: string): Promise<Notification | undefined> {
    return this.items.get(id);
  }

  async findAll(): Promise<Notification[]> {
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

const fakeForge: IForgeAdapter = {
  forge: "github",
  fetchNotifications: async () => [],
  markAsRead: async () => undefined,
  markAsDone: async () => undefined,
  getCapabilities: () => ({
    markAsRead: true,
    markAsDone: true,
    quickReply: false,
    unsubscribe: false,
    enrichedPreview: true,
  }),
};

describe("PriorityScorer", () => {
  it("scores review requests as high priority", () => {
    const scorer = new PriorityScorer();
    const scored = scorer.score(createNotification({ reason: "review_requested" }));
    expect(scored.priorityScore).toBe(90);
    expect(scored.isActionRequired).toBe(true);
  });

  it("scores stars as low priority", () => {
    const scorer = new PriorityScorer();
    const scored = scorer.score(createNotification({ reason: "star" }));
    expect(scored.priorityScore).toBe(10);
    expect(scored.isActionRequired).toBe(false);
  });
});

describe("MarkAsRead", () => {
  it("marks a notification as read", async () => {
    const repo = new InMemoryRepo();
    const notification = new PriorityScorer().score(createNotification({ id: "n-1" }));
    await repo.upsertMany([notification]);

    const useCase = new MarkAsRead(repo, [fakeForge]);
    await useCase.execute({ id: "n-1" });

    const updated = await repo.findById("n-1");
    expect(updated?.state.isRead).toBe(true);
  });
});

describe("GetNotificationFeed", () => {
  it("filters focus mode to action-required notifications", async () => {
    const repo = new InMemoryRepo();
    const scorer = new PriorityScorer();
    await repo.upsertMany([
      scorer.score(createNotification({ id: "high", reason: "review_requested" })),
      scorer.score(createNotification({ id: "low", reason: "star" })),
    ]);

    const useCase = new GetNotificationFeed(repo);
    const result = await useCase.execute({ focusMode: true });

    expect(result.items).toHaveLength(1);
    expect(result.items[0]?.id).toBe("high");
  });
});
