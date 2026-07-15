import { Tabs, TabsList, TabsTrigger } from "@app/ui/components/ui/tabs";
import { cn } from "@app/ui/lib/utils";
import { NotificationItem } from "../NotificationItem/NotificationItem.js";
import type {
  NotificationFilter,
  NotificationListItemViewModel,
} from "./NotificationList.types.js";

export interface NotificationListProps {
  title: string;
  markAllAsReadLabel: string;
  allTabLabel: string;
  unreadTabLabel: string;
  seeAllLabel: string;
  emptyLabel: string;
  filter: NotificationFilter;
  items: NotificationListItemViewModel[];
  markReadLabel: string;
  pinLabel: string;
  unpinLabel: string;
  dismissLabel: string;
  moreLabel: string;
  onFilterChange: (filter: NotificationFilter) => void;
  onMarkAllAsRead: () => void;
  onSeeAll: () => void;
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  onPin: (id: string) => void;
  onDismiss: (id: string) => void;
}

export function NotificationList({
  title,
  markAllAsReadLabel,
  allTabLabel,
  unreadTabLabel,
  seeAllLabel,
  emptyLabel,
  filter,
  items,
  markReadLabel,
  pinLabel,
  unpinLabel,
  dismissLabel,
  moreLabel,
  onFilterChange,
  onMarkAllAsRead,
  onSeeAll,
  onSelect,
  onOpen,
  onMarkAsRead,
  onPin,
  onDismiss,
}: NotificationListProps) {
  return (
    <section
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-border/70 bg-card text-card-foreground",
        "shadow-[0_18px_50px_-20px_rgba(15,23,42,0.28)]",
      )}
    >
      <header className="flex items-center justify-between gap-3 px-5 pt-5 pb-3">
        <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
        <button
          type="button"
          className="shrink-0 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
          onClick={onMarkAllAsRead}
        >
          {markAllAsReadLabel}
        </button>
      </header>

      <div className="px-5 pb-3">
        <Tabs value={filter} onValueChange={(value) => onFilterChange(value as NotificationFilter)}>
          <TabsList className="grid h-10 w-full grid-cols-2 rounded-xl bg-muted p-1">
            <TabsTrigger
              value="all"
              className="rounded-lg text-xs font-semibold tracking-wide uppercase data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              {allTabLabel}
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="rounded-lg text-xs font-semibold tracking-wide uppercase data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              {unreadTabLabel}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="max-h-[360px] overflow-y-auto overscroll-contain border-t border-border/80">
        {items.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-muted-foreground">{emptyLabel}</p>
        ) : (
          <div className="divide-y divide-border/80">
            {items.map((item) => (
              <NotificationItem
                key={item.id}
                item={item}
                markReadLabel={markReadLabel}
                pinLabel={pinLabel}
                unpinLabel={unpinLabel}
                dismissLabel={dismissLabel}
                moreLabel={moreLabel}
                onSelect={onSelect}
                onOpen={onOpen}
                onMarkAsRead={onMarkAsRead}
                onPin={onPin}
                onDismiss={onDismiss}
              />
            ))}
          </div>
        )}
      </div>

      <footer className="border-t border-border/80 px-5 py-4 text-center">
        <button
          type="button"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          onClick={onSeeAll}
        >
          {seeAllLabel}
        </button>
      </footer>
    </section>
  );
}
