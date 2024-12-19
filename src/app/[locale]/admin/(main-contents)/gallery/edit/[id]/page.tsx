import { Modal } from "@/components/modal";
import { idSchema } from "@/types";
import { imageUrlService } from "@/di/services";
import { EditImageDialogContent } from "../../_components/image/edit-image-dialog";
import { notFound } from "next/navigation";
import { ImagePickerProvider } from "../../_components/image/image-picker-provider";
import { ImagePicker } from "../../_components/image/picker/image-picker";
import { FlexRow } from "@/components/ui/flexbox";
import { cn } from "@/lib";

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function GalleryEditPage({ params, searchParams }: Props) {
  const { id } = await params
  const parsedId = idSchema.parse(Number(id))

  const imageUrl = await imageUrlService.getById(parsedId)

  if (!imageUrl) {
    notFound()
  }

  const { imagePicker } = await searchParams
  const expanded = imagePicker ?? 'false'

  return (
    <Modal>
      <ImagePickerProvider>
        <FlexRow p={6} className={cn(
          "flex gap-0 max-w-3xl rounded-3xl w-fit h-[38rem] overflow-hidden transition-all duration-300 ease-in-out",
          expanded === 'false' ? "w-[23rem]" : "w-[44.25rem]"
        )}>
          <EditImageDialogContent imageUrl={imageUrl} />
          <ImagePicker expanded={expanded === 'true'} />
        </FlexRow>
      </ImagePickerProvider>
    </Modal>
  )
}