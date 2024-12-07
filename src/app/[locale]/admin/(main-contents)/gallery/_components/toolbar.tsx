import { FlexRow } from "@/components/ui/flexbox";
import { NewImageDialog } from "./image/new-image-dialog";
import { NewFolderBtn } from "./folder/new-folder-btn";
import { GalleryGridSettingBtn } from "./gallery-grid-setting-btn";

export function GalleryToolbar() {
  return (
    <FlexRow gap={3} className="shrink-0">
      <NewFolderBtn />
      <NewImageDialog />
      <GalleryGridSettingBtn className="ml-auto" />
    </FlexRow>
  )
}