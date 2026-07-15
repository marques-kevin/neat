import type { Notification } from "../entities/Notification.js";
import {
  DEFAULT_PRIORITY_RULES,
  DEFAULT_PRIORITY_SCORE,
  type PriorityRule,
} from "../entities/PriorityRule.js";

export class PriorityScorer {
  constructor(private readonly rules: PriorityRule[] = DEFAULT_PRIORITY_RULES) {}

  matchingRule(notification: Notification): PriorityRule | undefined {
    return this.rules
      .filter((rule) => rule.matches(notification.reason))
      .sort((a, b) => b.score - a.score)[0];
  }

  score(notification: Notification): Notification {
    const matchingRule = this.matchingRule(notification);
    return notification.withPriority(matchingRule?.score ?? DEFAULT_PRIORITY_SCORE);
  }

  shouldNotify(notification: Notification): boolean {
    return this.matchingRule(notification)?.actions.notify ?? false;
  }
}
