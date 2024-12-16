import { ReactNode } from "react"
import { ApiTabs } from "./_components/tabs"
import { InsetLayoutWithPadding } from "../../_components/inset-layout-with-padding"

type Props = {
  children: ReactNode
}

export default function RestfulApiLayout({ children }: Props) {
  return (
    <>
      <ApiTabs />
      <InsetLayoutWithPadding>
        {children}
      </InsetLayoutWithPadding>
    </>
  )
}