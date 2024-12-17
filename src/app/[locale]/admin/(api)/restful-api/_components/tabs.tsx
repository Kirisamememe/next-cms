import { useTranslations } from "next-intl"
import { RSCTabLink, RSCTabs } from "@/components/ui/rsc-tabs"

const tabs = ["api", "token"]

export function ApiTabs() {
  const t = useTranslations()

  return (
    <RSCTabs>
      {tabs.map((tab) => (
        <RSCTabLink key={tab} segment={tab} path={`/admin/restful-api${tab === 'api' ? '' : `/${tab}`}`}>
          {t(`api.tabs.${tab}`)}
        </RSCTabLink>
      ))}
    </RSCTabs>
  )
}
