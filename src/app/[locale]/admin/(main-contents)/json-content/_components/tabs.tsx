import { useTranslations } from "next-intl"
import { RSCTabLink, RSCTabs } from "@/components/ui/rsc-tabs"

const tabs = ["all", "draft", "published", "archive"]

export function JsonContentTabs() {
  const t = useTranslations()

  return (
    <RSCTabs>
      {tabs.map((tab) => (
        <RSCTabLink key={tab} segment={tab} path={`/admin/json-content${tab === 'all' ? '' : `/${tab}`}`}>
          {t(`jsonContent.tabs.${tab}`)}
        </RSCTabLink>
      ))}
    </RSCTabs>
  )
}
