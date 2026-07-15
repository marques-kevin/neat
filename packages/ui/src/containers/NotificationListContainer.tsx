import { useMemo } from "react";
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
import { EmptyState } from "../components/EmptyState/EmptyState.js";
import { NotificationList } from "../components/NotificationList/NotificationList.js";
import { toNotificationListItemViewModel } from "./mappers.js";

export function NotificationListContainer() {
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();
  const items = useAppSelector(selectNotificationFeed);
  const { selectedId } = useAppSelector(selectUiState);
  const selected = useAppSelector(selectSelectedNotification);

  const viewModels = useMemo(
    () => items.map((item) => toNotificationListItemViewModel(item, selected?.id ?? selectedId)),
    [items, selected?.id, selectedId],
  );

  if (viewModels.length === 0) {
    return (
      <EmptyState
        title={formatMessage({ id: "notifications.empty" })}
        description={formatMessage({ id: "notifications.empty.description" })}
      />
    );
  }

  return (
    <NotificationList
      items={viewModels}
      markReadLabel={formatMessage({ id: "actions.markRead" })}
      pinLabel={formatMessage({ id: "actions.pin" })}
      unpinLabel={formatMessage({ id: "actions.unpin" })}
      dismissLabel={formatMessage({ id: "actions.dismiss" })}
      onSelect={(id) => dispatch(selectNotification(id))}
      onOpen={(id) => dispatch(openNotificationThunk(id))}
      onMarkAsRead={(id) => dispatch(markAsReadThunk(id))}
      onPin={(id) => dispatch(pinNotificationThunk(id))}
      onDismiss={(id) => dispatch(archiveNotificationThunk(id))}
    />
  );
}
