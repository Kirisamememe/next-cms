import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { AccessTokenDialog } from "./access-token-dialog"
import { AccessTokenTable } from "./access-token-table"
import { useTranslations } from "next-intl"

export function AccessTokenManager() {
  const t = useTranslations()

  return (
    <Card className="w-full appear">
      <CardHeader>
        <CardTitle>
          {t('api.token.title')}
        </CardTitle>
        <CardDescription>
          {t('api.token.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AccessTokenDialog />
        <AccessTokenTable />
      </CardContent>
    </Card>
  )
}