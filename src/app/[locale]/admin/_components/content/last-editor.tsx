import { getLocaleForFns } from "@/i18n"
import { cn } from "@/lib"
import { formatDistanceToNow } from "date-fns"
import { useTranslations } from "next-intl"

export const LastEditor = ({
  nickname,
  name,
  updatedAt,
  locale,
  className
}: {
  nickname: string | null,
  name: string | null,
  updatedAt: Date,
  locale: string,
  className?: string
}) => {
  const t = useTranslations()

  return (
    <>
      <span className={cn("shrink-0 text-xs @[52rem]:text-sm font-medium @[52rem]:font-normal text-muted-foreground/70", className)}>
        {t('article.lastEdited', {
          name: nickname || name,
          datetime: formatDistanceToNow(updatedAt, {
            addSuffix: true,
            locale: getLocaleForFns(locale)
          })
        })}
      </span>
    </>
  )
}