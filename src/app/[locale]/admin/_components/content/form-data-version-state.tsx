import { FlexColumn } from "@/components/ui/flexbox"
import { Separator } from "@/components/ui/separator"
import { LabelText } from "@/components/ui/typography"
import { format } from "date-fns"
import { useTranslations } from "next-intl"

type Props = {
  createdAt: Date
  updatedAt: Date
  archivedAt: Date | null
  version: number
}

export const FormDataVersionState = ({ createdAt, updatedAt, archivedAt, version }: Props) => {
  const t = useTranslations()

  return (
    <FlexColumn gap={2} className="shrink-0 px-4 mb-8">
      <Separator className="w-full my-4" />
      <LabelText>
        {t('common.datetime.createdAt', { datetime: format(createdAt, 'yyyy-MM-dd HH:mm:ss') })}
      </LabelText>
      <LabelText>
        {t('common.datetime.updatedAt', { datetime: format(updatedAt, 'yyyy-MM-dd HH:mm:ss') })}
      </LabelText>
      {archivedAt &&
        <LabelText>
          {t('common.datetime.archivedAt', { datetime: format(archivedAt, 'yyyy-MM-dd HH:mm:ss') })}
        </LabelText>
      }

      {!!version &&
        <LabelText>
          {`Version: ${version}`}
        </LabelText>
      }

    </FlexColumn>
  )
}