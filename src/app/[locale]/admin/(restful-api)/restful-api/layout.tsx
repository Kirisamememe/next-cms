import { ReactNode } from "react"
import { ApiTabs } from "./_components/tabs"

type Props = {
  children: ReactNode
}

export default function RestfulApiLayout({ children }: Props) {
  return (
    <>
      <ApiTabs />
      {children}
    </>
  )
}