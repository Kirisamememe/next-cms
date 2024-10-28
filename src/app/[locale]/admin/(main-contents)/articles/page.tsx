import { Button } from "@/components/ui/button";
import { Flexbox } from "@/components/ui/flexbox";
import { Plus } from "lucide-react";
import Link from "next/link";
import ArticleList from "./components/article-list";
import { Suspense } from "react";
import { useTranslations } from "next-intl";

export default function ArticlesPage() {
  const t = useTranslations()

  return (
    <Flexbox gap={6} className="appear justify-stretch">
      <Button asChild variant={"outline"} size={"lg"} className="h-14 font-bold">
        <Link href={'/admin/articles/edit'}>
          <Plus size={20} />
          {t('article.newArticle')}
        </Link>
      </Button>
      <Suspense>
        <ArticleList />  
      </Suspense>
    </Flexbox>
  )
}