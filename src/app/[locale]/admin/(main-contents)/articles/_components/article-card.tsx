import { FlexColumn, FlexRow } from "@/components/ui/flexbox"
import { Separator } from "@/components/ui/separator"
import { Heading, Paragraph } from "@/components/ui/typography"
import { Link } from "@/i18n"
import { extractFirstNCharacters, extractTitleFromMarkdown } from "@/lib"
import { ArticleForClient } from "@/types"
import { useLocale, useTranslations } from "next-intl"
import { PublicationDatetimePopover } from "../../../_components/content/publication-datetime-popover"
import { ArchiveAlertDialog } from "../../../_components/content/archive-dialog"
import { LastEditor } from "../../../_components/content/last-editor"
import { ContentStatusWithId } from "../../../_components/content/content-status-with-id"
import Image from "next/image"

type Props = {
  article: ArticleForClient
}

export function ArticleCard({ article }: Props) {
  const t = useTranslations()
  const locale = useLocale()

  const title = article.atom.title || extractTitleFromMarkdown(article.atom.body)
  const summary = article.atom.summary || extractFirstNCharacters(article.atom.body, 120)

  return (
    <>
      <FlexRow className="hidden @[52rem]:flex justify-between items-center bg-card hover:bg-muted/50 gap-8 px-5 py-3 h-fit border rounded-lg shadow-sm">
        <Link href={`/admin/articles/edit/${article.id}`}>
          <FlexColumn className="overflow-hidden">
            <TitleAndSummary title={title} summary={summary} />

            <FlexRow className="text-sm font-medium text-muted-foreground/70 mt-2 inline-flex items-center gap-2 shrink-0">
              <Image src={article.author.image || ""} width={20} height={20} alt="" className="rounded-full" />
              {article.author.nickname || article.author.name}
              <Separator orientation="vertical" className="h-4 mx-1" />
              <LastEditor nickname={article.lastEdited.nickname} name={article.lastEdited.name} updatedAt={article.updatedAt} locale={locale} />
            </FlexRow>
          </FlexColumn>
        </Link>

        <FlexRow center gap={4} className="shrink-0">
          <ContentStatusWithId id={article.id} publishedAt={article.publishedAt} isArchived={!!article.archivedAt} />
          <Separator orientation="vertical" className="h-10 mx-1" />
          <ButtonArea articleId={article.id} publishedAt={article.publishedAt} isArchived={!!article.archivedAt} />
        </FlexRow>

      </FlexRow>


      <FlexColumn className="relative @[52rem]:hidden justify-between bg-card hover:bg-muted/50 gap-2 px-4 @[40rem]:px-5 py-3 h-fit border rounded-lg shadow-sm">
        <Link href={`/admin/articles/edit/${article.id}`}>
          <FlexColumn>
            <ContentStatusWithId id={article.id} publishedAt={article.publishedAt} isArchived={!!article.archivedAt} className="mt-1 mb-3 w-fit" />
            <LastEditor className="mb-2" nickname={article.author.nickname} name={article.author.name} updatedAt={article.updatedAt} locale={locale} />
            <TitleAndSummary title={title} summary={summary} />
          </FlexColumn>

          <FlexRow className="justify-between text-sm mt-2 inline-flex items-center gap-2 shrink-0">
            <FlexRow className="items-center gap-2">
              <Image src={article.author.image || ""} width={30} height={30} alt="" className="rounded-full h-fit shrink-0" />
              <FlexColumn className="text-sm font-medium text-muted-foreground">
                {t('article.author', { name: article.author.nickname || article.author.name })}
              </FlexColumn>
            </FlexRow>
          </FlexRow>
        </Link>

        <FlexRow center className="absolute right-3 bottom-3 shrink-0 gap-3 @[40rem]:gap-4">
          <ButtonArea articleId={article.id} publishedAt={article.publishedAt} isArchived={!!article.archivedAt} />
        </FlexRow>
      </FlexColumn>
    </>
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
      <PublicationDatetimePopover variant={"outline"} size={"icon"} contentId={articleId} date={publishedAt} contentType="article" side="left" align="start" />
      <ArchiveAlertDialog variant={"outline"} size={"icon"} contentId={articleId} isArchived={isArchived} contentType="article" />
    </>
  )
}