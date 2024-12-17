import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GridColumn } from "@/components/ui/grid"
import { ApiCard } from "./api-card"
import { useTranslations } from "next-intl"

export function ArticleApis() {
  const t = useTranslations()

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
          <ApiCard name={'manyArticles'} type={'many'} path={`/api/articles`} />
          <ApiCard name={'uniqueArticle'} type={'unique'} path={`/api/articles/[id]`} />
        </GridColumn>
      </CardContent>
    </Card>
  )
}