'use client'

import { GridColumn } from "@/components/ui/grid"
import { JsonContentForClient } from "@/types/schema-json-content"
import { JsonContentItem } from "./json-content-item"
import { NoContentFound } from "@/components/no-article-found"
import { useTranslations } from "next-intl"
import { JsonContentToolbar } from "./json-content-toolbar"
import { useCallback, useState } from "react"
import { useSearchParams } from "next/navigation"
import { idSchema } from "@/types"

type Props = {
  jsonContents: JsonContentForClient[]
}

export const JsonContentGrid = ({ jsonContents }: Props) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchQuery, setSearchQuery] = useState('')
  const params = useSearchParams()
  const category = params.get('category')
  const categoryId = category ? idSchema.parse(Number(category)) : null

  const t = useTranslations()

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const sort = useCallback((jsonContents: JsonContentForClient[], order: 'asc' | 'desc') => {
    return [...jsonContents].sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime()
      const dateB = new Date(b.updatedAt).getTime()
      return order === 'asc' ? dateA - dateB : dateB - dateA
    })
  }, [])

  const jsonContentList = sort(jsonContents, sortOrder)
    .filter((jsonContent) => (!categoryId || jsonContent.categoryId === categoryId) && (
      JSON.stringify(jsonContent.jsonAtom.content).toLowerCase().includes(searchQuery.toLowerCase())
      || jsonContent.jsonAtom.title?.toLowerCase().includes(searchQuery.toLowerCase())
      || jsonContent.jsonAtom.description?.toLowerCase().includes(searchQuery.toLowerCase())))


  return (
    <>
      <JsonContentToolbar sortOrder={sortOrder} handleSort={handleSort} setSearchQuery={setSearchQuery} />
      <GridColumn className="@[52rem]:grid-cols-2 @[80rem]:grid-cols-3">
        {jsonContentList.map((jsonContent) => (
          <JsonContentItem key={jsonContent.id} jsonContent={jsonContent} />
        ))}
      </GridColumn>
      {!jsonContentList.length && (
        <NoContentFound text={t('jsonContent.noContent')} />)}
    </>
  )
}