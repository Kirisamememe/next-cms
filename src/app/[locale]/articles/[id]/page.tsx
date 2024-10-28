import { Locale } from "@/i18n/config"
import { prisma } from "@/prisma"
import Markdown from 'react-markdown'

type Props = {
  params: Promise<{
    id: string
    locale: Locale
  }>
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params
  const article = await prisma.article.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      article_atoms: true
    }
  })

  if (!article?.article_atoms[0].body) {
    return null
  }

  return (
    <Markdown className={"prose dark:prose-invert"}>
      {article?.article_atoms[0].body}
    </Markdown>
  )
}