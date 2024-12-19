import { Modal } from "@/components/modal";
import { NewImageDialog } from "../_components/image/new-image-dialog";
import { ImagePickerProvider } from "../_components/image/image-picker-provider";
import { ImagePicker } from "../_components/image/picker/image-picker";
import { FlexRow } from "@/components/ui/flexbox";

export default async function GalleryNewPage() {
  return (
    <Modal>
      <ImagePickerProvider initialExpanded>
        <FlexRow p={5} className="flex gap-0 max-w-3xl h-[38rem] rounded-3xl w-fit">
          <NewImageDialog />
          <ImagePicker expanded />
        </FlexRow>
      </ImagePickerProvider>
    </Modal>
  )
}