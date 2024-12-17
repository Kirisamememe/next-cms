'use client'

import { useState } from "react";
import { ArticleCard } from "./article-card";
import { ArticleForClient, idSchema } from "@/types";
import { Search } from 'lucide-react';
import { GridColumn } from "@/components/ui/grid";
import { Flexbox, FlexRow } from "@/components/ui/flexbox";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { NoContentFound } from "../../../../../../components/no-article-found";
import { CategoryFilter } from "../../../_components/category/category-filter";
import { useCategory } from "../../../_components/category/category-provider";
import { useSearchParams } from "next/navigation";
import { SortBtn } from "../../../_components/content/sort-btn";


type Props = {
  articles: ArticleForClient[]
}

export function ArticleList({ articles }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const t = useTranslations()
  const params = useSearchParams()
  const category = params.get('category')
  const categoryId = category ? idSchema.parse(Number(category)) : null
  const { categories } = useCategory()

  const articleList = articles
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
          <SortBtn />
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


