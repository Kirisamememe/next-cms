'use client'

import { ArticleCard } from "./article-card";
import { ArticleListItemForClient, Filter } from "@/types";
import { GridColumn } from "@/components/ui/grid";
import { NoContentFound } from "../../../../../../components/no-article-found";
import { InfiniteScroll } from "../../../_components/content/infinite-scroll";
import { SearchResult } from "../../../_components/content/search-result";
import { useTranslations } from "next-intl";
import { use } from "react";


type Props = {
  total: Promise<number | null>
  articles: Promise<ArticleListItemForClient[]>
  searchQuery: string,
  filter: Filter
}

export function ArticleList({ total, articles, searchQuery, filter }: Props) {
  const t = useTranslations()
  const _total = use(total)
  const _articles = use(articles)

  if (!_articles.length || !_total) {
    return (
      <NoContentFound text={t('article.noArticles')} />
    )
  }

  if (!searchQuery) {
    return (
      <>
        <GridColumn className="appear @[54rem]:grid-cols-2 @[80rem]:grid-cols-3 gap-3">
          {_articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </GridColumn>
        <InfiniteScroll total={_total} />
      </>
    )
  }

  const searchArr = searchQuery.split(/[\s\u3000]+/).filter((word) => !!word.trim())
  const filteredBySearch = _articles.filter((article) => (
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
      {!filteredBySearch.length && <NoContentFound text={t('article.noArticles')} />}
    </>
  )
}
