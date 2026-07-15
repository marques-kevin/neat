import en from "./locales/en.json";
import fr from "./locales/fr.json";

export const SUPPORTED_LOCALES = ["en", "fr"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = "en";

export const messages = {
  en,
  fr,
} as const;

export function resolveLocale(stored?: string | null): SupportedLocale {
  if (stored && stored !== "auto" && SUPPORTED_LOCALES.includes(stored as SupportedLocale)) {
    return stored as SupportedLocale;
  }

  if (typeof globalThis.navigator !== "undefined") {
    const browserLang = globalThis.navigator.language.split("-")[0];
    if (SUPPORTED_LOCALES.includes(browserLang as SupportedLocale)) {
      return browserLang as SupportedLocale;
    }
  }

  return DEFAULT_LOCALE;
}

export function getMessages(locale: SupportedLocale) {
  return messages[locale];
}

export function resolveEffectiveLocale(storedLocale?: string | null): SupportedLocale {
  if (storedLocale && storedLocale !== "auto") {
    return resolveLocale(storedLocale);
  }
  return resolveLocale(null);
}
