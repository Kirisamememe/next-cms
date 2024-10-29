import { Flexbox } from "@/components/ui/flexbox";
import { Heading } from "@/components/ui/typography";
import { prisma } from "@/prisma";
import { EditorCard } from "./editor-card";
import { getTranslations } from "next-intl/server";
import { GridColumn } from "@/components/ui/grid";
import { Link } from "@/i18n/routing";
import { Role } from "@/types/editor-schema";
import { isAdminGroup, isPermissible, isSuperAdmin } from "@/lib/roleUtils";

type Props = {
  operatorRole: Role
  operatorId: number
}

export async function AuthorizedEditorList({ operatorRole, operatorId }: Props) {
  const t = await getTranslations('editor')
  const editors = await prisma.user.findMany({
    orderBy: {
      id: 'asc'
    }
  })
  

  return (
    <Flexbox gap={3} className="appear w-full transition-all duration-300">
      <Heading>
        {t('authorized')}
      </Heading>
      <GridColumn lg={2} xl={3} >
        {editors.map((editor, index) => {
          const targetRole = editor.role
          const targetId = editor.id

          if (isSuperAdmin(operatorRole) || targetId === operatorId || 
            (isAdminGroup(operatorRole) && isPermissible({ targetRole: targetRole, operatorRole: operatorRole }))) {
            return (
              <Link
                key={index}
                href={`/admin/editors/${editor.id.toString()}`}
                className="transition-transform hover:bg-muted/50 active:scale-95"
              >
                <EditorCard editor={editor} />
              </Link>
            )
          }

          return <EditorCard key={index} editor={editor} />
        })}
      </GridColumn>
    </Flexbox>
  )
}