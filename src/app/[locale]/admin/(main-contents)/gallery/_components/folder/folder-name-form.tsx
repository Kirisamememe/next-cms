'use client'

import { Button } from "@/components/ui/button"
import { FlexRow } from "@/components/ui/flexbox"
import { Input } from "@/components/ui/input"
import { Check, X, Folder } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { SetStateAction } from "react"
import { useGalleryContext } from "../gallery-provider"

type Props = {
  pending: boolean
  name?: string
  setIsEditing: React.Dispatch<SetStateAction<boolean>>
  action: (payload: FormData) => void
}

export function FolderNameForm({ pending, name, setIsEditing, action }: Props) {
  const t = useTranslations()
  const router = useRouter()
  const { gridSize } = useGalleryContext()

  const handleClick = () => {
    if (setIsEditing) {
      setIsEditing(false)
      return
    }

    router.back()
  }

  return (
    <form action={action} className="flex flex-col p-4 w-full aspect-square gap-1 justify-center bg-muted transition-all">
      <div className="px-1 w-fit rounded-md">
        <Folder size={gridSize < 3 ? 24 : 32} />
      </div>
      <Input name="name" defaultValue={name} placeholder={t('gallery.newFolder.form.namePlaceholder')} className="mt-auto h-8 text-xs font-medium" autoComplete={"off"} />
      <FlexRow gap={1}>
        <Button type="button" variant={'outline'} size={'sm'} className="flex-grow h-8 rounded-md" onClick={handleClick}>
          <X size={16} />
        </Button>
        <Button type="submit" variant={'outline'} size={'sm'} className="flex-grow h-8 rounded-md" isPending={pending}>
          <Check size={16} />
        </Button>
      </FlexRow>
    </form>
  )
}