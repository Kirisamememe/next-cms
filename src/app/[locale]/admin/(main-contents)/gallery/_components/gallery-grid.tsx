import { GalleryItem } from "./gallery-item"
import { imageUrlService } from "@/services/image-url-service"
import { mediaFolderService } from "@/services/media-folder-service"
import { NewFolder } from "./folder/new-folder"
import { FolderItem } from "./folder-item"
import { GalleryGridWrapper } from "./gallery-grid-wrapper"

type Props = {
  currentPath?: string
}


export async function GalleryGrid({ currentPath = '.' }: Props) {
  const decodedPath = currentPath ? decodeURIComponent(currentPath) : currentPath
  const parentPath = decodedPath && decodedPath.split('/').slice(0, -1)?.join('/')

  const imageUrls = await imageUrlService.fetchByFolder(decodedPath)
  const folders = await mediaFolderService.getCurrentPathFolders(decodedPath)

  return (
    <GalleryGridWrapper>
      <NewFolder />

      {decodedPath !== '.' && (
        <FolderItem href={`/admin/gallery${parentPath === '.' ? '' : `/${parentPath}`}`} name={'../'} path={parentPath || ''} isParent />
      )}

      {folders.map((folder) => (
        <FolderItem key={folder.path} href={`/admin/gallery/${folder.path}`} name={folder.name} path={folder.path} />
      ))}

      {imageUrls.map((imageUrl) => (
        <GalleryItem key={`${imageUrl.id}_${imageUrl.url}`} imageUrl={imageUrl} />
      ))}

      <div className="tl-radius" />
      <div className="tr-radius" />
      <div className="bl-radius" />
      <div className="br-radius" />
    </GalleryGridWrapper>
  )
}