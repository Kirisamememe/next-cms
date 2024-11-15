import { FlexColumn, FlexRow } from "@/components/ui/flexbox"
import { Separator } from "@/components/ui/separator"
import { Heading, Paragraph } from "@/components/ui/typography"
import { getLocale } from "@/i18n/get-locale"
import { Link } from "@/i18n/routing"
import { cn, extractFirstNCharacters, extractTitleFromMarkdown } from "@/lib/utils"
import { Article } from "@/types/article-schema"
import { formatDistanceToNow } from 'date-fns'
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useParams } from "next/navigation"
import { PublicationDatetimePopover } from "./publication-datetime-popover"
import { ArticleStatus } from "./article-status"
import { ArchiveAlertDialog } from "./archive-dialog"
import { useSession } from "next-auth/react"

type Props = {
  article: Article
}

export function ArticleCard({ article }: Props) {
  const t = useTranslations()
  const params = useParams<{ locale: string }>()
  const session = useSession()
  if (!session.data?.operatorId) {
    return null
  }

  const title = article.atom.title || extractTitleFromMarkdown(article.atom.body)
  const summary = article.atom.summary || extractFirstNCharacters(article.atom.body, 120)

  return (
    <Link href={`/admin/articles/edit/${article.id}`}>
      <FlexRow className="hidden @[52rem]:flex justify-between items-center bg-card hover:bg-muted/50 gap-8 px-5 py-3 h-fit border rounded-lg shadow-sm">
        <FlexColumn className="overflow-hidden">
          <TitleAndSummary title={title} summary={summary} />

          <FlexRow className="text-sm font-medium text-muted-foreground/70 mt-2 inline-flex items-center gap-2 shrink-0">
            <Image src={article.author.image || ""} width={20} height={20} alt="" className="rounded-full" />
            {article.author.nickname || article.author.name}
            <Separator orientation="vertical" className="h-4 mx-1" />
            <LastEdit nickname={article.lastEdited.nickname} name={article.lastEdited.name} updatedAt={article.updatedAt} locale={params.locale} />
          </FlexRow>
        </FlexColumn>

        <FlexRow center gap={4} className="shrink-0" onClick={(e) => e.preventDefault()}>
          <ArticleStatus publishedAt={article.publishedAt} isArchived={!!article.archivedAt} />
          <Separator orientation="vertical" className="h-10 mx-1" />
          <ButtonArea articleId={article.id} publishedAt={article.publishedAt} isArchived={!!article.archivedAt} />
        </FlexRow>

      </FlexRow>


      <FlexColumn className="@[52rem]:hidden justify-between bg-card hover:bg-muted/50 gap-2 px-4 @[40rem]:px-5 py-3 h-fit border rounded-lg shadow-sm">
        <FlexColumn>
          <ArticleStatus
            publishedAt={article.publishedAt}
            isArchived={!!article.archivedAt}
            className="-ml-1 mb-2 w-fit"
          />
          <LastEdit className="mb-2" nickname={article.author.nickname} name={article.author.name} updatedAt={article.updatedAt} locale={params.locale} />
          <TitleAndSummary title={title} summary={summary} />
        </FlexColumn>

        <FlexRow className="justify-between text-sm mt-2 inline-flex items-center gap-2 shrink-0">
          <FlexRow className="items-center gap-2">
            <Image src={article.author.image || ""} width={30} height={30} alt="" className="rounded-full h-fit shrink-0" />
            <FlexColumn className="text-sm font-medium text-muted-foreground">
              {t('article.author', { name: article.author.nickname || article.author.name })}
            </FlexColumn>
          </FlexRow>

          <FlexRow center className="shrink-0 gap-3 @[40rem]:gap-4" onClick={(e) => e.preventDefault()}>
            <ButtonArea articleId={article.id} publishedAt={article.publishedAt} isArchived={!!article.archivedAt} />
          </FlexRow>
        </FlexRow>
      </FlexColumn>
    </Link>
  )
}


function TitleAndSummary({
  title, summary
}: {
  title: string, summary: string
}) {
  return (
    <>
      <Heading clamp={1} size={16} weight={600}>
        {title}
      </Heading>
      <Paragraph color="muted" size={14} clamp={1} mb={1}>
        {summary}
      </Paragraph>
    </>
  )
}


function ButtonArea({
  articleId,
  publishedAt,
  isArchived
}: {
  articleId: number,
  publishedAt: Date | null,
  isArchived: boolean
}) {
  return (
    <>
      <PublicationDatetimePopover articleId={articleId} date={publishedAt} />
      <ArchiveAlertDialog articleId={articleId} isArchived={isArchived} />
    </>
  )
}


export function LastEdit({
  nickname,
  name,
  updatedAt,
  locale,
  className
}: {
  nickname: string | null,
  name: string | null,
  updatedAt: Date,
  locale: string,
  className?: string
}) {
  const t = useTranslations()

  return (
    <>
      <span className={cn("shrink-0 text-xs @[52rem]:text-sm font-medium @[52rem]:font-normal text-muted-foreground/70", className)}>
        {t('article.lastEdited', {
          name: nickname || name,
          datetime: formatDistanceToNow(updatedAt, {
            addSuffix: true,
            locale: getLocale(locale)
          })
        })}
      </span>
    </>
  )
}