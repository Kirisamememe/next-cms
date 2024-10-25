/**
 * server actionではないけれど、クライアントで実行されたくない・実行する必要がないよねって時に使うのが
 * 'server-only'
 */
import 'server-only'
import { locales, Locale } from '@/i18n-config'


const dictionaries = Object.fromEntries(locales.map((locale) => [
  locale,
  () => import(`../i18n/${locale.toLowerCase()}.json`).then((module) => module.default)
]))

export const getDictionary = async (locale: Locale) => dictionaries[locale]()