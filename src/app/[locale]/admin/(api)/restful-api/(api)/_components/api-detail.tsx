import { getLocaleForFns } from "@/i18n"
import { Api } from "@/types"
import { formatDistanceToNow } from "date-fns"
import { format } from "date-fns/format"
import { Power, CalendarIcon, GitForkIcon, GlobeIcon, RefreshCwIcon, TextSearch } from 'lucide-react'
import { useLocale, useTranslations } from "next-intl"

type Props = {
  api: Api
  searchParams: string
}

export function ApiDetails({ api, searchParams }: Props) {
  const locale = useLocale()
  const t = useTranslations()

  return (
    <div className="space-y-2 text-sm">
      <DetailItem
        icon={<GitForkIcon />}
        label={t('api.card.path')}
        value={api.path} />
      <DetailItem
        icon={<TextSearch />}
        label={t('api.card.searchParams')}
        value={searchParams} />
      <DetailItem
        icon={<CalendarIcon />}
        label={t('api.card.createdAt')}
        value={format(api.createdAt, "PPP p", { locale: getLocaleForFns(locale) })} />
      <DetailItem
        icon={<RefreshCwIcon />}
        label={t('api.card.updatedAt')}
        value={format(api.updatedAt, "PPP p", { locale: getLocaleForFns(locale) })} />
      <DetailItem
        icon={<Power />}
        label={t('api.card.status.title')}
        value={api.activatedAt ?
          t('api.card.status.active', {
            date: formatDistanceToNow(api.updatedAt, {
              locale: getLocaleForFns(locale)
            })
          }) :
          t('api.card.status.inactive')} />
      <DetailItem
        icon={<GlobeIcon />}
        label={t('api.card.origin')}
        value={api.allowedOrigins ? api.allowedOrigins : '*'} />
    </div>
  )
}


type DetailItemProps = {
  icon: React.ReactNode
  label: string
  value: string
}

function DetailItem({ icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-center space-x-2 text-sm">
      <span className="[&>svg]:size-4">
        {icon}
      </span>
      <span className="font-medium">{label}:</span>
      <span className="text-muted-foreground truncate">{value}</span>
    </div>
  )
}