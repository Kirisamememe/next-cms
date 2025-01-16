import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FlexColumn, FlexRow } from "@/components/ui/flexbox"
import { Heading, LabelText } from "@/components/ui/typography"
import { ContentGroupListItem } from "@/types/schema-content-group"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { cn } from "@/lib"
import { Badge } from "@/components/ui/badge"
import { AuthorAndDatetime } from "../../../_components/content/author-and-datetime"
import { Link } from "@/i18n"

type Props = {
  groupData: ContentGroupListItem
}

export const GroupCard = ({ groupData }: Props) => {

  return (
    <Card className="flex flex-col">
      <Link href={`/admin/content-group/edit/${groupData.id}`} className="hover:bg-muted/50">
        <CardHeader className="h-full">
          <FlexRow className={cn(
            "gap-0.5 [&>div]:bg-muted [&>div]:text-muted-foreground [&>div]:px-1.5 mb-2",
          )}>
            <Badge variant={'secondary'} className="h-fit rounded-l-sm rounded-r-none">
              ID
            </Badge>
            <Badge variant={"custom"}
              className={cn("h-fit rounded-l-none rounded-r-sm")}>
              {groupData.id}
            </Badge>
          </FlexRow>
          <CardTitle className="text-xl">
            {groupData.name}
          </CardTitle>
          <CardDescription className="mb-4">
            {groupData.description}
          </CardDescription>
          <AuthorAndDatetime
            authorImage={groupData.author.image || ""}
            lastEditorImage={groupData.lastEditor?.image || ""}
            authorName={groupData.author.nickname || groupData.author.name || "ANONYMOUS"}
            lastEditorName={groupData.lastEditor?.nickname || groupData.lastEditor?.name || "ANONYMOUS"}
            updatedAt={groupData.updatedAt}
            createdAt={groupData.createdAt}
          />
        </CardHeader>
      </Link>
      <ScrollArea className="shrink-0">
        <CardContent className="flex gap-3 px-5 py-4 border-t">
          <ContentCount count={groupData.articles.length} title="記事" />
          <ContentCount count={groupData.jsonContents.length} title="JSON" />
          <ContentCount count={groupData.mediaFolders.length} title="フォルダー" />
        </CardContent>
        <ScrollBar orientation="horizontal" className="mx-6" />
      </ScrollArea>
    </Card>
  )
}

type ContentCountProps = {
  count: number
  title: string
}

const ContentCount = ({ count, title }: ContentCountProps) => {
  return (
    <FlexColumn center border radius={"md"} p={2} gap={1} className="bg-muted/50 w-24">
      <Heading size={24}>
        {count}
      </Heading>
      <LabelText size={12}>
        {title}
      </LabelText>
    </FlexColumn>
  )
}