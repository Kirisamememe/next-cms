import { enUS as en, ja, zhCN, zhTW } from 'date-fns/locale'

export function getLocaleForFns(locale?: string) {
  const locales = { en, ja, zhCN, zhTW }
  if (!locale) return locales.en
  const localeKey = locale.replace('-', '')
  return locales[localeKey as keyof typeof locales] || locales.en
}

