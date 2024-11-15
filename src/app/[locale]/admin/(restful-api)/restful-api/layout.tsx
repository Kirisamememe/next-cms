import { ReactNode } from "react"

type Props = {
  accessToken: ReactNode
  mainContent: ReactNode
  customContent: ReactNode
}

export default function RestfulApiLayout({ accessToken, mainContent, customContent }: Props) {
  return (
    <>
      {accessToken}
      {mainContent}
      {customContent}
    </>
  )
}