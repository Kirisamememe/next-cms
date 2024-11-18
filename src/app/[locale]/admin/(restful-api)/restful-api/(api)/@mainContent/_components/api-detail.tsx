import { getLocaleForFns } from "@/i18n/get-locale"
import { Api } from "@/types/api-schema"
import { formatDistanceToNow } from "date-fns"
import { format } from "date-fns/format"
import { Power, CalendarIcon, GitForkIcon, GlobeIcon, RefreshCwIcon } from 'lucide-react'
import { useLocale, useTranslations } from "next-intl"

type Props = {
  api: Api
}

export function ApiDetails({ api }: Props) {
  const locale = useLocale()
  const t = useTranslations()

  return (
    <div className="space-y-2 text-sm">
      <DetailItem
        icon={<GitForkIcon />}
        label={t('restfulApi.mainApi.card.path')}
        value={api.path} />
      <DetailItem
        icon={<CalendarIcon />}
        label={t('restfulApi.mainApi.card.createdAt')}
        value={format(api.createdAt, "PPP p", { locale: getLocaleForFns(locale) })} />
      <DetailItem
        icon={<RefreshCwIcon />}
        label={t('restfulApi.mainApi.card.updatedAt')}
        value={format(api.updatedAt, "PPP p", { locale: getLocaleForFns(locale) })} />
      <DetailItem
        icon={<Power />}
        label={t('restfulApi.mainApi.card.status.title')}
        value={api.activatedAt ?
          t('restfulApi.mainApi.card.status.active', {
            date: formatDistanceToNow(api.updatedAt, {
              locale: getLocaleForFns(locale)
            })
          }) :
          t('restfulApi.mainApi.card.status.inactive')} />
      <DetailItem
        icon={<GlobeIcon />}
        label={t('restfulApi.mainApi.card.origin')}
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
      <span className="text-muted-foreground truncate max-w-[200px]">{value}</span>
    </div>
  )
}