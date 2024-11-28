import { Flexbox } from "@/components/ui/flexbox";
import { Heading } from "@/components/ui/typography";
import { isAdminGroup, isPermissible, isSuperAdmin } from "@/lib-server-only";
import { EditorCard } from "./editor-card";
import { getTranslations } from "next-intl/server";
import { GridColumn } from "@/components/ui/grid";
import { Role } from "@/types";
import { EditorCardWithLink } from "./editor-card-link";
import { userService } from "@/di/services";

type Props = {
  operatorRole: Role
  operatorId: number
}

export async function AuthenticateEditorList({ operatorRole, operatorId }: Props) {
  const t = await getTranslations('editor')
  const editors = await userService.getMany('asc')


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