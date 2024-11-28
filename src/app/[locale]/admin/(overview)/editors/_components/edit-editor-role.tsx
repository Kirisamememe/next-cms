import { Flexbox } from "@/components/ui/flexbox"
import { EditorConcise, editRoleFormSchema, Role } from "@/types"
import { redirect } from "next/navigation"
import { EditEditorRoleForm } from "./edit-editor-role-form"
import { userService } from "@/di/services"

type Props = {
  editor: EditorConcise,
  operatorRole: Role
}

export async function EditEditorRole({ editor, operatorRole }: Props) {

  const action = async (formData: FormData) => {
    'use server'
    const parse = await editRoleFormSchema.safeParseAsync({
      role: formData.get('role')
    })

    if (parse.error) {
      const errorMsg = parse.error.format().role?._errors
      redirect(`/admin/editors/${editor.id}?formError=${errorMsg}`,)
    }

    const res = await userService.update(editor.email, {
      role: parse.data.role
    })

    if (!res.id) {
      redirect(`/admin/editors/${editor.id}?formError=failed`,)
    }

    redirect(`/admin/editors?message=success`)
  }


  return (
    <Flexbox border p={4} radius={"lg"} className="popover w-96 shrink-0 bg-background">
      <EditEditorRoleForm
        email={editor.email}
        targetRole={editor.role}
        image={editor.image}
        name={editor.name}
        nickname={editor.nickname}
        operatorRole={operatorRole}
        action={action}
      />
    </Flexbox>
  )
}