import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { editorProfileSchema } from "@/types/user-schema"
import { LabelText } from "@/components/ui/typography"
import { prisma } from "@/prisma"
import { revalidatePath } from "next/cache"
import { Editor, Role } from "@/types/editor"
import { ComponentProps } from "react"
import { EditorCard } from "./editor-card"
import { FlexRow } from "@/components/ui/flexbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { redirect } from "next/navigation"
import { Separator } from "@/components/ui/separator"

type Props = Pick<ComponentProps<typeof EditorCard>, "editor"> & {
  id: number
}

export function EditEditorProfile({ id, editor }: Props) {

  return (
    <form action={async (formData) => {
      'use server'
      await prisma.user.update({
        where: {
          id: id
        },
        data: {
          nickname: formData.get('nickname') as string,
          role: formData.get('role') as Role
        }
      }).then((res) => {
        revalidatePath('/admin/editors')
        redirect('/admin/editors')
      })

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
          Nickname
        </span>
        <Input name="nickname" placeholder="Input you nickname" />
      </label>

      <label className="flex flex-col gap-2 text-sm">
        <span className="ml-1 font-semibold">
          Role
        </span>
        <Select name="role" defaultValue={editor.role}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent className="w-full z-[1000]">
            <SelectItem value="ADMIN">Admin</SelectItem>
            <SelectItem value="USER">Normal user</SelectItem>
            <SelectItem value="BLOCKED">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </label>

      <Button type="submit" className="mt-4">Submit</Button>
    </form>
  )
}
