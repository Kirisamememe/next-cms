import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GridColumn } from "@/components/ui/grid"
import { useTranslations } from "next-intl"
import { ApiCard } from "./api-card"


export function GalleryApis() {
  const t = useTranslations()
  const GET_MANY_PARAMS = '?category=, author=, take=, search='
  const GET_UNIQUE_PARAMS = '?select=,'
  const MANY_NAME = 'manyMediaUrls'
  const SINGLE_NAME = 'uniqueMediaUrl'

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
          <ApiCard
            name={MANY_NAME} type={'many'} path={'/api/media-urls'}
            searchParams={GET_MANY_PARAMS}
          />
          <ApiCard
            name={SINGLE_NAME} type={'unique'} path={'/api/media-urls/[id]'}
            searchParams={GET_UNIQUE_PARAMS}
          />
        </GridColumn>
      </CardContent>
    </Card>
  )
}