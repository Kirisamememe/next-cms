import { FlexColumn } from "@/components/ui/flexbox";
import { GalleryGrid } from "../_components/gallery-grid";
import { GalleryToolbar } from "../_components/toolbar";

type Props = {
  params: Promise<{ folders?: string[] }>
}


export default async function Page({ params }: Props) {
  const { folders } = await params
  const currentPath = folders ? `./${folders.join('/')}` : '.'

  return (
    <>
      <GalleryToolbar />
      <FlexColumn px={6}>
        <GalleryGrid currentPath={currentPath} />
      </FlexColumn>
    </>
  )
}