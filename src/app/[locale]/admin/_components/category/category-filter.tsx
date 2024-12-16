'use client'

import { FlexRow } from "@/components/ui/flexbox"
import { CategoryBtn, CreateCategoryBtn } from "@/app/[locale]/admin/_components/category/category-btn"
import { ContentCategory } from "@/types"
import { CategoryType } from "@/types/index"

type Props = {
  contentCategories: ContentCategory[]
  categoryType: CategoryType
}

export const CategoryFilter = ({ contentCategories, categoryType }: Props) => {

  return (
    <FlexRow gap={3}>
      {contentCategories.map((category) => (
        <CategoryBtn key={category.id} categoryId={category.id} name={category.name} />
      ))}
      <CreateCategoryBtn noCategory={contentCategories.length < 1} categoryType={categoryType} />
    </FlexRow>
  )
}