import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { prisma } from "@/prisma"
import { roles, Role } from "@/types/editor-schema"
import { ComponentProps } from "react"
import { EditorCard } from "./editor-card"
import { FlexRow } from "@/components/ui/flexbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { redirect } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Submit } from "@/components/ui/submit-button"
import { useTranslations } from "next-intl"

type Props = Pick<ComponentProps<typeof EditorCard>, "editor"> & {
  id: number
}

export function EditEditorProfile({ id, editor }: Props) {
  const t = useTranslations('editor')

  return (
    <form action={async (formData) => {
      'use server'


      const res = await prisma.user.update({
        where: {
          id: id
        },
        data: {
          nickname: formData.get('nickname') as string,
          role: formData.get('role') as Role
        }
      })

      if (!res.id) {
        redirect(`/admin/editors/${id}?error=failed`,)
      }

      redirect(`/admin/editors?message=success`)
    }} className="flex flex-col gap-3">
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
          {t('profile.nickname')}
        </span>
        <Input name="nickname" placeholder={t('profile.nicknamePlaceholder')} />
      </label>

      <label className="flex flex-col gap-2 text-sm">
        <span className="ml-1 font-semibold">
          {t('profile.role')}
        </span>
        <Select name="role" defaultValue={editor.role}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent className="w-full z-[1000]">
            {roles.map((role) => (
              <SelectItem key={role} value={role}>{t(`${role}`)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
      <Submit className="mt-4">
        Submit
      </Submit>
    </form>
  )
}
