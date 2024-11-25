'use client'

import { Button } from "@/components/ui/button";
import { FolderPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useGalleryContext } from "../gallery-provider";

export function NewFolderBtn() {
  const t = useTranslations()
  const { setCreatingNewFolder } = useGalleryContext()

  return (
    <Button variant={'outline'} onClick={() => setCreatingNewFolder(true)}>
      <FolderPlus size={16} />
      {t('gallery.newFolder.btn')}
    </Button>
  )
}