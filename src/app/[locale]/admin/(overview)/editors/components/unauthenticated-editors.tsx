import { Button } from "@/components/ui/button";
import { Flexbox, FlexRow } from "@/components/ui/flexbox";
import { GridColumn } from "@/components/ui/grid";
import { Heading } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { prisma } from "@/prisma";
import { adminRole, Role } from "@/types/editor-schema";
import { getTranslations } from "next-intl/server";

type Props = {
  operatorRole: Role
}

export async function UnauthenticatedEditorList({ operatorRole }: Props) {
  const isAdminRole = adminRole.includes(operatorRole)

  const t = await getTranslations('editor')
  const unauthorizedEditors = await prisma.allowedEmail.findMany({
    where: {
      user_id: null
    }
  })

  return (
    <Flexbox gap={3} className="appear w-full transition-all duration-300">
      <Heading>
        {t('unauthenticated')}
      </Heading>
      <GridColumn lg={2} xl={3}>
        {isAdminRole &&
          <Button
            asChild
            variant={"outline"}
            className="min-h-12 h-full"
          >
            <Link href={"/admin/editors/new"}>{t('newEditor')}</Link>
          </Button>}

        {unauthorizedEditors.map((editor, index) => (
          <FlexRow key={index} border radius={"lg"} p={4} bg shadow>
            {editor.email}
          </FlexRow>
        ))}
      </GridColumn>
    </Flexbox>
  )
}