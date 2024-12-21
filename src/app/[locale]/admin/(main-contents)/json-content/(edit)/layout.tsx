import { InsetLayoutNoPadding } from "../../../_components/inset-layout-no-padding"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <InsetLayoutNoPadding>
      {children}
    </InsetLayoutNoPadding>
  )
}