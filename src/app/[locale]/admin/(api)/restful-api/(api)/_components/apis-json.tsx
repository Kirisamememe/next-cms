import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GridColumn } from "@/components/ui/grid"
import { useTranslations } from "next-intl"
import { ApiCard } from "./api-card"


export function JsonApis() {
  const t = useTranslations()
  const GET_MANY_PARAMS = '?category=, author=, take=, search='
  const GET_UNIQUE_PARAMS = '?select=,'

  return (
    <Card className="appear">
      <CardHeader>
        <CardTitle>
          {t('api.json.title')}
        </CardTitle>
        <CardDescription>
          {t('api.json.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GridColumn className="@[48rem]:grid-cols-2">
          <ApiCard
            name={'manyJsonContents'} type={'many'} path={'/api/json-contents'}
            searchParams={GET_MANY_PARAMS}
          />
          <ApiCard
            name={'uniqueJsonContent'} type={'unique'} path={'/api/json-contents/[id]'}
            searchParams={GET_UNIQUE_PARAMS}
          />
        </GridColumn>
      </CardContent>
    </Card>
  )
}