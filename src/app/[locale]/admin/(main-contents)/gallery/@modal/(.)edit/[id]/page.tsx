import { EditSingleImage } from "../../../_components/edit-single-image"
import { Modal } from "../../../_components/modal"
import { imageUrlService } from "@/services/image-url-service"
import { notFound } from "next/navigation"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getTranslations } from "next-intl/server"

type Props = {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: Props) {
  const t = await getTranslations()
  const { id } = await params
  const { data, noData } = await imageUrlService.fetchById(Number(id))

  if (noData) {
    notFound()
  }

  return (
    <Modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t('gallery.imageUrl.edit.title')}
          </DialogTitle>
          <DialogDescription className="mb-4">
            {t('gallery.imageUrl.edit.description')}
          </DialogDescription>
        </DialogHeader>
        <EditSingleImage imageUrl={data} />
      </DialogContent>
    </Modal>
  )
}