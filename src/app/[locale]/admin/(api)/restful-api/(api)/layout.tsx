import { ReactNode } from "react"

type Props = {
  article: ReactNode
  json: ReactNode
  gallery: ReactNode
  group: ReactNode
}

export default function RestfulApiLayout({ article, json, gallery, group }: Props) {
  return (
    <>
      {article}
      {json}
      {gallery}
      {group}
    </>
  )
}