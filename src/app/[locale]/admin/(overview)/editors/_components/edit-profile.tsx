import { Flexbox } from "@/components/ui/flexbox"
import { editProfileFormSchema, EditorConcise } from "@/types"
import { redirect } from "next/navigation"
import { EditProfileForm } from "./edit-profile-form"
import { userService } from "@/di/services"

type Props = {
  editor: EditorConcise,
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

    const res = await userService.update(editor.email, {
      nickname: parse.data.nickname,
      image: parse.data.image
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