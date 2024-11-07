import { notFound } from "next/navigation";
import { idSchema } from "@/types/id-schema";
import { NewArticle } from "../../_components/new-article";
import { EditArticle } from "../../_components/edit-article";
import { fetchById } from "../../_actions/fetch";


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
  const res = await fetchById(id)
  if (!res.isSuccess) {
    notFound()
  }

  return (
    <EditArticle article={res.data} />
  )
}