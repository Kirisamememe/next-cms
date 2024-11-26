import { FlexRow } from "@/components/ui/flexbox";
import { NewImageDialog } from "./image/new-image-dialog";
import { NewFolderBtn } from "./folder/new-folder-btn";
import { GallerySettingBtn } from "./setting-btn";

export function GalleryToolbar() {
  return (
    <FlexRow gap={3} className="shrink-0">
      <NewFolderBtn />
      <NewImageDialog />
      <GallerySettingBtn className="ml-auto" />
    </FlexRow>
  )
}