import { InsetLayoutWithPadding } from "../../../_components/inset-layout-with-padding"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <InsetLayoutWithPadding>
      {children}
    </InsetLayoutWithPadding>
  )
}