import { ImagePreview } from "../../../_components/image-preview"
import { ImagePreviewModal } from "../../../_components/image-preview-modal"

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const { id } = await params

  return (
    <ImagePreviewModal>
      <ImagePreview id={Number(id)} />
    </ImagePreviewModal >
  )
}