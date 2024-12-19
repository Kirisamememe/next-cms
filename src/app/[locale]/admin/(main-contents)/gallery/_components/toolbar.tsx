import { FlexRow } from "@/components/ui/flexbox";
import { NewFolderBtn } from "./folder/new-folder-btn";
import { GalleryGridSettingBtn } from "./gallery-grid-setting-btn";
import { NewImageBtn } from "./image/new-image-btn";

export function GalleryToolbar() {
  return (
    <FlexRow gap={3} className="shrink-0">
      <NewFolderBtn />
      <NewImageBtn />
      <GalleryGridSettingBtn className="ml-auto" />
    </FlexRow>
  )
}