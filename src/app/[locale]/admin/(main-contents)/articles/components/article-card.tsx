import { Card } from "@/components/ui/card"
import { Heading, LabelText, Paragraph } from "@/components/ui/typography"
import { Link } from "@/i18n/routing"
import { extractFirstNCharacters, extractTitleFromMarkdown } from "@/lib/utils"
import { ArticleWithAuthor } from "@/types/article-schema"
import { format } from 'date-fns'
import Image from "next/image"

type Props = {
  article: ArticleWithAuthor
}

export function ArticleCard({ article }: Props) {
  const title = article.article_atoms[0].title || extractTitleFromMarkdown(article.article_atoms[0].body)
  const summary = article.article_atoms[0].summary || extractFirstNCharacters(article.article_atoms[0].body, 120)

  return (
    <Link href={`/admin/articles/edit/${article.id}`}>
      <Card className="flex flex-col bg-card hover:bg-muted/50 gap-1 px-5 py-4 h-fit sm:h-48 border rounded-lg">
        <Heading py={1} clamp={2}>
          {title}
        </Heading>
        <Paragraph color="muted" clamp={3} mb={5}>
          {summary}
        </Paragraph>
        <LabelText size={14} weight={400} className="inline-flex items-center gap-2 mt-auto">
          <Image src={article.author.image || ""} width={22} height={22} alt="" className="rounded-full" />
          {article.author.nickname || article.author.name}
          <span className="ml-auto">{format(article.updated_at, "yyyy/MM/dd HH:mm")}</span>
        </LabelText>
      </Card>
    </Link>
  )
}