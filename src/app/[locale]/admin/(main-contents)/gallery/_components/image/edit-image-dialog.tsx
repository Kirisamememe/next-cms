import { EditSingleImage } from "../edit-single-image";
import { getLocale, getTranslations } from "next-intl/server";
import { FlexColumn, FlexRow } from "@/components/ui/flexbox";
import { Heading, LabelText } from "@/components/ui/typography";
import { format } from "date-fns";
import { getLocaleForFns } from "@/i18n";
import { ImageUrl } from "@/types";
import { GalleryImageItem } from "../image-item";

type Props = {
  imageUrl: ImageUrl
}

export async function EditImageDialogContent({ imageUrl }: Props) {
  const t = await getTranslations()
  const _locale = await getLocale()
  const locale = getLocaleForFns(_locale)

  return (
    <>
      <FlexColumn gap={1} className="relative shrink-0">
        <div className="absolute inset-0 -mt-6 -ml-6 z-0 ">
          <GalleryImageItem url={imageUrl.url.replace('/upload/', '/upload/ar_1.0,c_lfill,h_768/')} />
          <div className="absolute inset-0 w-full aspect-square bg-gradient-to-l from-background to-background/50" />
          <div className="absolute inset-0 w-full aspect-square bg-gradient-to-t from-background to-background/50" />
        </div>
        <FlexRow gap={4} className="shrink-0 mb-4 z-10">

          <FlexColumn gap={1}>
            <Heading size={24} mb={1}>
              {t('gallery.imageUrl.edit.title', { id: imageUrl.id })}
            </Heading>
            <LabelText>
              {t('gallery.imageUrl.edit.createdAt', { datetime: format(imageUrl.createdAt, 'PPP p', { locale }) })}
            </LabelText>
            <LabelText>
              {t('gallery.imageUrl.edit.updatedAt', { datetime: format(imageUrl.createdAt, 'PPP p', { locale }) })}
            </LabelText>
            <LabelText>
              {t('gallery.imageUrl.edit.author', { author: imageUrl.author?.nickname || imageUrl.author?.name })}
            </LabelText>
          </FlexColumn>
        </FlexRow>

        <EditSingleImage imageUrl={imageUrl} />
      </FlexColumn>

    </>
  )
}