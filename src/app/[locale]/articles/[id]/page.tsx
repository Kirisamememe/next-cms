import { Locale } from "@/i18n/config"
import { articleService } from "@/services/article-service"
import Markdown from 'react-markdown'

type Props = {
  params: Promise<{
    id: string
    locale: Locale
  }>
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params
  const { data, noData } = await articleService.getById(Number(id))

  if (noData) {
    return null
  }

  return (
    <Markdown className={"prose dark:prose-invert"}>
      {data.atom.body}
    </Markdown>
  )
}