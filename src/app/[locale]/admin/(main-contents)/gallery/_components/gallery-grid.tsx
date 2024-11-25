import { GridColumn } from "@/components/ui/grid"
import { GalleryItem } from "./gallery-item"
import { imageUrlService } from "@/services/image-url-service"
import { mediaFolderService } from "@/services/media-folder-service"
import { NewFolder } from "./folder/new-folder"
import { FolderItem } from "./folder-item"

type Props = {
  currentPath?: string
}

export async function GalleryGrid({ currentPath = '.' }: Props) {
  const decodedPath = currentPath ? decodeURIComponent(currentPath) : currentPath
  const parentPath = decodedPath && decodedPath.split('/').slice(0, -1)?.join('/')
  const resources = await imageUrlService.fetchByFolder(decodedPath)

  const folders = await mediaFolderService.getCurrentPathFolders(decodedPath)

  const currentResources = resources.filter(resource => {
    if (resource.folderPath === decodedPath) return true
  })

  return (
    <GridColumn
      gap={0.5}
      className="gap-y-0.5 grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] relative transition-transform"
    >
      <NewFolder />

      {decodedPath !== '.' && (
        <FolderItem href={`/admin/gallery${parentPath === '.' ? '' : `/${parentPath}`}`} name={'../'} path={parentPath || ''} isParent />
      )}

      {folders.map((folder) => (
        <FolderItem key={folder.path} href={`/admin/gallery/${folder.path}`} name={folder.name} path={folder.path} />
      ))}

      {currentResources.map((imageUrl) => (
        <GalleryItem key={`${imageUrl.id}_${imageUrl.url}`} imageUrl={imageUrl} />
      ))}

      <div className="tl-radius" />
      <div className="tr-radius" />
      <div className="bl-radius" />
      <div className="br-radius" />
    </GridColumn>
  )
}