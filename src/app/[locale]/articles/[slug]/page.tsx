import { Locale } from "@/i18n"
import { notFound } from "next/navigation"
import Markdown from 'react-markdown'
import { articleService } from "@/di/services"


type Props = {
  params: Promise<{
    slug: string
    locale: Locale
  }>
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const { data, noData } = await articleService.getById(Number(slug))

  if (noData || !data) notFound()

  return (
    <Markdown className={"prose dark:prose-invert"}>
      {data.atom.body}
    </Markdown>
  )

}