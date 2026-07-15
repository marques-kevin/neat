import { StrictMode, useEffect, useMemo } from "react";
import { bootstrapInMemoryContainer, createInMemoryContainer } from "@app/infrastructure";
import {
  createAppStore,
  selectLocale,
  syncNotificationsThunk,
  useAppDispatch,
  useAppSelector,
} from "@app/store";
import { AppIntlProvider, AppShellContainer, resolveEffectiveLocale, StoreProvider } from "@app/ui";
import { TauriOsNotificationService } from "./platform/TauriOsNotificationService.js";

const osNotifications = new TauriOsNotificationService();
const container = createInMemoryContainer({ osNotifications });
const store = createAppStore(container);

function Bootstrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const localeSetting = useAppSelector(selectLocale);

  useEffect(() => {
    void (async () => {
      await osNotifications.ensurePermission();
      await bootstrapInMemoryContainer(container);
      await dispatch(syncNotificationsThunk());
    })();
  }, [dispatch]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      void dispatch(syncNotificationsThunk());
    }, 60_000);

    return () => window.clearInterval(interval);
  }, [dispatch]);

  const effectiveLocale = useMemo(() => resolveEffectiveLocale(localeSetting), [localeSetting]);

  return (
    <AppIntlProvider localeSetting={localeSetting} key={effectiveLocale}>
      {children}
    </AppIntlProvider>
  );
}

export function App() {
  return (
    <StoreProvider store={store}>
      <Bootstrapper>
        <AppShellContainer enablePushSimulation />
      </Bootstrapper>
    </StoreProvider>
  );
}

export function AppRoot() {
  useEffect(() => {
    document.body.classList.add("desktop-shell");
    return () => document.body.classList.remove("desktop-shell");
  }, []);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}
