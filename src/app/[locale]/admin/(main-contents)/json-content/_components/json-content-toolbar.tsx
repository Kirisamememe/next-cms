import { Flexbox, FlexRow } from "@/components/ui/flexbox"
import { CategoryFilter } from "../../../_components/category/category-filter"
import { SortBtn } from "../../../_components/content/sort-btn"
import { SearchBar } from "../../../_components/content/search-bar"
import { jsonContentCategoryService } from "@/di/services"

export const JsonContentToolbar = async () => {
  const categories = await jsonContentCategoryService.fetchMany()

  return (
    <Flexbox className="justify-between shrink-0 gap-3 flex-col-reverse @[52rem]:flex-row @[52rem]:items-center">
      <CategoryFilter contentCategories={categories} categoryType='json' />
      <FlexRow gap={3} className="relative w-full @[52rem]:max-w-72">
        <SearchBar />
        <SortBtn />
      </FlexRow>
    </Flexbox>
  )
}