import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GridColumn } from "@/components/ui/grid"
import { ApiCard } from "./api-card"
import { useTranslations } from "next-intl"

export function ArticleApis() {
  const t = useTranslations()
  const GET_MANY_PARAMS = '?category=, author=, take=, search='
  const GET_UNIQUE_PARAMS = '?select=,'
  const MANY_NAME = 'manyArticles'
  const SINGLE_NAME = 'uniqueArticle'

  return (
    <Card className="appear">
      <CardHeader>
        <CardTitle>
          {t('api.article.title')}
        </CardTitle>
        <CardDescription>
          {t('api.article.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GridColumn className="@[48rem]:grid-cols-2">
          <ApiCard
            name={MANY_NAME} type={'many'} path={`/api/articles`}
            searchParams={GET_MANY_PARAMS}
          />
          <ApiCard
            name={SINGLE_NAME} type={'unique'} path={`/api/articles/[id]`}
            searchParams={GET_UNIQUE_PARAMS}
          />
        </GridColumn>
      </CardContent>
    </Card>
  )
}