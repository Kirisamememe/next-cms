import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GridColumn } from "@/components/ui/grid"
import { MainContentApiCard } from "./main-content-card"
import { useTranslations } from "next-intl"

const MAIN_CONTENT = ['homepage', 'article', 'portfolio', 'gallery', 'biography']

export function MainContentApi() {
  const t = useTranslations()

  return (
    <Card className="appear">
      <CardHeader>
        <CardTitle>
          {t('restfulApi.mainApi.title')}
        </CardTitle>
        <CardDescription>
          {t('restfulApi.mainApi.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GridColumn className="@[48rem]:grid-cols-2 @[64rem]:grid-cols-2 @[80rem]:grid-cols-3">
          {MAIN_CONTENT.map((name) => (
            <MainContentApiCard key={name} name={name} />
          ))}
        </GridColumn>
      </CardContent>
    </Card>
  )
}