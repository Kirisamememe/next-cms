import { Flexbox } from "@/components/ui/flexbox"
import { prisma } from "@/lib/prisma"
import { editProfileFormSchema, Editor } from "@/types/editor-schema"
import { redirect } from "next/navigation"
import { EditProfileForm } from "./edit-profile-form"

type Props = {
  editor: Editor,
}

export async function EditProfile({ editor }: Props) {

  const action = async (formData: FormData) => {
    'use server'
    const parse = await editProfileFormSchema.safeParseAsync({
      nickname: formData.get('nickname'),
      image: formData.get('image')
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
        image: parse.data.image
      }
    })

    if (!res.id) {
      redirect(`/admin/editors/${editor.id}?formError=failed`,)
    }

    redirect(`/admin/editors?message=success`)
  }

  return (
    <Flexbox border p={4} radius={"lg"} className="popover w-96 shrink-0 bg-background">
      <EditProfileForm email={editor.email} image={editor.image} name={editor.name} nickname={editor.nickname} action={action} />
    </Flexbox>
  )
}