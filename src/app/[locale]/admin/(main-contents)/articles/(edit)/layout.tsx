import { ReactNode } from "react"
import { InsetLayoutWithPadding } from "../../../_components/inset-layout-with-padding"

type Props = {
  children: ReactNode
}

export default function EditArticleLayout({ children }: Props) {

  return (
    <InsetLayoutWithPadding>
      {children}
    </InsetLayoutWithPadding>
  )
}