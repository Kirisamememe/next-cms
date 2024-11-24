import { Flexbox } from "@/components/ui/flexbox";
import { GalleryGrid } from "../_components/gallery-grid";
import { GalleryToolbar } from "../_components/toolbar";

type Props = {
  params: Promise<{ folders?: string[] }>
}


export default async function Page({ params }: Props) {
  const { folders } = await params
  const currentPath = folders ? folders.join('/') : null

  return (
    <Flexbox gap={6} className="appear h-full">
      <GalleryToolbar />
      <GalleryGrid currentPath={currentPath} />
    </Flexbox>
  )
}