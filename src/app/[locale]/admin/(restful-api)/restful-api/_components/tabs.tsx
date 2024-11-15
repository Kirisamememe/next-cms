import { useTranslations } from "next-intl"
import { RSCTabLink, RSCTabs } from "@/components/ui/rsc-tabs"

const tabs = ["main-content", "custom-content"]

export function ApiTabs() {
  const t = useTranslations()

  return (
    <RSCTabs>
      {tabs.map((tab) => (
        <RSCTabLink key={tab} segment={tab} path={`/admin/restful-api/${tab}`}>
          {t(`restfulApi.tabs.${tab}`)}
        </RSCTabLink>
      ))}
    </RSCTabs>
  )
}
