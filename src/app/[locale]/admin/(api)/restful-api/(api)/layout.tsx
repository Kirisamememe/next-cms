import { ReactNode } from "react"

type Props = {
  mainContent: ReactNode
  customContent: ReactNode
}

export default function RestfulApiLayout({ mainContent, customContent }: Props) {
  return (
    <>
      {mainContent}
      {customContent}
    </>
  )
}