import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GridColumn } from "@/components/ui/grid"
import { useTranslations } from "next-intl"

export function CustomContentApi() {
  const t = useTranslations()

  return (
    <Card className="appear">
      <CardHeader>
        <CardTitle>
          {t('restfulApi.customApi.title')}
        </CardTitle>
        <CardDescription>
          {t('restfulApi.customApi.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GridColumn>

        </GridColumn>
      </CardContent>
    </Card>
  )
}