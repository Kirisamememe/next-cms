import { ReactNode } from "react";
import { ArticleTabs } from "../components/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { SquarePen } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { FlexColumn } from "@/components/ui/flexbox";

type Props = {
  children: ReactNode
}

export default function ArticlePageLayout({ children }: Props) {
  const t = useTranslations()

  return (
    <>
      <ArticleTabs />
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
      <FlexColumn className="relative h-full mt-14 @[52rem]:mt-0">
        {children}
      </FlexColumn>
    </>
  )
}

