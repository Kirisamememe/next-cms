import { notFound } from "next/navigation";
import { idSchema } from "@/types/id-schema";
import { NewArticle } from "../../_components/new-article";
import { EditArticle } from "../../_components/edit-article";
import { articleService } from "@/services/article-service";


type Props = {
  params: Promise<{
    slug: string[]
  }>
}

export default async function EditArticlePage({ params }: Props) {
  const { slug } = await params
  if (slug[0] !== 'edit' || slug.length > 2) {
    notFound()
  }

  // 記事idあるか確認、なければ記事作成
  if (!slug[1]) {
    return <NewArticle />
  }

  // 記事idあれば、バリデーション
  const parseId = await idSchema.safeParseAsync(Number(slug[1]))
  if (parseId.error) {
    notFound()
  }

  const id = parseId.data
  const { data, noData } = await articleService.getById(id)
  if (noData) {
    notFound()
  }

  return (
    <EditArticle article={data} />
  )
}