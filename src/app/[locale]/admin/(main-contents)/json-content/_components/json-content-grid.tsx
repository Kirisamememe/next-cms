'use client'

import { GridColumn } from "@/components/ui/grid"
import { JsonContentForClient } from "@/types/schema-json-content"
import { JsonContentItem } from "./json-content-item"
import { NoContentFound } from "@/components/no-article-found"
import { useTranslations } from "next-intl"
import { JsonContentToolbar } from "./json-content-toolbar"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { idSchema } from "@/types"

type Props = {
  jsonContents: JsonContentForClient[]
}

export const JsonContentGrid = ({ jsonContents }: Props) => {
  const [searchQuery, setSearchQuery] = useState('')
  const params = useSearchParams()
  const category = params.get('category')
  const categoryId = category ? idSchema.parse(Number(category)) : null

  const t = useTranslations()

  const jsonContentList = jsonContents
    .filter((jsonContent) => (!categoryId || jsonContent.categoryId === categoryId) && (
      JSON.stringify(jsonContent.jsonAtom.content).toLowerCase().includes(searchQuery.toLowerCase())
      || jsonContent.jsonAtom.title?.toLowerCase().includes(searchQuery.toLowerCase())
      || jsonContent.jsonAtom.description?.toLowerCase().includes(searchQuery.toLowerCase())))


  return (
    <>
      <JsonContentToolbar setSearchQuery={setSearchQuery} />
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