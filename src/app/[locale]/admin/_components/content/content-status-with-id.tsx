import { Badge } from "@/components/ui/badge";
import { FlexRow } from "@/components/ui/flexbox";
import { cn } from "@/lib";
import { useTranslations } from "next-intl";

type Props = {
  publishedAt: Date | null
  isArchived: boolean
  className?: string | null
  id: number
}

export function ContentStatusWithId({ publishedAt, isArchived, className, id }: Props) {
  const t = useTranslations()

  if (isArchived) {
    return (
      <FlexRow className={cn(
        "gap-0.5 [&>div]:bg-rose-500/10 [&>div]:text-rose-500 [&>div]:px-1.5",
        className
      )}>
        <Badge variant={'secondary'} className="h-fit rounded-l-sm rounded-r-none">
          {id}
        </Badge>
        <Badge variant={"custom"}
          className={cn("h-fit rounded-l-none rounded-r-sm")}>
          {t(`article.status.archive`)}
        </Badge>
      </FlexRow>
    )
  }

  const status = publishedAt ? publishedAt < new Date() ? "published" : "scheduled" : "draft"

  return (
    <FlexRow
      className={cn(
        "gap-0.5 [&>div]:bg-rose-500/10 [&>div]:text-rose-500 [&>div]:px-1.5",
        status === "draft" && "[&>div]:bg-muted/60 [&>div]:text-muted-foreground",
        status === "published" && "[&>div]:bg-emerald-500/10 [&>div]:text-emerald-600 [&>div]:dark:text-emerald-500",
        status === "scheduled" && "[&>div]:bg-blue-600/10 [&>div]:text-blue-700 [&>div]:dark:text-blue-500",
        className
      )}>
      <Badge variant={'secondary'} className="h-fit rounded-l-sm rounded-r-none">
        {id}
      </Badge>
      <Badge variant={"custom"}
        className={cn(
          "h-fit rounded-l-none rounded-r-sm",
        )}>
        {t(`article.status.${status}`)}
      </Badge>
    </FlexRow>
  )
}