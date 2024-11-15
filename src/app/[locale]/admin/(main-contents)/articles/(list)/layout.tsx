import { ReactNode } from "react";
import { ArticleTabs } from "../_components/tabs";
import { FlexColumn } from "@/components/ui/flexbox";
import { NewArticleBtn } from "../_components/new-article-button";

type Props = {
  children: ReactNode
}

export default function ArticlePageLayout({ children }: Props) {
  return (
    <>
      <NewArticleBtn />
      <ArticleTabs />
      <FlexColumn className="relative h-full mt-14 @[52rem]:mt-0">
        {children}
      </FlexColumn>
    </>
  )
}

