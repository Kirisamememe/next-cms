import { FlexColumn, FlexRow } from "@/components/ui/flexbox"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LastEditor } from "./last-editor"
import { Author } from "./author"

type Props = {
  authorImage: string
  lastEditorImage: string
  authorName: string
  lastEditorName: string
  updatedAt: Date
  createdAt: Date
}

export const AuthorAndDatetime = ({ authorImage, lastEditorImage, authorName, lastEditorName, updatedAt, createdAt }: Props) => {
  return (
    <ScrollArea className="h-10 mt-auto">
      <FlexRow centerY gap={3} className="text-sm w-full h-fit shrink-0">
        <div className="relative shrink-0">
          <Avatar className="size-8">
            <AvatarImage src={authorImage} />
            <AvatarFallback>{authorName}</AvatarFallback>
          </Avatar>
          {authorImage !== lastEditorImage &&
            <Avatar className="absolute -right-1 -bottom-0.5 size-5 rounded-full ring-background ring-2">
              <AvatarImage src={lastEditorImage} />
              <AvatarFallback>{lastEditorName}</AvatarFallback>
            </Avatar>
          }
        </div>
        <FlexColumn gap={0.5}>
          <Author createdAt={createdAt} authorName={authorName} />
          <LastEditor name={lastEditorName} updatedAt={updatedAt} />
        </FlexColumn>
      </FlexRow>
      <ScrollBar orientation="horizontal" className="translate-y-1.5 [&>div]:max-h-[2px] [&>div]:bg-foreground/20" />
    </ScrollArea>
  )
}