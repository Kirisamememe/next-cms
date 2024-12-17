import { notFound } from "next/navigation";
import { idSchema } from "@/types";
import { EditArticle } from "../../../_components/edit-article";
import { articleService } from "@/di/services";



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

  const data = await articleService.getById(parseId.data)

  if (!data) notFound()

  return (
    <EditArticle article={data} />
  )
}