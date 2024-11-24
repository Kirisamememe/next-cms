'use client'

import { FlexRow } from "@/components/ui/flexbox"
import { useNewImageContext } from "../new-image-provider"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { Separator } from "@/components/ui/separator"

type Props = {
  urls: string[]
}

export function NewImagePickerSelectAll({ urls }: Props) {
  const t = useTranslations()
  const {
    selectedUrls,
    setSelectedUrls,
    isSingleMode,
  } = useNewImageContext()

  const handleSelectAll = () => {
    setSelectedUrls(urls)
  }

  const handleCancel = () => {
    setSelectedUrls([])
  }


  return (
    <>
      <FlexRow gap={2} className="w-fit absolute bottom-2 right-2 items-center">
        {!isSingleMode && !!selectedUrls.length &&
          <FlexRow center className="h-8 min-w-8 px-2 rounded-full bg-muted/60 backdrop-blur-md font-semibold text-sm">
            {selectedUrls.length}
          </FlexRow>
        }
        {!isSingleMode &&
          <FlexRow className="w-fit bg-muted/60 backdrop-blur-md rounded-full overflow-hidden">
            {!!selectedUrls.length &&
              <>
                <Button
                  size={'sm'} variant={'ghost'}
                  className="rounded-none active:scale-100"
                  onClick={handleCancel}
                >
                  {t('common.cancel')}
                </Button>
                <Separator orientation="vertical" className="h-9 bg-muted" />
              </>
            }
            <Button
              size={'sm'} variant={'ghost'}
              className="rounded-none active:scale-100"
              onClick={handleSelectAll}
            >
              {t('gallery.imageUrl.imagePicker.selectAll')}
            </Button>
          </FlexRow>
        }
      </FlexRow>
    </>
  )
}