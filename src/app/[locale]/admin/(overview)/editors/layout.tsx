import { EditorCard } from "@/app/[locale]/admin/(overview)/editors/components/editor-card";
import { Flexbox, FlexRow } from "@/components/ui/flexbox";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/translator";
import { prisma } from "@/prisma";

export default async function EditorsPageLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale }
}>) {
  const { locale } = await params
  const dictionary = await getDictionary(locale);

  const editors = await prisma.user.findMany()

  if (!editors.length) {
    return null
  }

  return (
    <>
      <Flexbox gap={3} className="w-full transition-all duration-300">
        {editors.map((editor) => (
          <EditorCard editor={editor} />
        ))}
      </Flexbox>
      {children}
    </>
  )
}