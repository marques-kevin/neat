export type ForgeType = "github" | "linear" | "gitlab";

export type NotificationReason =
  | "review_requested"
  | "mention"
  | "assign"
  | "author"
  | "comment"
  | "security_alert"
  | "ci_failed"
  | "star"
  | "other";

export type NotificationType = "pull_request" | "issue" | "commit" | "release" | "discussion";

export type PriorityLevel = "high" | "medium" | "low";

export interface NotificationState {
  isRead: boolean;
  isPinned: boolean;
  isArchived: boolean;
}

export interface NotificationProps {
  id: string;
  forge: ForgeType;
  type: NotificationType;
  reason: NotificationReason;
  title: string;
  bodyPreview: string;
  url: string;
  repoFullName: string;
  author: string;
  priorityScore: number;
  state: NotificationState;
  fetchedAt: Date;
  updatedAt: Date;
}

export class Notification {
  readonly id: string;
  readonly forge: ForgeType;
  readonly type: NotificationType;
  readonly reason: NotificationReason;
  readonly title: string;
  readonly bodyPreview: string;
  readonly url: string;
  readonly repoFullName: string;
  readonly author: string;
  readonly priorityScore: number;
  readonly state: NotificationState;
  readonly fetchedAt: Date;
  readonly updatedAt: Date;

  constructor(props: NotificationProps) {
    this.id = props.id;
    this.forge = props.forge;
    this.type = props.type;
    this.reason = props.reason;
    this.title = props.title;
    this.bodyPreview = props.bodyPreview;
    this.url = props.url;
    this.repoFullName = props.repoFullName;
    this.author = props.author;
    this.priorityScore = props.priorityScore;
    this.state = props.state;
    this.fetchedAt = props.fetchedAt;
    this.updatedAt = props.updatedAt;
  }

  get isActionRequired(): boolean {
    return this.priorityScore >= 80;
  }

  get priorityLevel(): PriorityLevel {
    if (this.priorityScore >= 80) return "high";
    if (this.priorityScore >= 50) return "medium";
    return "low";
  }

  withPriority(score: number): Notification {
    return new Notification({
      ...this.toProps(),
      priorityScore: score,
      updatedAt: new Date(),
    });
  }

  markAsRead(): Notification {
    return this.withState({ ...this.state, isRead: true });
  }

  markAsUnread(): Notification {
    return this.withState({ ...this.state, isRead: false });
  }

  pin(): Notification {
    return this.withState({ ...this.state, isPinned: true });
  }

  unpin(): Notification {
    return this.withState({ ...this.state, isPinned: false });
  }

  archive(): Notification {
    return this.withState({ ...this.state, isArchived: true });
  }

  private withState(state: NotificationState): Notification {
    return new Notification({
      ...this.toProps(),
      state,
      updatedAt: new Date(),
    });
  }

  private toProps(): NotificationProps {
    return {
      id: this.id,
      forge: this.forge,
      type: this.type,
      reason: this.reason,
      title: this.title,
      bodyPreview: this.bodyPreview,
      url: this.url,
      repoFullName: this.repoFullName,
      author: this.author,
      priorityScore: this.priorityScore,
      state: this.state,
      fetchedAt: this.fetchedAt,
      updatedAt: this.updatedAt,
    };
  }
}
