import { imageUrlService } from "@/di/services"
import { AsyncImage } from "./image-async"

type Props = {
  id: number
}

export async function ImagePreview({ id }: Props) {
  const data = await imageUrlService.getById(id)
  if (!data) {
    return null
  }

  return (
    <AsyncImage url={data.url} />
  )
}