import { ReactNode } from "react"
import { InsetLayoutNoPadding } from "../../../_components/inset-layout-no-padding"

type Props = {
  children: ReactNode
}

export default function EditArticleLayout({ children }: Props) {

  return (
    <InsetLayoutNoPadding>
      {children}
    </InsetLayoutNoPadding>
  )
}