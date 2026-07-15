import {
  Notification,
  PriorityScorer,
  type ForgeCapabilities,
  type IForgeAdapter,
  type NotificationReason,
  type NotificationType,
} from "@app/core";

interface SeedNotification {
  id: string;
  reason: NotificationReason;
  type: NotificationType;
  title: string;
  bodyPreview: string;
  repoFullName: string;
  author: string;
  prNumber: number;
}

const SEED_NOTIFICATIONS: SeedNotification[] = [
  {
    id: "gh-1",
    reason: "security_alert",
    type: "pull_request",
    title: "Dependabot: lodash vulnerability in org/api",
    bodyPreview: "Critical severity CVE-2024-1234",
    repoFullName: "org/api",
    author: "dependabot[bot]",
    prNumber: 842,
  },
  {
    id: "gh-2",
    reason: "review_requested",
    type: "pull_request",
    title: "Review requested on feat/auth-refactor",
    bodyPreview: "@you was requested for review",
    repoFullName: "org/web",
    author: "bob",
    prNumber: 120,
  },
  {
    id: "gh-3",
    reason: "review_requested",
    type: "pull_request",
    title: "Review requested on fix/checkout-flow",
    bodyPreview: "Ready for review",
    repoFullName: "org/web",
    author: "carol",
    prNumber: 118,
  },
  {
    id: "gh-4",
    reason: "mention",
    type: "pull_request",
    title: "@you mentioned in PR #99",
    bodyPreview: "Can you take a look at the error handling?",
    repoFullName: "org/api",
    author: "dave",
    prNumber: 99,
  },
  {
    id: "gh-5",
    reason: "mention",
    type: "issue",
    title: "@you mentioned in issue #45",
    bodyPreview: "What do you think about this approach?",
    repoFullName: "org/docs",
    author: "eve",
    prNumber: 45,
  },
  {
    id: "gh-6",
    reason: "assign",
    type: "issue",
    title: "Assigned: Fix broken CI pipeline",
    bodyPreview: "Assigned to @you",
    repoFullName: "org/infra",
    author: "frank",
    prNumber: 12,
  },
  {
    id: "gh-7",
    reason: "comment",
    type: "pull_request",
    title: "New comment on your PR #77",
    bodyPreview: "Left a suggestion on the retry logic",
    repoFullName: "org/web",
    author: "grace",
    prNumber: 77,
  },
  {
    id: "gh-8",
    reason: "author",
    type: "pull_request",
    title: "New comment on PR you authored",
    bodyPreview: "Looks good, one nit on naming",
    repoFullName: "org/api",
    author: "heidi",
    prNumber: 55,
  },
  {
    id: "gh-9",
    reason: "ci_failed",
    type: "pull_request",
    title: "CI failed on your PR #77",
    bodyPreview: "Unit tests failed in auth module",
    repoFullName: "org/web",
    author: "github-actions[bot]",
    prNumber: 77,
  },
  {
    id: "gh-10",
    reason: "ci_failed",
    type: "pull_request",
    title: "CI failed on feat/dark-mode",
    bodyPreview: "Lint check failed",
    repoFullName: "org/web",
    author: "github-actions[bot]",
    prNumber: 115,
  },
  {
    id: "gh-11",
    reason: "star",
    type: "issue",
    title: "Someone starred org/legacy-tool",
    bodyPreview: "Your repository has a new star",
    repoFullName: "org/legacy-tool",
    author: "github",
    prNumber: 0,
  },
  {
    id: "gh-12",
    reason: "star",
    type: "issue",
    title: "Someone forked org/open-sdk",
    bodyPreview: "Your repository was forked",
    repoFullName: "org/open-sdk",
    author: "github",
    prNumber: 0,
  },
];

export class FakeGitHubForgeAdapter implements IForgeAdapter {
  readonly forge = "github" as const;
  private readonly scorer = new PriorityScorer();

  async fetchNotifications(_since?: Date): Promise<Notification[]> {
    const now = new Date();
    return SEED_NOTIFICATIONS.map((seed) =>
      this.scorer.score(
        new Notification({
          id: seed.id,
          forge: "github",
          type: seed.type,
          reason: seed.reason,
          title: seed.title,
          bodyPreview: seed.bodyPreview,
          url: `https://github.com/${seed.repoFullName}/pull/${seed.prNumber}`,
          repoFullName: seed.repoFullName,
          author: seed.author,
          priorityScore: 0,
          state: { isRead: false, isPinned: false, isArchived: false },
          fetchedAt: now,
          updatedAt: now,
        }),
      ),
    );
  }

  async markAsRead(_id: string): Promise<void> {
    return undefined;
  }

  async markAsDone(_id: string): Promise<void> {
    return undefined;
  }

  getCapabilities(): ForgeCapabilities {
    return {
      markAsRead: true,
      markAsDone: true,
      quickReply: false,
      unsubscribe: true,
      enrichedPreview: true,
    };
  }
}
