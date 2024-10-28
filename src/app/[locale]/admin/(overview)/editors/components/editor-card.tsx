import { Editor } from "@/types/editor-schema"
import { FlexRow } from "@/components/ui/flexbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { LabelText } from "@/components/ui/typography"
import { useTranslations } from "next-intl"

type Props = {
  editor: Editor
}

export function EditorCard({ editor }: Props) {
  const t = useTranslations();

  return (
    <Link href={`/admin/editors/${editor.id.toString()}`}>
      <FlexRow border p={4} gap={2} radius={"md"} className="items-center transition-transform hover:bg-muted/50 active:scale-95">
        <Avatar className="size-9 group-data-[collapsible=icon]:size-8">
          {editor.image &&
            <AvatarImage src={editor.image} />}
          <AvatarFallback>{editor.name || "USER"}</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">
            {editor.nickname || editor.name}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {editor.email}
          </span>
        </div>
        <LabelText color="foreground" weight={600} className="ml-auto">
          {t(`editor.${editor.role}`)}
        </LabelText>
      </FlexRow>
    </Link>
  )
}