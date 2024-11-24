import { ReactNode } from "react"
import { GalleryProvider } from "./_components/gallery-provider"
import { DefaultUploader } from "./_components/default-uploader"
import { mediaFolderService } from "@/services/media-folder-service"

type Props = {
  modal: ReactNode
  children: ReactNode
}

export default async function GalleryLayout({ modal, children }: Props) {
  const folders = await mediaFolderService.fetchMany()

  return (
    <GalleryProvider folders={folders}>
      {children}
      {modal}
      <DefaultUploader />
    </GalleryProvider>
  )
}