import type { Notification } from "../entities/Notification.js";
import {
  DEFAULT_PRIORITY_RULES,
  DEFAULT_PRIORITY_SCORE,
  type PriorityRule,
} from "../entities/PriorityRule.js";

export class PriorityScorer {
  constructor(private readonly rules: PriorityRule[] = DEFAULT_PRIORITY_RULES) {}

  score(notification: Notification): Notification {
    const matchingRule = this.rules
      .filter((rule) => rule.matches(notification.reason))
      .sort((a, b) => b.score - a.score)[0];

    return notification.withPriority(matchingRule?.score ?? DEFAULT_PRIORITY_SCORE);
  }
}
