import { articleCategoryService, mediaFolderService, imageUrlService } from "@/di/services";
import { NewArticle } from "../../_components/new-article";

export default async function EditArticlePage() {
  const categories = await articleCategoryService.fetchMany()
  const folders = mediaFolderService.fetchMany()
  const images = imageUrlService.getSimpleList()

  return <NewArticle categories={categories} folders={folders} images={images} />
}