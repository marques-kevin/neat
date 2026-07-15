import { useMemo } from "react";
import { IntlProvider } from "react-intl";
import { getMessages, resolveEffectiveLocale, type SupportedLocale } from "../i18n/index.js";

export interface AppIntlProviderProps {
  localeSetting: string;
  children: React.ReactNode;
}

export function AppIntlProvider({ localeSetting, children }: AppIntlProviderProps) {
  const locale = useMemo(
    () => resolveEffectiveLocale(localeSetting),
    [localeSetting],
  ) as SupportedLocale;
  const messages = useMemo(() => getMessages(locale), [locale]);

  return (
    <IntlProvider locale={locale} messages={messages} defaultLocale="en">
      {children}
    </IntlProvider>
  );
}
