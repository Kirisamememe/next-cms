import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GridColumn } from "@/components/ui/grid"
import { useTranslations } from "next-intl"
import { ApiCard } from "./api-card"


export function JsonApis() {
  const t = useTranslations()

  return (
    <Card className="appear">
      <CardHeader>
        <CardTitle>
          {t('api.gallery.title')}
        </CardTitle>
        <CardDescription>
          {t('api.gallery.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GridColumn className="@[48rem]:grid-cols-2">
          <ApiCard name={'manyMediaUrls'} type={'many'} path={'/api/media-urls'} />
          <ApiCard name={'uniqueMediaUrl'} type={'unique'} path={'/api/media-urls/[id]'} />
        </GridColumn>
      </CardContent>
    </Card>
  )
}