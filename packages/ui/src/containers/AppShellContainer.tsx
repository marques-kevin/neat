import { useIntl } from "react-intl";
import {
  refreshNotificationFeedThunk,
  selectLocale,
  selectNotificationsState,
  selectUnreadCount,
  selectUiState,
  setLocaleThunk,
  syncNotificationsThunk,
  toggleFocusMode,
  useAppDispatch,
  useAppSelector,
} from "@app/store";
import { AppHeader } from "../components/AppHeader/AppHeader.js";
import { LanguageSwitcher } from "../components/LanguageSwitcher/LanguageSwitcher.js";
import { NotificationListContainer } from "./NotificationListContainer.js";

export function AppShellContainer() {
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();
  const unreadCount = useAppSelector(selectUnreadCount);
  const { status } = useAppSelector(selectNotificationsState);
  const { focusMode } = useAppSelector(selectUiState);
  const locale = useAppSelector(selectLocale);

  return (
    <div className="min-h-screen bg-slate-100">
      <AppHeader
        appName={formatMessage({ id: "app.name" })}
        unreadCount={unreadCount}
        unreadLabel={formatMessage({ id: "notifications.unread" }, { count: unreadCount })}
        focusMode={focusMode}
        focusModeLabel={formatMessage({
          id: focusMode ? "ui.focusMode.on" : "ui.focusMode.off",
        })}
        syncLabel={
          status === "loading"
            ? formatMessage({ id: "actions.syncing" })
            : formatMessage({ id: "actions.sync" })
        }
        isLoading={status === "loading"}
        onToggleFocusMode={() => {
          dispatch(toggleFocusMode());
          dispatch(refreshNotificationFeedThunk());
        }}
        onSync={() => dispatch(syncNotificationsThunk())}
      />

      <main className="mx-auto max-w-4xl space-y-6 px-6 py-6">
        <div className="flex justify-end">
          <LanguageSwitcher
            label={formatMessage({ id: "settings.language" })}
            value={locale}
            autoLabel={formatMessage({ id: "settings.language.auto" })}
            englishLabel={formatMessage({ id: "settings.language.en" })}
            frenchLabel={formatMessage({ id: "settings.language.fr" })}
            onChange={(nextLocale) => dispatch(setLocaleThunk(nextLocale))}
          />
        </div>

        <NotificationListContainer />
      </main>
    </div>
  );
}
