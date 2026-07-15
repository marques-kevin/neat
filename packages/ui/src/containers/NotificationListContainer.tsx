import { useMemo, useState } from "react";
import { useIntl } from "react-intl";
import {
  archiveNotificationThunk,
  markAsReadThunk,
  openNotificationThunk,
  pinNotificationThunk,
  selectNotification,
  selectNotificationFeed,
  selectSelectedNotification,
  selectUiState,
  useAppDispatch,
  useAppSelector,
} from "@app/store";
import type { NotificationFilter } from "../components/NotificationList/NotificationList.types.js";
import { NotificationList } from "../components/NotificationList/NotificationList.js";
import { toNotificationListItemViewModel } from "./mappers.js";

export interface NotificationListContainerProps {
  searchQuery?: string;
}

export function NotificationListContainer({ searchQuery = "" }: NotificationListContainerProps) {
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();
  const items = useAppSelector(selectNotificationFeed);
  const { selectedId } = useAppSelector(selectUiState);
  const selected = useAppSelector(selectSelectedNotification);
  const [filter, setFilter] = useState<NotificationFilter>("all");

  const viewModels = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return items
      .filter((item) => (filter === "unread" ? !item.isRead : true))
      .filter((item) => {
        if (!query) {
          return true;
        }
        return (
          item.title.toLowerCase().includes(query) ||
          item.bodyPreview.toLowerCase().includes(query) ||
          item.author.toLowerCase().includes(query) ||
          item.repoFullName.toLowerCase().includes(query)
        );
      })
      .map((item) => toNotificationListItemViewModel(item, selected?.id ?? selectedId));
  }, [filter, items, searchQuery, selected?.id, selectedId]);

  const unreadIds = useMemo(
    () => items.filter((item) => !item.isRead).map((item) => item.id),
    [items],
  );

  return (
    <NotificationList
      title={formatMessage({ id: "notifications.title" })}
      markAllAsReadLabel={formatMessage({ id: "actions.markAllRead" })}
      allTabLabel={formatMessage({ id: "notifications.filter.all" })}
      unreadTabLabel={formatMessage({ id: "notifications.filter.unread" })}
      seeAllLabel={formatMessage({ id: "notifications.seeAll" })}
      emptyLabel={formatMessage({ id: "notifications.empty" })}
      filter={filter}
      items={viewModels}
      markReadLabel={formatMessage({ id: "actions.markRead" })}
      pinLabel={formatMessage({ id: "actions.pin" })}
      unpinLabel={formatMessage({ id: "actions.unpin" })}
      dismissLabel={formatMessage({ id: "actions.dismiss" })}
      moreLabel={formatMessage({ id: "actions.more" })}
      onFilterChange={setFilter}
      onMarkAllAsRead={() => {
        for (const id of unreadIds) {
          void dispatch(markAsReadThunk(id));
        }
      }}
      onSeeAll={() => setFilter("all")}
      onSelect={(id) => dispatch(selectNotification(id))}
      onOpen={(id) => dispatch(openNotificationThunk(id))}
      onMarkAsRead={(id) => dispatch(markAsReadThunk(id))}
      onPin={(id) => dispatch(pinNotificationThunk(id))}
      onDismiss={(id) => dispatch(archiveNotificationThunk(id))}
    />
  );
}
