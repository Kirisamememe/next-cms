import { prisma } from "@/lib/prisma";
import { ArticleCard } from "./article-card";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { GridColumn } from "@/components/ui/grid";

export default async function ArticleList() {
  const t = await getTranslations()

  const articles = await prisma.article.findMany({
    include: {
      article_atoms: true,
      author: true
    }
  })

  return (
    <GridColumn lg={2} xl={3} xxl={4}>
      <Button asChild variant={"outline"} size={"lg"} className="min-h-12 h-full font-bold">
        <Link href={'/admin/articles/edit'}>
          <Plus size={20} />
          {t('article.newArticle')}
        </Link>
      </Button>
      {articles.length &&
        articles.map((article, index) => <ArticleCard key={index} article={article} />)
      }
    </GridColumn>
  )
}
