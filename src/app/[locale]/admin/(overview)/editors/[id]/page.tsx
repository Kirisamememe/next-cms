import { EditEditorProfile } from "@/app/[locale]/admin/(overview)/editors/components/edit-editor-profile";
import { Flexbox } from "@/components/ui/flexbox";
import { prisma } from "@/prisma";

type Props = {
  params: {
    id: string
  }
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

  return (
    <Flexbox border p={4} radius={"lg"} className="popover w-96 shrink-0">
      <EditEditorProfile id={Number(id)} editor={editor} />
    </Flexbox>
  )
}