import { EmptyIllustration } from "@/components/empty";
import { FlexColumn } from "@/components/ui/flexbox";
import { Heading } from "@/components/ui/typography";
import { useTranslations } from "next-intl";

export function NoArticleFound() {
  const t = useTranslations('article')

  return (
    <FlexColumn center className="m-auto">
      <EmptyIllustration />
      <Heading weight={600} className="mb-16">
        {t('noArticles')}
      </Heading>
    </FlexColumn>
  )
}