import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { SquarePen } from "lucide-react";
import { useTranslations } from "next-intl";

export function NewArticleBtn() {
  const t = useTranslations()

  return (
    <Button
      asChild
      size={"sm"}
      className={cn(
        "fixed right-6 rounded-full z-50 font-semibold",
        "bottom-8 [&>span]:hidden w-14 h-14 ",
        "sm:top-3.5 sm:[&>span]:block sm:[&>svg]:size-4 sm:w-auto sm:h-9 sm:pl-4 sm:pr-5",
        ""
      )}>
      <Link href={'/admin/articles/edit'}>
        <SquarePen size={24} />
        <span>
          {t('article.newArticle')}
        </span>
      </Link>
    </Button>
  )
}