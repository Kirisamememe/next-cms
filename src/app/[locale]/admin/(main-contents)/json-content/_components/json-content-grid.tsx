import { GridColumn } from "@/components/ui/grid"
import { JsonContentItem } from "./json-content-item"
import { NoContentFound } from "@/components/no-article-found"
import { getTranslations } from "next-intl/server"
import { jsonContentService } from "@/di/services"
import { Filter } from "@/types"
import { SearchResult } from "../../../_components/content/search-result"
import { ContentTotal } from "../../../_components/content/content-total"

type Props = {
  filter: Filter
  orderby: 'updatedAt' | 'createdAt',
  sort: 'asc' | 'desc'
  searchQuery: string
  categoryId?: number
  take: number
}

export const JsonContentGrid = async ({ filter, orderby, sort, searchQuery, categoryId, take }: Props) => {
  const t = await getTranslations()
  const total = await jsonContentService.getCount(filter, categoryId)
  const data = await jsonContentService.getMany(filter, ({ take: !searchQuery ? take : undefined, orderby, sort }))
  const filteredByCategory = data.filter((jsonContent) => (!categoryId || jsonContent.categoryId === categoryId))

  if (!filteredByCategory.length) {
    return (
      <NoContentFound text={t('jsonContent.noContent')} />
    )
  }

  if (!searchQuery) {
    return (
      <>
        <GridColumn className="appear @[52rem]:grid-cols-2 @[80rem]:grid-cols-3">
          {filteredByCategory.map((jsonContent) => (
            <JsonContentItem key={jsonContent.id} jsonContent={jsonContent} />
          ))}
        </GridColumn>
        <ContentTotal text={t('common.search.total', { total })} />
      </>
    )
  }

  const searchArr = searchQuery.split(/[\s\u3000]+/)
  const filteredBySearch = filteredByCategory.filter((jsonContent) => (
    jsonContent.id.toString() === searchQuery ||
    searchArr.some((word) =>
      JSON.stringify(jsonContent.jsonAtom.content).toLowerCase().includes(word.toLowerCase()) ||
      jsonContent.jsonAtom.title?.toLowerCase().includes(word.toLowerCase()) ||
      jsonContent.jsonAtom.description?.toLowerCase().includes(word.toLowerCase())
    )
  ))

  return (
    <>
      <SearchResult
        filterBadge={t(`article.tabs.${filter}`)}
        searchQuery={t('common.search.searchQuery', { query: searchQuery })}
        total={t('common.search.total', { total: filteredBySearch.length })}
      />
      <GridColumn className="appear @[52rem]:grid-cols-2 @[80rem]:grid-cols-3">
        {filteredBySearch.map((jsonContent) => (
          <JsonContentItem key={jsonContent.id} jsonContent={jsonContent} />
        ))}
      </GridColumn>
    </>
  )
}