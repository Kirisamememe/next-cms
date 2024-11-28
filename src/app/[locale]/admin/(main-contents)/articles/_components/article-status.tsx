import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib";
import { useTranslations } from "next-intl";

type Props = {
  publishedAt: Date | null
  isArchived: boolean
  className?: string | null
}

export function ArticleStatus({ publishedAt, isArchived, className }: Props) {
  const t = useTranslations()

  if (isArchived) {
    return (
      <Badge variant={"custom"}
        className={cn("h-fit bg-rose-500/10 text-rose-500 rounded-sm px-1.5 @[52rem]:px-2 @[52rem]:rounded-full", className)}>
        {t(`article.status.archive`)}
      </Badge>
    )
  }

  const status = publishedAt ? publishedAt < new Date() ? "published" : "scheduled" : "draft"

  return (
    <Badge variant={"custom"}
      className={cn(
        "h-fit px-1.5 @[52rem]:px-2 rounded-sm @[52rem]:rounded-full",
        status === "draft" && "bg-muted/60 text-muted-foreground",
        status === "published" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500",
        status === "scheduled" && "bg-blue-600/10 text-blue-700 dark:text-blue-500",
        className
      )}>
      {t(`article.status.${status}`)}
    </Badge>
  )
}