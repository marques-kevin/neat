import { Pin } from "lucide-react";
import { Badge } from "@app/ui/components/ui/badge";
import { Button } from "@app/ui/components/ui/button";
import { cn } from "@app/ui/lib/utils";
import type { NotificationListItemViewModel } from "../NotificationList/NotificationList.types.js";

export interface NotificationItemProps {
  item: NotificationListItemViewModel;
  markReadLabel: string;
  pinLabel: string;
  unpinLabel: string;
  dismissLabel: string;
  openLabel?: string;
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  onPin: (id: string) => void;
  onDismiss: (id: string) => void;
}

const priorityStyles = {
  high: "border-l-destructive bg-destructive/5",
  medium: "border-l-chart-1 bg-chart-1/5",
  low: "border-l-border bg-card",
} as const;

const priorityBadge: Record<
  NotificationListItemViewModel["priority"],
  "destructive" | "secondary" | "outline"
> = {
  high: "destructive",
  medium: "secondary",
  low: "outline",
};

export function NotificationItem({
  item,
  markReadLabel,
  pinLabel,
  unpinLabel,
  dismissLabel,
  openLabel = "Open",
  onSelect,
  onOpen,
  onMarkAsRead,
  onPin,
  onDismiss,
}: NotificationItemProps) {
  return (
    <article
      className={cn(
        "border-l-4 border-b border-border px-4 py-3 transition-colors",
        priorityStyles[item.priority],
        item.isSelected && "ring-2 ring-inset ring-ring",
        item.isRead && "opacity-70",
      )}
      onClick={() => onSelect(item.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {item.isPinned ? <Pin className="size-3.5 text-muted-foreground" aria-hidden /> : null}
            <h3 className="truncate text-sm font-semibold text-foreground">{item.title}</h3>
            <Badge variant={priorityBadge[item.priority]} className="capitalize">
              {item.priority}
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {item.repo} · {item.author}
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.bodyPreview}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-1">
          <Button
            type="button"
            size="xs"
            onClick={(event) => {
              event.stopPropagation();
              onOpen(item.id);
            }}
          >
            {openLabel}
          </Button>
          {!item.isRead ? (
            <Button
              type="button"
              size="xs"
              variant="outline"
              onClick={(event) => {
                event.stopPropagation();
                onMarkAsRead(item.id);
              }}
            >
              {markReadLabel}
            </Button>
          ) : null}
          <Button
            type="button"
            size="xs"
            variant="outline"
            onClick={(event) => {
              event.stopPropagation();
              onPin(item.id);
            }}
          >
            {item.isPinned ? unpinLabel : pinLabel}
          </Button>
          <Button
            type="button"
            size="xs"
            variant="destructive"
            onClick={(event) => {
              event.stopPropagation();
              onDismiss(item.id);
            }}
          >
            {dismissLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
