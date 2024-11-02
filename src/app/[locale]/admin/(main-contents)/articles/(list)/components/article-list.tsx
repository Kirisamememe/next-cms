'use client'

import { useCallback, useState } from "react";
import { ArticleCard } from "./article-card";
import { ArticleWithAuthor } from "@/types/article-schema";
import { Button } from "@/components/ui/button";
import { ArrowDownNarrowWide, ArrowDownWideNarrow } from 'lucide-react';
import { GridColumn } from "@/components/ui/grid";

type Props = {
  articles: ArticleWithAuthor[]
}

export function ArticleList({ articles }: Props) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const sort = useCallback((articles: ArticleWithAuthor[], order: 'asc' | 'desc') => {
    return [...articles].sort((a, b) => {
      const dateA = new Date(a.updated_at).getTime()
      const dateB = new Date(b.updated_at).getTime()
      return order === 'asc' ? dateA - dateB : dateB - dateA
    })
  }, [])

  return (
    <>
      <Button onClick={handleSort} variant={"outline"} size={"icon"} className="absolute right-0 -top-14 h-10">
        {sortOrder === 'asc' ? <ArrowDownNarrowWide /> : <ArrowDownWideNarrow />}
      </Button>
      <GridColumn className="appear @[96rem]:grid-cols-2 gap-3 @[40rem]:gap-4">
        {articles.length > 0 &&
          sort(articles, sortOrder).map((article, index) => <ArticleCard key={index} article={article} />)
        }
      </GridColumn>
    </>
  )
}
