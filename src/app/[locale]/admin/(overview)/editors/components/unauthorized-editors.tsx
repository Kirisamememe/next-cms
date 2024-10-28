import { Button } from "@/components/ui/button";
import { Flexbox, FlexRow } from "@/components/ui/flexbox";
import { Heading } from "@/components/ui/typography";
import { Link } from "@/i18n/routing";
import { prisma } from "@/prisma";
import { getTranslations } from "next-intl/server";

export async function UnauthorizedEditorList() {
  const t = await getTranslations('editor')
  const unauthorizedEditors = await prisma.allowedEmail.findMany({
    where: {
      user_id: null
    }
  })

  return (
    <Flexbox gap={3} className="appear w-full transition-all duration-300">
      <Heading>
        {t('unauthorized')}
      </Heading>
      {unauthorizedEditors.map((editor, index) => (
        <FlexRow key={index} border radius={"lg"} p={4}>
          {editor.email}
        </FlexRow>
      ))}
      <Button
        asChild
        variant={"outline"}
        className="h-12"
      >
        <Link href={"/admin/editors/new"}>{t('newEditor')}</Link>
      </Button>
    </Flexbox>
  )
}