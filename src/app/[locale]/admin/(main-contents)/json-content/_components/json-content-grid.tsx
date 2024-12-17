import { GridColumn } from "@/components/ui/grid"
import { JsonContentItem } from "./json-content-item"
import { NoContentFound } from "@/components/no-article-found"
import { getTranslations } from "next-intl/server"
import { jsonContentService } from "@/di/services"
import { Filter } from "@/types"
import { sortContents } from "@/lib"

type Props = {
  filter: Filter
  sortOpt: 'asc' | 'desc'
  searchQuery: string
  categoryId: number | null
}

export const JsonContentGrid = async ({ filter, sortOpt, searchQuery, categoryId }: Props) => {
  const t = await getTranslations()
  const data = await jsonContentService.getMany(filter)
  const filteredJsonContent = sortContents(data, sortOpt).filter((jsonContent) => (!categoryId || jsonContent.categoryId === categoryId) && (
    JSON.stringify(jsonContent.jsonAtom.content).toLowerCase().includes(searchQuery.toLowerCase())
    || jsonContent.jsonAtom.title?.toLowerCase().includes(searchQuery.toLowerCase())
    || jsonContent.jsonAtom.description?.toLowerCase().includes(searchQuery.toLowerCase())))

  return (
    <>
      <GridColumn className="appear @[52rem]:grid-cols-2 @[80rem]:grid-cols-3">
        {filteredJsonContent.map((jsonContent) => (
          <JsonContentItem key={jsonContent.id} jsonContent={jsonContent} />
        ))}
      </GridColumn>
      {!filteredJsonContent.length && (
        <NoContentFound text={t('jsonContent.noContent')} />)}
    </>
  )
}