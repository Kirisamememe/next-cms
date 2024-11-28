import { ReactNode } from "react"
import { GalleryProvider } from "./_components/gallery-provider"
import { DefaultUploader } from "./_components/default-uploader"
import { cookies } from "next/headers"

import { mediaFolderService } from "@/di/services"

type Props = {
  modal: ReactNode
  children: ReactNode
}

export default async function GalleryLayout({ modal, children }: Props) {
  const folders = await mediaFolderService.fetchMany()
  const cookieStore = await cookies()
  const GRID_SIZE = Number(cookieStore.get('GRID_SIZE')?.value || 2)

  return (
    <GalleryProvider folders={folders} GRID_SIZE_SERVER={GRID_SIZE} >
      {children}
      {modal}
      <DefaultUploader />
    </GalleryProvider>
  )
}