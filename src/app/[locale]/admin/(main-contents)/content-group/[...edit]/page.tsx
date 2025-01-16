import { imageUrlService, mediaFolderService } from "@/di/services"
import { GroupForm } from "./_components/group-form"

export default async function Page() {
  const folders = mediaFolderService.fetchMany()
  const images = imageUrlService.getSimpleList()

  return (
    <GroupForm folders={folders} images={images} />
  )
}