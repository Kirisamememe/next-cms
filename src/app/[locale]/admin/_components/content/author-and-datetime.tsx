import { FlexColumn, FlexRow } from "@/components/ui/flexbox"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { LabelText } from "@/components/ui/typography"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LastEditor } from "./last-editor"
import { Separator } from "@/components/ui/separator"
import { CreatedAt } from "./created-at"
import { useTranslations } from "next-intl"

type Props = {
  authorImage: string
  lastEditorImage: string
  authorName: string
  lastEditorName: string
  updatedAt: Date
  createdAt: Date
}

export const AuthorAndDatetime = ({ authorImage, lastEditorImage, authorName, lastEditorName, updatedAt, createdAt }: Props) => {
  const t = useTranslations()

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
          <LabelText size={12} weight={600} className="mt-0.5">
            {t('article.author', { name: authorName })}
          </LabelText>
          <FlexRow centerY>
            <LastEditor name={lastEditorName} updatedAt={updatedAt} />
            <Separator orientation="vertical" className="h-3 mx-3" />
            <CreatedAt createdAt={createdAt} />
          </FlexRow>
        </FlexColumn>
      </FlexRow>
      <ScrollBar orientation="horizontal" className="translate-y-1.5 [&>div]:max-h-[2px] [&>div]:bg-foreground/20" />
    </ScrollArea>
  )
}