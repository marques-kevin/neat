import { ArrowRight, MoreHorizontal, Pin } from "lucide-react";
import { Avatar, AvatarFallback } from "@app/ui/components/ui/avatar";
import { Button } from "@app/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@app/ui/components/ui/dropdown-menu";
import { cn } from "@app/ui/lib/utils";
import type { NotificationListItemViewModel } from "../NotificationList/NotificationList.types.js";

export interface NotificationItemProps {
  item: NotificationListItemViewModel;
  markReadLabel: string;
  pinLabel: string;
  unpinLabel: string;
  dismissLabel: string;
  moreLabel: string;
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  onPin: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function NotificationItem({
  item,
  markReadLabel,
  pinLabel,
  unpinLabel,
  dismissLabel,
  moreLabel,
  onSelect,
  onOpen,
  onMarkAsRead,
  onPin,
  onDismiss,
}: NotificationItemProps) {
  return (
    <article
      className={cn(
        "group relative flex cursor-pointer items-center gap-3 px-4 py-3.5 transition-colors",
        !item.isRead && "bg-violet-50/70",
        item.isSelected && "bg-muted/80",
        item.isRead && "hover:bg-muted/40",
      )}
      onClick={() => {
        onSelect(item.id);
        onOpen(item.id);
      }}
    >
      <Avatar size="lg" className="shadow-sm ring-2 ring-background">
        <AvatarFallback className={cn("text-xs font-semibold", item.avatarClassName)}>
          {item.initials}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          {item.isPinned ? (
            <Pin className="size-3 shrink-0 text-muted-foreground" aria-hidden />
          ) : null}
          <h3 className="truncate text-sm font-semibold text-foreground">{item.title}</h3>
        </div>
        <p className="mt-0.5 truncate text-sm text-muted-foreground">{item.bodyPreview}</p>
      </div>

      <div className="flex shrink-0 items-center gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
              aria-label={moreLabel}
              onClick={(event) => event.stopPropagation()}
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(event) => event.stopPropagation()}>
            {!item.isRead ? (
              <DropdownMenuItem onSelect={() => onMarkAsRead(item.id)}>
                {markReadLabel}
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem onSelect={() => onPin(item.id)}>
              {item.isPinned ? unpinLabel : pinLabel}
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onSelect={() => onDismiss(item.id)}>
              {dismissLabel}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ArrowRight
          className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </div>
    </article>
  );
}
