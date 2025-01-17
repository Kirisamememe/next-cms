import { Flexbox, FlexRow } from "@/components/ui/flexbox"
import { CategoryFilter } from "../../../_components/category/category-filter"
import { SortBtn } from "../../../_components/content/sort-btn"
import { SearchBar } from "../../../_components/content/search-bar"
import { jsonContentCategoryService } from "@/di/services"
import { getTranslations } from "next-intl/server"

export const JsonContentToolbar = async () => {
  const categories = await jsonContentCategoryService.fetchMany()
  const t = await getTranslations()

  return (
    <Flexbox className="justify-between shrink-0 gap-3 flex-col-reverse @[52rem]:flex-row @[52rem]:items-center">
      <CategoryFilter contentCategories={categories} categoryType='json' />
      <FlexRow gap={3} className="relative w-full @[52rem]:max-w-80">
        <SearchBar query='search' placeholder={t('common.search.placeholder')} />
        <SortBtn />
      </FlexRow>
    </Flexbox>
  )
}