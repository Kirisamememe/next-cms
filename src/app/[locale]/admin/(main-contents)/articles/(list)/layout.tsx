import { ReactNode } from "react";
import { ArticleTabs } from "../_components/tabs";
import { FlexColumn } from "@/components/ui/flexbox";
import { InsetLayoutNoPadding } from "../../../_components/inset-layout-no-padding";
import { NewContentBtnContainer } from "../../../_components/content/new-content-button-container";
import { useTranslations } from "next-intl";

type Props = {
  children: ReactNode
}

export default function ArticlePageLayout({ children }: Props) {
  const t = useTranslations()

  return (
    <InsetLayoutNoPadding >
      <NewContentBtnContainer href={'/admin/articles/edit'} label={t('article.newArticle')} />
      <ArticleTabs />
      <FlexColumn className="relative h-full p-4 @[52rem]:p-6 @[52rem]:-mt-2 gap-4">
        {children}
      </FlexColumn>
    </InsetLayoutNoPadding>
  )
}

