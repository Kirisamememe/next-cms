import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"

type Props = {
  url: string
}

export function GalleryImageItem({ url }: Props) {
  return (
    <AspectRatio ratio={1}>
      <Image
        src={url}
        quality={20} draggable={false}
        width={1000} height={1000} alt="image" loading='lazy'
        className="pointer-events-none object-cover object-center w-full h-full transition-transform duration-300" />
    </AspectRatio>
  )
}