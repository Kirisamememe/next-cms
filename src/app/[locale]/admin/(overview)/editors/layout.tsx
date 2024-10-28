import { EditorCard } from "@/app/[locale]/admin/(overview)/editors/components/editor-card";
import { Flexbox } from "@/components/ui/flexbox";
import { prisma } from "@/prisma";
import { ResultToaster } from "@/components/result-toaster";

export default async function EditorsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const editors = await prisma.user.findMany()

  if (!editors.length) {
    return null
  }

  return (
    <>
      <Flexbox gap={3} className="appear w-full transition-all duration-300">
        {editors.map((editor, index) => (
          <EditorCard key={index} editor={editor} />
        ))}
      </Flexbox>
      {children}
      <ResultToaster />
    </>
  )
}