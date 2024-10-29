import { Flexbox } from "@/components/ui/flexbox";
import { Heading } from "@/components/ui/typography";
import { prisma } from "@/prisma";
import { EditorCard } from "./editor-card";
import { getTranslations } from "next-intl/server";
import { GridColumn } from "@/components/ui/grid";
import { Role } from "@/types/editor-schema";
import { isAdminGroup, isPermissible, isSuperAdmin } from "@/lib/roleUtils";
import { EditorCardWithLink } from "./editor-card-link";

type Props = {
  operatorRole: Role
  operatorId: number
}

export async function AuthenticateEditorList({ operatorRole, operatorId }: Props) {
  const t = await getTranslations('editor')
  const editors = await prisma.user.findMany({
    orderBy: {
      id: 'asc'
    }
  })


  return (
    <Flexbox gap={3} className="appear w-full transition-all duration-300">
      <Heading>
        {t('authenticate')}
      </Heading>
      <GridColumn lg={2} xl={3} >
        {editors.map((editor, index) => {
          const targetRole = editor.role
          const targetId = editor.id

          if (isSuperAdmin(operatorRole) || targetId === operatorId ||
            (isAdminGroup(operatorRole) && isPermissible({ targetRole: targetRole, operatorRole: operatorRole }))) {
            return <EditorCardWithLink key={index} editor={editor} />
          }

          return <EditorCard key={index} editor={editor} />
        })}
      </GridColumn>
    </Flexbox>
  )
}