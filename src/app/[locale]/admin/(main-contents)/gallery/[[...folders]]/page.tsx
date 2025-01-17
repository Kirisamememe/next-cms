import { FlexColumn } from "@/components/ui/flexbox";
import { GalleryGrid } from "../_components/gallery-grid";
import { GalleryToolbar } from "../_components/toolbar";
import { NewContentBtnContainer } from "../../../_components/content/new-content-button-container";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ folders?: string[] }>
}


export default async function Page({ params }: Props) {
  const { folders } = await params
  const currentPath = folders ? `./${folders.join('/')}` : '.'

  const t = await getTranslations()

  return (
    <>
      <NewContentBtnContainer href={'/admin/gallery/new'} label={t('gallery.imageUrl.btn')} />
      <GalleryToolbar />
      <FlexColumn px={6}>
        <GalleryGrid currentPath={currentPath} />
      </FlexColumn>
    </>
  )
}