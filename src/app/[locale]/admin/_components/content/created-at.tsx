import { LabelText } from "@/components/ui/typography"
import { getLocaleForFns } from "@/i18n"
import { formatDistanceToNow } from "date-fns"
import { FilePlus } from "lucide-react"
import { useLocale } from "next-intl"

type Props = {
  createdAt: Date
}

export const CreatedAt = ({ createdAt }: Props) => {
  const locale = useLocale()

  return (
    <LabelText className="flex items-center gap-1.5 text-muted-foreground/70 shrink-0 font-medium">
      <FilePlus size={12} />
      {formatDistanceToNow(createdAt, {
        addSuffix: true,
        locale: getLocaleForFns(locale)
      })}
    </LabelText>
  )
}