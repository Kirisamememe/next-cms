import { GridColumn } from "@/components/ui/grid"
import { JsonContentForClient } from "@/types/schema-json-content"
import { JsonContentItem } from "./json-content-item"
import { NoContentFound } from "@/components/no-article-found"
import { useTranslations } from "next-intl"

type Props = {
  jsonContents: JsonContentForClient[]
}

export const JsonContentGrid = ({ jsonContents }: Props) => {
  const t = useTranslations()

  return (
    <>
      <GridColumn className="@[52rem]:grid-cols-2 @[80rem]:grid-cols-3">
        {jsonContents.map((jsonContent) => (
          <JsonContentItem key={jsonContent.id} jsonContent={jsonContent} />
        ))}
      </GridColumn>
      {!jsonContents.length && (
        <NoContentFound text={t('jsonContent.noContent')} />)}
    </>
  )
}