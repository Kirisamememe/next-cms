import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

type Props = {
  published_at: Date | null
  isArchived: boolean
}

export function ArticleStatus({ published_at, isArchived }: Props) {
  const t = useTranslations()

  if (isArchived) {
    return (
      <Badge variant={"custom"}
        className={"h-fit bg-rose-500/10 text-rose-500"}>
        {t(`article.status.archive`)}
      </Badge>
    )
  }

  const status = published_at ? published_at < new Date() ? "published" : "scheduled" : "draft"

  return (
    <Badge variant={"custom"}
      className={cn(
        "h-fit",
        status === "draft" && "bg-muted/60 text-muted-foreground",
        status === "published" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500",
        status === "scheduled" && "bg-blue-600/10 text-blue-700 dark:text-blue-500"
      )}>
      {t(`article.status.${status}`)}
    </Badge>
  )
}