import type { NotificationListItemViewModel } from "../NotificationList/NotificationList.types.js";

export interface NotificationItemProps {
  item: NotificationListItemViewModel;
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

const priorityStyles = {
  high: "border-l-red-500 bg-red-50/50",
  medium: "border-l-amber-500 bg-amber-50/30",
  low: "border-l-slate-300 bg-white",
} as const;

export function NotificationItem({
  item,
  markReadLabel,
  pinLabel,
  unpinLabel,
  dismissLabel,
  onSelect,
  onOpen,
  onMarkAsRead,
  onPin,
  onDismiss,
}: NotificationItemProps) {
  return (
    <article
      className={`border-l-4 border-b border-b-slate-100 px-4 py-3 transition-colors ${
        priorityStyles[item.priority]
      } ${item.isSelected ? "ring-2 ring-inset ring-blue-200" : ""} ${
        item.isRead ? "opacity-70" : ""
      }`}
      onClick={() => onSelect(item.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {item.isPinned ? <span aria-hidden>📌</span> : null}
            <h3 className="truncate text-sm font-semibold text-slate-900">{item.title}</h3>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {item.repo} · {item.author}
          </p>
          <p className="mt-2 line-clamp-2 text-sm text-slate-600">{item.bodyPreview}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-1">
          <button
            type="button"
            className="rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white hover:bg-slate-800"
            onClick={(event) => {
              event.stopPropagation();
              onOpen(item.id);
            }}
          >
            Open
          </button>
          {!item.isRead ? (
            <button
              type="button"
              className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
              onClick={(event) => {
                event.stopPropagation();
                onMarkAsRead(item.id);
              }}
            >
              {markReadLabel}
            </button>
          ) : null}
          <button
            type="button"
            className="rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
            onClick={(event) => {
              event.stopPropagation();
              onPin(item.id);
            }}
          >
            {item.isPinned ? unpinLabel : pinLabel}
          </button>
          <button
            type="button"
            className="rounded-md border border-red-200 px-2 py-1 text-xs text-red-700 hover:bg-red-50"
            onClick={(event) => {
              event.stopPropagation();
              onDismiss(item.id);
            }}
          >
            {dismissLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
