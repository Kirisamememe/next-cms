import { ImagePreview } from "../../_components/image-preview";

type Props = {
  params: Promise<{ id: string }>
}


export default async function PreviewPage({ params }: Props) {
  const { id } = await params

  return (
    <ImagePreview id={Number(id)} />
  )
}