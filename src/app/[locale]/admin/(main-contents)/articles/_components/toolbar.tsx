import { Flexbox, FlexRow } from "@/components/ui/flexbox"
import { CategoryFilter } from "../../../_components/category/category-filter"
import { SearchBar } from "../../../_components/content/search-bar"
import { SortBtn } from "../../../_components/content/sort-btn"
import { articleCategoryService } from "@/di/services"


export const ToolBar = async () => {
  const categories = await articleCategoryService.fetchMany()

  return (
    <Flexbox className="shrink-0 justify-between gap-3 flex-col-reverse @[52rem]:flex-row @[52rem]:items-center">
      <CategoryFilter contentCategories={categories} categoryType='article' />
      <FlexRow gap={3} className="relative w-full @[52rem]:max-w-72">
        <SearchBar />
        <SortBtn />
      </FlexRow>
    </Flexbox>
  )
}