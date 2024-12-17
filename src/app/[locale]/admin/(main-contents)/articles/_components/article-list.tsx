import { ArticleCard } from "./article-card";
import { Filter } from "@/types";
import { GridColumn } from "@/components/ui/grid";
import { NoContentFound } from "../../../../../../components/no-article-found";
import { getTranslations } from "next-intl/server";
import { articleService } from "@/di/services";
import { sortContents } from "@/lib";


type Props = {
  filter: Filter,
  sortOpt: 'asc' | 'desc',
  searchQuery: string,
  categoryId: number | null
}

export async function ArticleList({ filter, sortOpt, searchQuery, categoryId }: Props) {
  const t = await getTranslations()
  const articles = await articleService.getMany(filter)
  const filteredArticles = sortContents(articles, sortOpt).filter((article) => (!categoryId || article.categoryId === categoryId) && (
    article.atom.body.toLowerCase().includes(searchQuery.toLowerCase())
    || article.atom.title?.toLowerCase().includes(searchQuery.toLowerCase())))

  return (
    <>
      <GridColumn className="appear @[105rem]:grid-cols-2 gap-3">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </GridColumn>
      {filteredArticles.length === 0 &&
        <NoContentFound text={t('article.noArticles')} />
      }
    </>
  )
}


