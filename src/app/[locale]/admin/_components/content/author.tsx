import { Separator } from "@/components/ui/separator"
import { LabelText } from "@/components/ui/typography"
import { getLocaleForFns } from "@/i18n"
import { formatDistanceToNow } from "date-fns"
import { useLocale, useTranslations } from "next-intl"

type Props = {
  createdAt: Date
  authorName: string
}

export const Author = ({ createdAt, authorName }: Props) => {
  const locale = useLocale()
  const t = useTranslations()

  return (
    <LabelText className="flex items-center gap-2 text-muted-foreground shrink-0 font-semibold">
      <span>
        {t('common.editor.createdBy', { name: authorName })}
      </span>
      <Separator orientation="vertical" className="h-2.5" />
      {formatDistanceToNow(createdAt, {
        addSuffix: true,
        locale: getLocaleForFns(locale)
      })}
    </LabelText>
  )
}