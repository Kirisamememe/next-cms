'use client'

import { Button } from "@/components/ui/button"
import { FlexRow } from "@/components/ui/flexbox"
import { Input } from "@/components/ui/input"
import { Submit } from "@/components/ui/submit-button"
import { Check, X, Folder } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { SetStateAction } from "react"

type Props = {
  name?: string
  setIsEditing?: React.Dispatch<SetStateAction<boolean>>
}

export function FolderNameForm({ name, setIsEditing }: Props) {
  const t = useTranslations()
  const router = useRouter()

  const handleClick = () => {
    if (setIsEditing) {
      setIsEditing(false)
      return
    }

    router.back()
  }

  return (
    <>
      <div className="p-2 w-fit rounded-md">
        <Folder size={48} />
      </div>
      <Input name="name" defaultValue={name} placeholder={t('gallery.newFolder.form.namePlaceholder')} className="mt-auto" />
      <FlexRow gap={2}>
        <Button type="button" variant={'outline'} size={'sm'} className="flex-grow" onClick={handleClick}>
          <X size={20} />
        </Button>
        <Submit type="submit" variant={'outline'} size={'sm'} className="flex-grow">
          <Check size={20} />
        </Submit>
      </FlexRow>
    </>
  )
}