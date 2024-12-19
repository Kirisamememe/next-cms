import { NotFoundIllustration } from "@/components/404"
import { Flexbox } from "@/components/ui/flexbox"
import { Heading } from "@/components/ui/typography"
import { ImagePickerGrid } from "./image-picker-grid"
import { ScrollArea } from "@/components/ui/scroll-area"
import { NewImagePickerSelectAll } from "./image-picker-select-all"
import { NewImageUpload } from "./image-upload"
import { Cloudinary } from "@/lib-server-only"
import { imageUrlService } from "@/di/services"

export const ImagePickerCloudinary = async () => {
  const { data } = await Cloudinary.getInstance().fetchAll()
  const savedUrls = await imageUrlService.getMany()

  if (!data) {
    return (
      <Flexbox center className="m-auto h-full">
        <NotFoundIllustration className="size-48" />
        <Heading size={20}>
          Not Found
        </Heading>
        <p className="text-sm">Could not find requested resource</p>
      </Flexbox>
    )
  }

  const filteredUrls = data.resources.filter((url) => {
    return !savedUrls.includes(url.secure_url)
  }).map((url) => url.secure_url)

  return (
    <>
      <ScrollArea className="w-full h-full rounded-lg">
        <div className="overflow-hidden rounded-lg mt-[3.25rem] mb-24">
          <ImagePickerGrid urls={filteredUrls} />
        </div>
      </ScrollArea>
      <NewImagePickerSelectAll urls={filteredUrls} />
      <NewImageUpload />
    </>
  )
}