import { GridColumn } from "@/components/ui/grid"
import { ReactNode } from "react"

type Props = {
  article: ReactNode,
  jsonContent: ReactNode,
  gallery: ReactNode,
  api: ReactNode,
  editor: ReactNode,
}

export default function Layout({ article, jsonContent, gallery, api, editor }: Props) {
  return (
    <GridColumn p={6} grid={6} className="appear">
      {article}
      {jsonContent}
      {gallery}
      {api}
      {editor}
    </GridColumn>
  )
}