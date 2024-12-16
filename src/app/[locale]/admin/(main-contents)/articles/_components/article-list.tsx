'use client'

import { useCallback, useState } from "react";
import { ArticleCard } from "./article-card";
import { ArticleForClient, idSchema } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowDownNarrowWide, ArrowDownWideNarrow, Search } from 'lucide-react';
import { GridColumn } from "@/components/ui/grid";
import { Flexbox, FlexRow } from "@/components/ui/flexbox";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { NoContentFound } from "../../../../../../components/no-article-found";
import { CategoryFilter } from "../../../_components/category/category-filter";
import { useCategory } from "../../../_components/category/category-provider";
import { useSearchParams } from "next/navigation";


type Props = {
  articles: ArticleForClient[]
}

export function ArticleList({ articles }: Props) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchQuery, setSearchQuery] = useState('')
  const t = useTranslations()
  const params = useSearchParams()
  const category = params.get('category')
  const categoryId = category ? idSchema.parse(Number(category)) : null

  const { categories } = useCategory()

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const sort = useCallback((articles: ArticleForClient[], order: 'asc' | 'desc') => {
    return [...articles].sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime()
      const dateB = new Date(b.updatedAt).getTime()
      return order === 'asc' ? dateA - dateB : dateB - dateA
    })
  }, [])

  const articleList = sort(articles, sortOrder)
    .filter((article) => (!categoryId || article.categoryId === categoryId) && (
      article.atom.body.toLowerCase().includes(searchQuery.toLowerCase())
      || article.atom.title?.toLowerCase().includes(searchQuery.toLowerCase())))

  return (
    <>
      <Flexbox className="justify-between gap-3 flex-col-reverse @[52rem]:flex-row @[52rem]:items-center">
        <CategoryFilter contentCategories={categories} categoryType='article' />
        <FlexRow gap={3} className="relative w-full @[52rem]:max-w-72">
          <Search size={16} className="absolute left-3 top-3" />
          <Input
            className="flex-grow pl-10 rounded-lg"
            placeholder={t('article.filter')}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
          />
          <Button onClick={handleSort} variant={"outline"} size={"icon"} className="shrink-0 h-10">
            {sortOrder === 'asc' ? <ArrowDownNarrowWide /> : <ArrowDownWideNarrow />}
          </Button>
        </FlexRow>
      </Flexbox>

      <GridColumn className="appear @[105rem]:grid-cols-2 gap-3">
        {articleList.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </GridColumn>
      {articleList.length === 0 &&
        <NoContentFound text={t('article.noArticles')} />
      }
    </>
  )
}


