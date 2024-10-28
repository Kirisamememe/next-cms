import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { roles } from "@/types/editor-schema"
import { ComponentProps } from "react"
import { EditorCard } from "./editor-card"
import { FlexRow } from "@/components/ui/flexbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Submit } from "@/components/ui/submit-button"
import { useTranslations } from "next-intl"

type Props = Pick<ComponentProps<typeof EditorCard>, "editor">

export function EditEditorProfile({ editor }: Props) {
  const t = useTranslations()

  return (
    <>
      <FlexRow px={1} py={2} gap={2} radius={"md"}>
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
      </FlexRow>

      <Separator />

      <label className="flex flex-col gap-2 text-sm">
        <span className="ml-1 font-semibold">
          {t('editor.profile.nickname')}
        </span>
        <Input name="nickname" placeholder={t('editor.profile.nicknamePlaceholder')} />
      </label>

      <label className="flex flex-col gap-2 text-sm">
        <span className="ml-1 font-semibold">
          {t('editor.profile.role')}
        </span>
        <Select name="role" defaultValue={editor.role}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent className="w-full z-[1000]">
            {roles.map((role) => (
              <SelectItem key={role} value={role}>{t(`editor.${role}`)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
      <Submit className="mt-4">
        {t("common.submit")}
      </Submit>
    </>
  )
}
