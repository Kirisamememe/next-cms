'use client'

import { Flexbox, FlexRow } from "@/components/ui/flexbox"
import { CategoryFilter } from "../../../_components/category/category-filter"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"
import React from "react"
import { useCategory } from "../../../_components/category/category-provider"
import { SortBtn } from "../../../_components/content/sort-btn"

type Props = {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export const JsonContentToolbar = ({ setSearchQuery }: Props) => {
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
        <SortBtn />
      </FlexRow>
    </Flexbox>
  )
}