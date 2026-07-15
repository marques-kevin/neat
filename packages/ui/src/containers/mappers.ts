import type { NotificationFeedItem } from "@app/core";
import type { NotificationListItemViewModel } from "../components/NotificationList/NotificationList.types.js";

const AVATAR_TONES = [
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-800",
  "bg-rose-100 text-rose-700",
  "bg-emerald-100 text-emerald-700",
  "bg-orange-100 text-orange-800",
  "bg-indigo-100 text-indigo-700",
  "bg-teal-100 text-teal-700",
] as const;

function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function toInitials(author: string): string {
  const cleaned = author.replace(/\[bot\]/gi, "").trim();
  const parts = cleaned.split(/[\s/_-]+/).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }
  return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
}

export function toNotificationListItemViewModel(
  item: NotificationFeedItem,
  selectedId: string | null,
): NotificationListItemViewModel {
  const tone = AVATAR_TONES[hashString(item.author) % AVATAR_TONES.length]!;

  return {
    id: item.id,
    title: item.title,
    repo: item.repoFullName,
    author: item.author,
    bodyPreview: item.bodyPreview,
    priority: item.priorityLevel,
    isRead: item.isRead,
    isPinned: item.isPinned,
    isSelected: item.id === selectedId,
    initials: toInitials(item.author),
    avatarClassName: tone,
  };
}
