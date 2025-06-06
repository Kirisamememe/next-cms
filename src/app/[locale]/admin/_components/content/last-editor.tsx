import { Separator } from "@/components/ui/separator"
import { LabelText } from "@/components/ui/typography"
import { getLocaleForFns } from "@/i18n"
import { cn } from "@/lib"
import { formatDistanceToNow } from "date-fns"
import { useLocale, useTranslations } from "next-intl"

export const LastEditor = ({
  name,
  updatedAt,
  className
}: {
  name: string,
  updatedAt: Date,
  className?: string
}) => {
  const locale = useLocale()
  const t = useTranslations()

  return (
    <LabelText className={cn("flex items-center gap-2 shrink-0 text-muted-foreground/70", className)}>
      <span>
        {t('common.editor.lastEdit', { name })}
      </span>
      <Separator orientation="vertical" className="h-2.5" />
      {formatDistanceToNow(updatedAt, {
        addSuffix: true,
        locale: getLocaleForFns(locale)
      })
      }
    </LabelText>
  )
}