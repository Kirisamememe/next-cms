import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GridColumn } from "@/components/ui/grid"
import { useTranslations } from "next-intl"
import { ApiCard } from "./api-card"

export const ContentGroupApis = () => {
  const t = useTranslations()
  const GET_MANY_PARAMS = '?author=, take='
  const GET_UNIQUE_PARAMS = '?select='
  const MANY_NAME = 'manyContentGroups'
  const SINGLE_NAME = 'uniqueContentGroup'

  return (
    <Card className="appear">
      <CardHeader>
        <CardTitle>
          {t('api.contentGroup.title')}
        </CardTitle>
        <CardDescription>
          {t('api.contentGroup.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GridColumn className="@[48rem]:grid-cols-2">
          <ApiCard
            name={MANY_NAME} type={'many'} path={'/api/content-groups'}
            searchParams={GET_MANY_PARAMS}
          />
          <ApiCard
            name={SINGLE_NAME} type={'unique'} path={'/api/content-groups/[id]'}
            searchParams={GET_UNIQUE_PARAMS}
          />
        </GridColumn>
      </CardContent>
    </Card>
  )
}