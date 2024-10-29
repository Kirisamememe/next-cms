import { Flexbox } from "@/components/ui/flexbox"
import { prisma } from "@/prisma"
import { editNicknameFormSchema, Editor } from "@/types/editor-schema"
import { redirect } from "next/navigation"
import { EditNicknameForm } from "./edit-nickname-form"

type Props = {
  editor: Editor,
}

export async function EditNickName({ editor }: Props) {

  const action = async (formData: FormData) => {
    'use server'
    const parse = editNicknameFormSchema.safeParse({
      nickname: formData.get('nickname'),
    })

    if (parse.error) {
      const errorMsg = parse.error.format().nickname?._errors
      redirect(`/admin/editors/${editor.id}?formError=${errorMsg}`,)
    }

    const res = await prisma.user.update({
      where: {
        id: editor.id
      },
      data: {
        nickname: parse.data.nickname,
      }
    })

    if (!res.id) {
      redirect(`/admin/editors/${editor.id}?formError=failed`,)
    }

    redirect(`/admin/editors?message=success`)
  }

  return (
    <Flexbox border p={4} radius={"lg"} className="popover w-96 shrink-0 bg-background">
      <EditNicknameForm email={editor.email} image={editor.image} name={editor.name} nickname={editor.nickname} action={action} />
    </Flexbox>
  )
}