import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GridColumn } from "@/components/ui/grid"
import { MainContentApiCard } from "./main-content-card"

const MAIN_CONTENT = ['homepage', 'article', 'portfolio', 'gallery', 'biography']

export function MainContentApi() {

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          メインコンテンツAPI
        </CardTitle>
        <CardDescription>
          メインコンテンツAPIの設定を管理します
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