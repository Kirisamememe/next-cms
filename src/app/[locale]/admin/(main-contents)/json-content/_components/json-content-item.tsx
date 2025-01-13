import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FlexColumn } from "@/components/ui/flexbox";
import { convertToHighlightedJson } from "../_hooks/json-convert";
import { JsonContentForClient } from "@/types";
import { ContentStatusWithId } from "../../../_components/content/content-status-with-id";
import { JsonContentItemActionBar } from "./json-content-item-action-bar";
import { Link } from "@/i18n";
import { AuthorAndDatetime } from "../../../_components/content/author-and-datetime";

type Props = {
  jsonContent: JsonContentForClient
}

export const JsonContentItem = ({ jsonContent }: Props) => {

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

          <AuthorAndDatetime
            authorImage={jsonContent.author.image || ""}
            lastEditorImage={jsonContent.lastEditor.image || ""}
            authorName={jsonContent.author.nickname || jsonContent.author.name || ""}
            lastEditorName={jsonContent.lastEditor.nickname || jsonContent.lastEditor.name || ""}
            updatedAt={jsonContent.updatedAt}
            createdAt={jsonContent.createdAt}
          />
        </CardContent>
      </Link>

      <JsonContentItemActionBar id={jsonContent.id} content={jsonContent.jsonAtom.content} date={jsonContent.publishedAt} isArchived={!!jsonContent.archivedAt} />
    </Card>
  )
}