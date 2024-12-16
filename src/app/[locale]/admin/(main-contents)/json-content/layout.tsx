import { jsonContentCategoryService } from "@/di/services"
import { CategoryProvider } from "../../_components/category/category-provider"

type Props = {
  children: React.ReactNode
}

export default async function Layout({ children }: Props) {
  const categories = await jsonContentCategoryService.fetchMany()

  return (
    <CategoryProvider categories={categories}>
      {children}
    </CategoryProvider>
  )
}