import { ReactNode } from "react";
import { ArticleTabs } from "./components/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

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
        className="fixed right-6 top-3 z-50 font-bold ">
        <Link href={'/admin/articles/edit'}>
          <Plus size={18} />
          {t('article.newArticle')}
        </Link>
      </Button>
      <div className="relative">
        {children}
      </div>
    </>
  )
}

