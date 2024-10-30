import { Flexbox } from "@/components/ui/flexbox";
import Link from "next/link";


export default async function NewEditorPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      {children}
      <Link href={"/admin/editors"}>
        <Flexbox className="faceIn fixed top-0 left-0 w-dvw h-dvh bg-background/80 z-50" />
      </Link>
    </>
  )
}