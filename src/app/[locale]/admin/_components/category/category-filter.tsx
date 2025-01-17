'use client'

import { FlexRow } from "@/components/ui/flexbox"
import { CategoryBtn, CreateCategoryBtn } from "@/app/[locale]/admin/_components/category/category-btn"
import { ContentCategory } from "@/types"
import { CategoryType } from "@/types/index"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

type Props = {
  contentCategories: ContentCategory[]
  categoryType: CategoryType
}

export const CategoryFilter = ({ contentCategories, categoryType }: Props) => {

  return (
    <ScrollArea className="w-full h-10">
      <FlexRow gap={3} className="w-full mt-1">
        {contentCategories.map((category) => (
          <CategoryBtn key={category.id} categoryId={category.id} name={category.name} />
        ))}
        <CreateCategoryBtn noCategory={contentCategories.length < 1} categoryType={categoryType} />
      </FlexRow>
      <ScrollBar orientation="horizontal" className="translate-y-1.5 [&>div]:max-h-[2px]" />
    </ScrollArea>
  )
}