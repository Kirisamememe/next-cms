import ArticleForm from "../../components/article-form";
import { prisma } from "@/prisma";
import { Locale } from "@/i18n/config";

type Props = {
  params: Promise<{
    id: string
    locale: Locale
  }>
}

export default async function EditArticlePage({ params }: Props) {


  const { id } = await params
  if (!id) {
    return (
      <ArticleForm />
    )
  }

  const article = await prisma.article.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      article_atoms: true
    }
  })

  return (
    <ArticleForm article={article} />
  )
}