import { Flexbox } from "@/components/ui/flexbox";
import { prisma } from "@/prisma";
import { newEditorSchema } from "@/types/editor-schema";
import { redirect } from "next/navigation";
import { NewEditorForm } from "./new-editor-form";

export async function NewEditor() {

  const action = async (formData: FormData) => {
    'use server'

    const parse = newEditorSchema.safeParse({ email: formData.get('email') })
    if (parse.error) {
      const errorMsg = parse.error.format().email?._errors
      redirect(`/admin/editors/new?formError=${errorMsg}`,)
    }

    const res = await prisma.allowedEmail.create({
      data: {
        email: parse.data.email
      }
    })

    if (!res.id) {
      redirect(`/admin/editors/new?formError=failed`,)
    }

    redirect(`/admin/editors?message=success`)
  }

  return (
    <Flexbox border p={4} radius={"lg"} className="popover w-96 shrink-0 gap-6 bg-background">
      <NewEditorForm action={action} />
    </Flexbox>
  )
}