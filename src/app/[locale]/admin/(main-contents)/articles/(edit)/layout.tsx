import { ReactNode } from "react"
import { InsetLayoutWithPadding } from "../../../_components/inset-layout-with-padding"
import { CategoryProvider } from "../../../_components/category/category-provider"
import { articleCategoryService } from "@/di/services"

type Props = {
  children: ReactNode
}

export default async function EditArticleLayout({ children }: Props) {
  const categories = await articleCategoryService.fetchMany()

  return (
    <InsetLayoutWithPadding>
      <CategoryProvider categories={categories}>
        {children}
      </CategoryProvider>
    </InsetLayoutWithPadding>
  )
}