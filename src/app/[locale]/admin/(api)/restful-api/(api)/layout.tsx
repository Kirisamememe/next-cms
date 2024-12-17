import { ReactNode } from "react"

type Props = {
  article: ReactNode
  json: ReactNode
  gallery: ReactNode
}

export default function RestfulApiLayout({ article, json, gallery }: Props) {
  return (
    <>
      {article}
      {json}
      {gallery}
    </>
  )
}