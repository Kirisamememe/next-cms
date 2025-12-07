import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Heading, Paragraph } from "@/components/ui/typography";
import { Link } from "@/i18n";
import { extractFirstNCharacters, extractTitleFromMarkdown } from "@/lib";
import { PublicationDatetimePopover } from "../../../_components/content/publication-datetime-popover";
import { ArchiveAlertDialog } from "../../../_components/content/archive-dialog";
import { ContentStatusWithId } from "../../../_components/content/content-status-with-id";
import { updateArticlePublishedAt } from "../../../_actions/update";
import { CopyBtn } from "../../../_components/content/copy-btn";
import { AuthorAndDatetime } from "../../../_components/content/author-and-datetime";
import { ArticleListItemForClient } from "@/types";

type Props = {
  article: ArticleListItemForClient;
};

export function ArticleCard({ article }: Props) {
  const title =
    article.atom.title || extractTitleFromMarkdown(article.atom.body);
  const summary =
    article.atom.summary || extractFirstNCharacters(article.atom.body, 120);

  return (
    <FlexColumn className="relative justify-between bg-card border rounded-lg shadow-sm">
      <Link
        href={`/admin/articles/edit/${article.id}`}
        className="flex flex-col p-6 pb-5 gap-4 h-full hover:bg-muted/50"
      >
        <FlexColumn>
          <ContentStatusWithId
            id={article.id}
            publishedAt={article.publishedAt}
            isArchived={!!article.archivedAt}
            className="-mt-1 mb-4 -ml-0.5 w-fit"
          />
          <TitleAndSummary title={title} summary={summary} clamp={2} />
        </FlexColumn>

        <AuthorAndDatetime
          authorImage={article.author.image || ""}
          lastEditorImage={article.lastEdited.image || ""}
          authorName={article.author.nickname || article.author.name || ""}
          lastEditorName={
            article.lastEdited.nickname || article.lastEdited.name || ""
          }
          updatedAt={article.updatedAt}
          createdAt={article.createdAt}
        />
      </Link>

      <ActionBar
        content={article.atom}
        articleId={article.id}
        publishedAt={article.publishedAt}
        isArchived={!!article.archivedAt}
      />
    </FlexColumn>
  );
}

function TitleAndSummary({
  title,
  summary,
  clamp = 1,
}: {
  title: string;
  summary: string;
  clamp?: 1 | 2;
}) {
  return (
    <>
      <Heading clamp={1} size={16} weight={600} mb={1}>
        {title}
      </Heading>
      <Paragraph color="muted" size={14} clamp={clamp} mb={1} height={1.65}>
        {summary}
      </Paragraph>
    </>
  );
}

function ActionBar({
  articleId,
  publishedAt,
  isArchived,
  content,
}: {
  articleId: number;
  publishedAt: Date | null;
  isArchived: boolean;
  content: any;
}) {
  return (
    <FlexRow className="shrink-0 gap-2 border-t px-5 py-1">
      <ArchiveAlertDialog
        variant={"ghost"}
        size={"icon"}
        contentId={articleId}
        isArchived={isArchived}
        contentType="article"
        className="mr-auto"
      />
      <CopyBtn content={content} />
      <PublicationDatetimePopover
        variant={"ghost"}
        size={"icon"}
        contentId={articleId}
        date={publishedAt}
        side="left"
        align="start"
        updateAction={updateArticlePublishedAt}
      />
    </FlexRow>
  );
}
