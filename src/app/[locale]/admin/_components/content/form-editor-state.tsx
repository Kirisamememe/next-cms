import { FlexColumn, FlexRow } from "@/components/ui/flexbox"
import { LabelText } from "@/components/ui/typography"
import { LastEditor } from "./last-editor"
import { useTranslations } from "next-intl"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
  authorName: string
  editorName: string
  updatedAt: Date
  sameEditor: boolean
  authorImage: string
  editorImage: string
}

export const FormAuthorState = ({ authorName, editorName, updatedAt, sameEditor, authorImage, editorImage }: Props) => {
  const t = useTranslations()

  return (
    <FlexRow centerY gap={3} className="text-sm w-full h-fit shrink-0 px-4 py-4 border-b bg-card">
      <div className="relative">
        <Avatar>
          <AvatarImage src={authorImage} />
          <AvatarFallback>{authorName}</AvatarFallback>
        </Avatar>
        {!sameEditor &&
          <Avatar className="absolute -right-1 -bottom-1 rounded-full ring-background ring-2 size-5">
            <AvatarImage src={editorImage} />
            <AvatarFallback>{editorName}</AvatarFallback>
          </Avatar>
        }
      </div>
      <FlexColumn gap={0.5}>
        <LabelText size={14} weight={500}>
          {t('article.author', { name: authorName })}
        </LabelText>
        <LastEditor className="@[52rem]:text-xs" name={editorName} updatedAt={updatedAt} />
      </FlexColumn>
    </FlexRow>
  )
}
