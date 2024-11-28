

import { imageUrlService } from "@/services/image-url-service"
import Image from "next/image"

type Props = {
  id: number
}

export async function ImagePreview({ id }: Props) {
  const { data, noData } = await imageUrlService.fetchById(id)
  if (noData) {
    return null
  }

  return (
    <Image
      src={data.url}
      width={1280} height={1280} alt="image"
      className="object-contain object-center w-fit h-fit max-w-screen max-h-screen z-[500]"
    />
  )
}