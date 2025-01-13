import { LabelText } from "@/components/ui/typography"
import { getLocaleForFns } from "@/i18n"
import { cn } from "@/lib"
import { formatDistanceToNow } from "date-fns"
import { UserRoundPen } from "lucide-react"
import { useLocale } from "next-intl"

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

  return (
    <LabelText className={cn("flex items-center gap-1.5 shrink-0 font-medium text-muted-foreground/70", className)}>
      <UserRoundPen size={12} />
      <span>
        {name}
      </span>
      {formatDistanceToNow(updatedAt, {
        addSuffix: true,
        locale: getLocaleForFns(locale)
      })
      }
    </LabelText>
  )
}