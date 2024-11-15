import { useTranslations } from "next-intl"
import { RSCTabLink, RSCTabs } from "@/components/ui/rsc-tabs"

const tabs = ["all", "draft", "published", "archive"]

export function ArticleTabs() {
  const t = useTranslations()

  return (
    <RSCTabs>
      {tabs.map((tab) => (
        <RSCTabLink key={tab} segment={tab} path={`/admin/articles${tab === 'all' ? '' : `/${tab}`}`}>
          {t(`article.tabs.${tab}`)}
        </RSCTabLink>
      ))}
    </RSCTabs>
  )
}
