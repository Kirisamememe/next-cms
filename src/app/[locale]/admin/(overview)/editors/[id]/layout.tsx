import { Flexbox } from "@/components/ui/flexbox";
import { Link } from "@/i18n";

export default async function EditorProfilePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Flexbox center className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-[70%] z-[100]">
        {children}
      </Flexbox>
      <Link href={"/admin/editors"}>
        <Flexbox className="faceIn fixed top-0 left-0 w-dvw h-dvh bg-background/80 z-50" />
      </Link>
    </>
  )
}