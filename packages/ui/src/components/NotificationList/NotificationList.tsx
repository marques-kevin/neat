import { Card } from "@app/ui/components/ui/card";
import { ScrollArea } from "@app/ui/components/ui/scroll-area";
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
    <Card className="overflow-hidden py-0 shadow-sm">
      <ScrollArea className="max-h-[70vh]">
        <div className="divide-y divide-border">
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
      </ScrollArea>
    </Card>
  );
}
