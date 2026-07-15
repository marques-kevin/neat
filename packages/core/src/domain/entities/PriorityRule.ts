import type { NotificationReason } from "../entities/Notification.js";

export interface PriorityRuleConditions {
  reasons?: NotificationReason[];
}

export interface PriorityRuleActions {
  notify: boolean;
  sound: boolean;
  badge: boolean;
}

export interface PriorityRuleProps {
  id: string;
  name: string;
  conditions: PriorityRuleConditions;
  score: number;
  actions: PriorityRuleActions;
  enabled: boolean;
  isBuiltin: boolean;
}

export class PriorityRule {
  readonly id: string;
  readonly name: string;
  readonly conditions: PriorityRuleConditions;
  readonly score: number;
  readonly actions: PriorityRuleActions;
  readonly enabled: boolean;
  readonly isBuiltin: boolean;

  constructor(props: PriorityRuleProps) {
    this.id = props.id;
    this.name = props.name;
    this.conditions = props.conditions;
    this.score = props.score;
    this.actions = props.actions;
    this.enabled = props.enabled;
    this.isBuiltin = props.isBuiltin;
  }

  matches(reason: NotificationReason): boolean {
    if (!this.enabled) return false;
    if (!this.conditions.reasons?.length) return false;
    return this.conditions.reasons.includes(reason);
  }
}

export const DEFAULT_PRIORITY_RULES: PriorityRule[] = [
  new PriorityRule({
    id: "security_alert",
    name: "Security alert",
    conditions: { reasons: ["security_alert"] },
    score: 100,
    actions: { notify: true, sound: true, badge: true },
    enabled: true,
    isBuiltin: true,
  }),
  new PriorityRule({
    id: "review_requested",
    name: "Review requested",
    conditions: { reasons: ["review_requested"] },
    score: 90,
    actions: { notify: true, sound: false, badge: true },
    enabled: true,
    isBuiltin: true,
  }),
  new PriorityRule({
    id: "assign",
    name: "Assigned to you",
    conditions: { reasons: ["assign"] },
    score: 85,
    actions: { notify: true, sound: false, badge: true },
    enabled: true,
    isBuiltin: true,
  }),
  new PriorityRule({
    id: "mention",
    name: "Mention",
    conditions: { reasons: ["mention"] },
    score: 80,
    actions: { notify: true, sound: false, badge: true },
    enabled: true,
    isBuiltin: true,
  }),
  new PriorityRule({
    id: "comment",
    name: "Comment on PR",
    conditions: { reasons: ["comment", "author"] },
    score: 60,
    actions: { notify: false, sound: false, badge: true },
    enabled: true,
    isBuiltin: true,
  }),
  new PriorityRule({
    id: "ci_failed",
    name: "CI failed",
    conditions: { reasons: ["ci_failed"] },
    score: 50,
    actions: { notify: false, sound: false, badge: true },
    enabled: true,
    isBuiltin: true,
  }),
  new PriorityRule({
    id: "star",
    name: "Star / fork",
    conditions: { reasons: ["star"] },
    score: 10,
    actions: { notify: false, sound: false, badge: false },
    enabled: true,
    isBuiltin: true,
  }),
];

export const DEFAULT_PRIORITY_SCORE = 30;
