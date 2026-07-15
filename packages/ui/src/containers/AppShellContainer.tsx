import { useState } from "react";
import { useIntl } from "react-intl";
import {
  refreshNotificationFeedThunk,
  selectLocale,
  selectNotificationsState,
  selectUnreadCount,
  selectUiState,
  setLocaleThunk,
  simulateIncomingNotificationThunk,
  syncNotificationsThunk,
  toggleFocusMode,
  useAppDispatch,
  useAppSelector,
} from "@app/store";
import { TooltipProvider } from "@app/ui/components/ui/tooltip";
import { AppHeader } from "../components/AppHeader/AppHeader.js";
import { LanguageSwitcher } from "../components/LanguageSwitcher/LanguageSwitcher.js";
import { NotificationListContainer } from "./NotificationListContainer.js";

export interface AppShellContainerProps {
  enablePushSimulation?: boolean;
}

export function AppShellContainer({ enablePushSimulation = false }: AppShellContainerProps) {
  const dispatch = useAppDispatch();
  const { formatMessage } = useIntl();
  const unreadCount = useAppSelector(selectUnreadCount);
  const { status } = useAppSelector(selectNotificationsState);
  const { focusMode } = useAppSelector(selectUiState);
  const locale = useAppSelector(selectLocale);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <TooltipProvider>
      <div className="app-shell min-h-screen bg-[linear-gradient(180deg,#f3f4f6_0%,#eef0f3_45%,#f7f7f8_100%)] text-foreground">
        <AppHeader
          searchPlaceholder={formatMessage({ id: "notifications.search" })}
          searchValue={searchQuery}
          unreadCount={unreadCount}
          notificationsLabel={formatMessage({ id: "notifications.title" })}
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
          simulatePushLabel={
            enablePushSimulation ? formatMessage({ id: "actions.simulatePush" }) : undefined
          }
          onSearchChange={setSearchQuery}
          onToggleFocusMode={() => {
            dispatch(toggleFocusMode());
            dispatch(refreshNotificationFeedThunk());
          }}
          onSync={() => dispatch(syncNotificationsThunk())}
          onSimulatePush={
            enablePushSimulation
              ? () => {
                  void dispatch(simulateIncomingNotificationThunk());
                }
              : undefined
          }
        />

        <main className="app-shell-main mx-auto w-full max-w-md px-4 pb-10 sm:px-0">
          <NotificationListContainer searchQuery={searchQuery} />

          <div className="app-shell-footer mt-6 flex justify-center">
            <LanguageSwitcher
              label={formatMessage({ id: "settings.language" })}
              value={locale}
              autoLabel={formatMessage({ id: "settings.language.auto" })}
              englishLabel={formatMessage({ id: "settings.language.en" })}
              frenchLabel={formatMessage({ id: "settings.language.fr" })}
              onChange={(nextLocale) => dispatch(setLocaleThunk(nextLocale))}
            />
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}
