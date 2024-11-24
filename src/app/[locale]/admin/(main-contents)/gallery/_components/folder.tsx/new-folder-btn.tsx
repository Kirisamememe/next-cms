'use client'

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { FolderPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export function NewFolderBtn() {
  const t = useTranslations()
  const params = useParams<{ folders?: string[] }>()
  const currentPath = params.folders ? params.folders.join('/') : null

  return (
    <Link href={`/admin/gallery${currentPath ? `/${currentPath}` : ''}?query=newFolder`} className="w-fit">
      <Button variant={'outline'} >
        <FolderPlus size={16} />
        {t('gallery.newFolder.btn')}
      </Button>
    </Link>
  )
}