import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib"
import { FC } from "react"
import { i18n } from "@/i18n"
import { useTranslations } from "next-intl"

type Props = {
  className?: string
} & React.ComponentPropsWithoutRef<typeof Select>
  & Pick<React.ComponentPropsWithoutRef<typeof SelectValue>, "placeholder">

export const LanguageSelector: FC<Props> = ({ className, placeholder, ...props }) => {
  const t = useTranslations()

  return (
    <Select name="language" {...props}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(i18n.locales).map(([locale, name]) => (
          <SelectItem key={locale} value={locale}>
            {name}
          </SelectItem>
        ))}
        <SelectItem value={'unspecified'}>
          {t('common.languageSelector.unspecified')}
        </SelectItem>
      </SelectContent>
    </Select>
  )
}