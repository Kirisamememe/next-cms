import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { convertToHighlightedJson } from "../_hooks/json-convert";
import { JsonContentForClient } from "@/types";
import { LabelText } from "@/components/ui/typography";
import { LastEditor } from "../../../_components/content/last-editor";
import { useLocale, useTranslations } from "next-intl";
import { ContentStatusWithId } from "../../../_components/content/content-status-with-id";
import { JsonContentItemActionBar } from "./json-content-item-action-bar";
import Image from "next/image";
import { Link } from "@/i18n";

type Props = {
  jsonContent: JsonContentForClient
}

export const JsonContentItem = ({ jsonContent }: Props) => {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <Card>
      <Link
        key={jsonContent.id}
        href={`/admin/json-content/edit/${jsonContent.id}`}
        className="[&>div]:hover:bg-muted/50 [&>div]:transition-colors [&>div]:duration-200"
      >
        <CardHeader>
          <ContentStatusWithId
            id={jsonContent.id}
            publishedAt={jsonContent.publishedAt}
            isArchived={!!jsonContent.archivedAt}
            className={"-mt-1 -ml-0.5 mb-2"}
          />
          <CardTitle className="text-xl font-semibold">
            {jsonContent.jsonAtom.title || "Untitled"}
          </CardTitle>
          <CardDescription>
            {jsonContent.jsonAtom.description || "No description"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FlexColumn radius={"md"} className="p-4 bg-muted/50 mb-6">
            <pre className="font-mono text-xs h-36 overflow-hidden text-ellipsis" lang="en">
              {convertToHighlightedJson(jsonContent.jsonAtom.content)}
            </pre>
          </FlexColumn>

          <FlexRow centerY gap={3} className="text-sm w-full h-fit shrink-0 px-1">
            <div className="relative">
              <Image src={jsonContent.author.image || ""} width={34} height={34} alt="avatar" className="rounded-full" />
              {jsonContent.author.id !== jsonContent.lastEditor.id &&
                <Image src={jsonContent.lastEditor.image || ""} width={20} height={20} alt="avatar" className="absolute -right-1 -bottom-0.5 rounded-full ring-background ring-2" />
              }
            </div>
            <FlexColumn gap={0.5}>
              <LabelText size={12} weight={600} className="mt-0.5">
                {t('article.author', { name: jsonContent.author?.nickname || jsonContent.author.name })}
              </LabelText>
              <LastEditor className="@[52rem]:text-xs" nickname={jsonContent.lastEditor?.nickname} name={jsonContent.lastEditor.name} updatedAt={jsonContent.updatedAt} locale={locale} />
            </FlexColumn>
          </FlexRow>
        </CardContent>
      </Link>

      <JsonContentItemActionBar id={jsonContent.id} content={jsonContent.jsonAtom.content} date={jsonContent.publishedAt} isArchived={!!jsonContent.archivedAt} />
    </Card>
  )
}