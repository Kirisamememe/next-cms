import { ArticleCard } from "./article-card";
import { Filter } from "@/types";
import { GridColumn } from "@/components/ui/grid";
import { NoContentFound } from "../../../../../../components/no-article-found";
import { getTranslations } from "next-intl/server";
import { articleService } from "@/di/services";
import { InfinityScroll } from "../../../_components/content/infinity-scroll";
import { SearchResult } from "../../../_components/content/search-result";


type Props = {
  filter: Filter,
  orderby: 'updatedAt' | 'createdAt',
  sort: 'asc' | 'desc',
  searchQuery: string,
  categoryId?: number,
  take: number
}

export async function ArticleList({ filter, orderby, sort, searchQuery, categoryId, take }: Props) {
  const t = await getTranslations()

  const total = await articleService.getCount(filter, categoryId)
  const articles = await articleService.getMany(filter, ({ take: !searchQuery ? take : undefined, orderby, sort }))
  const filteredByCategory = articles.filter((article) => (!categoryId || article.categoryId === categoryId))

  if (!filteredByCategory.length || !total) {
    return (
      <NoContentFound text={t('article.noArticles')} />
    )
  }

  if (!searchQuery) {
    return (
      <>
        <GridColumn className="appear @[54rem]:grid-cols-2 @[80rem]:grid-cols-3 gap-3">
          {filteredByCategory.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </GridColumn>
        <InfinityScroll total={total} />
      </>
    )
  }

  const searchArr = searchQuery.split(/[\s\u3000]+/)
  const filteredBySearch = filteredByCategory.filter((article) => (
    article.id.toString() === searchQuery ||
    searchArr.some((word) =>
      article.atom.body.toLowerCase().includes(word.toLowerCase()) ||
      article.atom.title?.toLowerCase().includes(word.toLowerCase()) ||
      article.atom.summary?.toLowerCase().includes(word.toLowerCase())
    )
  ))

  return (
    <>
      <SearchResult
        filterBadge={t(`article.tabs.${filter}`)}
        searchQuery={t('common.search.searchQuery', { query: searchQuery })}
        total={t('common.search.total', { total: filteredBySearch.length })}
      />
      <GridColumn className="appear @[54rem]:grid-cols-2 @[80rem]:grid-cols-3 gap-3">
        {filteredBySearch.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </GridColumn>
    </>
  )
}
