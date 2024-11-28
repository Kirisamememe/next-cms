export const i18n = {
  defaultLocale: "en",
  locales: {
    "en": "English",
    "ja": "日本語",
    "zh-CN": "简体中文",
    "zh-TW": "繁體中文",
  },
} as const;

export const localeNames = Object.entries(i18n.locales).map(([_, value]) => value)
export const locales = Object.entries(i18n.locales).map(([key]) => key)

export type Locale = keyof typeof i18n.locales;
export type LocaleName = (typeof i18n.locales)[Locale]