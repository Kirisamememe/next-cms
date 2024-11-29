import { GalleryItem } from "./gallery-grid-image"
import { NewFolder } from "./folder/new-folder"
import { FolderItem } from "./gallery-grid-folder"
import { GalleryGridWrapper } from "./gallery-grid-wrapper"
import { ImageUploading } from "./gallery-grid-uploading-images"
import { ParentFolderItem } from "./gallery-grid-parent-folder"

import { imageUrlService, mediaFolderService } from "@/di/services"

type Props = {
  currentPath?: string
}

// TODO imageUrlsが空の場合の画面

export async function GalleryGrid({ currentPath = '.' }: Props) {
  const decodedPath = currentPath ? decodeURIComponent(currentPath) : currentPath
  const parentPath = decodedPath && decodedPath.split('/').slice(0, -1)?.join('/')

  const imageUrls = await imageUrlService.fetchByFolder(decodedPath)
  const folders = await mediaFolderService.getCurrentPathFolders(decodedPath)

  return (
    <GalleryGridWrapper>

      {decodedPath !== '.' && (
        <ParentFolderItem href={`/admin/gallery${parentPath === '.' ? '' : `/${parentPath}`}`} name={'../'} path={parentPath || ''} />
      )}

      <NewFolder />

      {folders.map((folder) => (
        <FolderItem key={folder.path} href={`/admin/gallery/${folder.path}`} name={folder.name} path={folder.path} />
      ))}

      <ImageUploading />

      {imageUrls?.length && imageUrls.map((imageUrl) => (
        <GalleryItem key={`${imageUrl.id}_${imageUrl.url}`} imageUrl={imageUrl} />
      ))}

      <div className="tl-radius" />
      <div className="tr-radius" />
      <div className="bl-radius" />
      <div className="br-radius" />
    </GalleryGridWrapper>
  )
}