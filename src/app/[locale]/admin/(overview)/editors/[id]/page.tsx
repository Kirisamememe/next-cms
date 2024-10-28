import { EditEditorProfile } from "@/app/[locale]/admin/(overview)/editors/components/edit-editor-profile";
import { Flexbox } from "@/components/ui/flexbox";
import { prisma } from "@/prisma";
import { editorProfileSchema, Role } from "@/types/editor-schema";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function EditorProfilePage({ params }: Props) {
  const { id } = await params
  const editor = await prisma.user.findUnique({
    where: {
      id: Number(id)
    }
  })

  if (!editor?.id) {
    return null
  }

  const action = async (formData: FormData) => {
    'use server'
    const parse = editorProfileSchema.safeParse({ 
      nickname: formData.get('nickname'),
      role: formData.get('role')
    })

    if (parse.error) {
      const errorMsg = parse.error.format().nickname?._errors
      redirect(`/admin/editors/${id}?formError=${errorMsg}`,)
    }

    const res = await prisma.user.update({
      where: {
        id: Number(id)
      },
      data: {
        nickname: formData.get('nickname') as string,
        role: formData.get('role') as Role
      }
    })

    if (!res.id) {
      redirect(`/admin/editors/${id}?formError=failed`,)
    }

    redirect(`/admin/editors?message=success`)
  }

  return (
    <Flexbox border p={4} radius={"lg"} className="popover w-96 shrink-0 bg-background">
      <form action={action} className="flex flex-col gap-3">
        <EditEditorProfile editor={editor} />
      </form>
    </Flexbox>
  )
}