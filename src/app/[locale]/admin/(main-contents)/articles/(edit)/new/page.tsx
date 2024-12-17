import { articleCategoryService } from "@/di/services";
import { NewArticle } from "../../_components/new-article";

export default async function EditArticlePage() {
  const categories = await articleCategoryService.fetchMany()

  return <NewArticle categories={categories} />
}