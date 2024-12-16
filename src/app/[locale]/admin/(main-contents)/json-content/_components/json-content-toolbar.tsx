'use client'

import { Flexbox, FlexRow } from "@/components/ui/flexbox"
import { CategoryFilter } from "../../../_components/category/category-filter"
import { ArrowDownNarrowWide, ArrowDownWideNarrow, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import React from "react"
import { useCategory } from "../../../_components/category/category-provider"

type Props = {
  sortOrder: 'asc' | 'desc'
  handleSort: () => void
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export const JsonContentToolbar = ({ sortOrder, handleSort, setSearchQuery }: Props) => {
  const t = useTranslations()
  const { categories } = useCategory()

  return (
    <Flexbox className="justify-between gap-3 flex-col-reverse @[52rem]:flex-row @[52rem]:items-center">
      <CategoryFilter contentCategories={categories} categoryType='json' />
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
  )
}