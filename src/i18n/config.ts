export const locales = ["en", "bn", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "bn";

export const localeNames = {
  en: "English",
  bn: "বাংলা",
  hi: "हिंदी",
};
//RTL text if available then
export const rtlLocales: Locale[] = [];
