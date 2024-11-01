import { FlexRow } from "@/components/ui/flexbox"
import { Separator } from "@/components/ui/separator"
import { Heading, Paragraph } from "@/components/ui/typography"
import { getLocale } from "@/i18n/get-locale"
import { Link } from "@/i18n/routing"
import { extractFirstNCharacters, extractTitleFromMarkdown } from "@/lib/utils"
import { ArticleWithAuthor } from "@/types/article-schema"
import { formatDistanceToNow } from 'date-fns'
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useParams } from "next/navigation"
import { PublicationDatetimePopover } from "./publication-datetime-popover"
import { ArticleStatus } from "./article-status"
import { ArchiveAlertDialog } from "./archive-dialog"
import { useSession } from "next-auth/react"

type Props = {
  article: ArticleWithAuthor
}

export function ArticleCard({ article }: Props) {
  const t = useTranslations()
  const params = useParams<{ locale: string }>()
  const session = useSession()
  if (!session.data?.operatorId) {
    return null
  }

  const title = article.article_atoms[0].title || extractTitleFromMarkdown(article.article_atoms[0].body)
  const summary = article.article_atoms[0].summary || extractFirstNCharacters(article.article_atoms[0].body, 120)

  return (
    <Link href={`/admin/articles/edit/${article.id}`}>
      <FlexRow className="justify-between items-center bg-card hover:bg-muted/50 gap-8 px-5 py-3 h-fit border rounded-lg shadow-sm">
        <div className="overflow-hidden">
          <Heading py={1} clamp={1} className="">
            {title}
          </Heading>
          <Paragraph color="muted" clamp={1} mb={1}>
            {summary}
          </Paragraph>

          <FlexRow className="text-sm text-muted-foreground/70 mt-2 inline-flex items-center gap-2 shrink-0">
            <Image src={article.author.image || ""} width={20} height={20} alt="" className="rounded-full" />
            <span className="shrink-0">
              {article.author.nickname || article.author.name}
            </span>
            <Separator orientation="vertical" className="h-4 mx-1" />
            <span className="shrink-0">
              {t('article.lastEdited', {
                name: article.last_edited.nickname || article.last_edited.name,
                datetime: formatDistanceToNow(article.updated_at, {
                  addSuffix: true,
                  locale: getLocale(params.locale)
                })
              })}
            </span>
          </FlexRow>
        </div>

        <FlexRow center gap={4} className="shrink-0" onClick={(e) => e.preventDefault()}>
          <ArticleStatus published_at={article.published_at} isArchived={!!article.archived_at} />
          <Separator orientation="vertical" className="h-10 mx-1" />
          <PublicationDatetimePopover articleId={article.id} atomId={article.article_atoms[0].id} date={article.published_at} />
          <ArchiveAlertDialog articleId={article.id} isArchived={!!article.archived_at} />
        </FlexRow>

      </FlexRow>
    </Link>
  )
}