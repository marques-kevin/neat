import { Provider } from "react-redux";
import type { AppStore } from "@app/store";

export interface StoreProviderProps {
  store: AppStore;
  children: React.ReactNode;
}

export function StoreProvider({ store, children }: StoreProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
