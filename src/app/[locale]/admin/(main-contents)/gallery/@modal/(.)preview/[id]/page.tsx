import { ImagePreviewModal } from "../../../_components/image-preview-modal"
import PreviewPage from "../../../preview/[id]/page"

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  return (
    <ImagePreviewModal>
      <PreviewPage params={params} />
    </ImagePreviewModal >
  )
}