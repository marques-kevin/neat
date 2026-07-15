import { NotificationItem } from "../NotificationItem/NotificationItem.js";
import type { NotificationListItemViewModel } from "./NotificationList.types.js";

export interface NotificationListProps {
  items: NotificationListItemViewModel[];
  markReadLabel: string;
  pinLabel: string;
  unpinLabel: string;
  dismissLabel: string;
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  onPin: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function NotificationList({
  items,
  markReadLabel,
  pinLabel,
  unpinLabel,
  dismissLabel,
  onSelect,
  onOpen,
  onMarkAsRead,
  onPin,
  onDismiss,
}: NotificationListProps) {
  return (
    <div className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {items.map((item) => (
        <NotificationItem
          key={item.id}
          item={item}
          markReadLabel={markReadLabel}
          pinLabel={pinLabel}
          unpinLabel={unpinLabel}
          dismissLabel={dismissLabel}
          onSelect={onSelect}
          onOpen={onOpen}
          onMarkAsRead={onMarkAsRead}
          onPin={onPin}
          onDismiss={onDismiss}
        />
      ))}
    </div>
  );
}
