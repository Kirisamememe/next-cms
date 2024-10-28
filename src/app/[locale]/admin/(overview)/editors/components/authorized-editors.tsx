import { Flexbox } from "@/components/ui/flexbox";
import { Heading } from "@/components/ui/typography";
import { prisma } from "@/prisma";
import { EditorCard } from "./editor-card";
import { getTranslations } from "next-intl/server";

export async function AuthorizedEditorList() {
  const t = await getTranslations('editor')
  const editors = await prisma.user.findMany()

  return (
    <Flexbox gap={3} className="appear w-full transition-all duration-300">
      <Heading>
        {t('authorized')}
      </Heading>
      {editors.map((editor, index) => (
        <EditorCard key={index} editor={editor} />
      ))}
    </Flexbox>
  )
}