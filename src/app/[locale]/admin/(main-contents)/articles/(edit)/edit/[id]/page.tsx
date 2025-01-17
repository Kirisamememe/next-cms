import { notFound } from "next/navigation";
import { idSchema } from "@/types";
import { EditArticle } from "../../../_components/edit-article";
import { articleCategoryService, articleService, imageUrlService, mediaFolderService } from "@/di/services";

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params

  // 記事idあれば、バリデーション
  const parseId = await idSchema.safeParseAsync(Number(id))
  if (parseId.error) {
    notFound()
  }

  const categories = await articleCategoryService.fetchMany()
  const data = await articleService.getById(parseId.data)
  const folders = mediaFolderService.fetchMany()
  const images = imageUrlService.getSimpleList()

  if (!data) notFound()

  return (
    <EditArticle article={data} categories={categories} folders={folders} images={images} />
  )
}