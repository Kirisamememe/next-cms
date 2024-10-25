import { Flexbox } from "@/components/ui/flexbox";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/lib/translator";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default async function EditorProfileLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale }
}>) {
  // const { locale } = await params
  // const dictionary = await getDictionary(locale);


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