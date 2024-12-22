import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Database, PiIcon as Api, Users, Images } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Props = {
  articles: {
    articleCount: number,
    articleCategories: string[]
  },
  jsonContent: {
    jsonCount: number,
    jsonCategories: string[]
  },
  gallery: {
    imageCount: number,
    folderCount: number
  },
  apis: string[]
  editors: {
    nickname: string,
    image: string
  }[]
}

export const Dashboard = ({
  articles: { articleCount, articleCategories },
  jsonContent: { jsonCount, jsonCategories },
  gallery: { imageCount, folderCount },
  apis,
  editors,
}: Props) => {

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">CMS Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 記事セクション */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">記事</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{articleCount}</div>
            <div className="flex flex-wrap gap-2">
              {articleCategories.map((category, index) => (
                <Badge key={index} variant="secondary">{category}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* JSONコンテンツセクション */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">JSONコンテンツ</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{jsonCount}</div>
            <div className="flex flex-wrap gap-2">
              {jsonCategories.map((category, index) => (
                <Badge key={index} variant="secondary">{category}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ギャラリーセクション */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ギャラリー</CardTitle>
            <Images className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{imageCount}</div>
            <p className="text-xs text-muted-foreground">
              画像数: {imageCount}, フォルダー数: {folderCount}
            </p>
          </CardContent>
        </Card>

        {/* API一覧セクション */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API一覧</CardTitle>
            <Api className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full rounded-md">
              {apis.map((api, index) => (
                <div key={index} className="flex items-center space-x-4 py-2">
                  <div className="flex-shrink-0">
                    <Api className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{api}</p>
                    <p className="text-xs text-muted-foreground">ステータス: アクティブ</p>
                  </div>
                  <Badge variant="outline">v1.0</Badge>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 編集者一覧セクション */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">現在の編集者</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] w-full rounded-md">
              {editors.map((editor, index) => (
                <div key={index} className="flex items-center space-x-4 py-2">
                  <div className="flex-shrink-0">
                    <Avatar>
                      <AvatarImage src={editor.image} />
                      <AvatarFallback>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                          {editor.nickname.charAt(0)}
                        </div>
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{editor.nickname}</p>
                    <p className="text-xs text-muted-foreground">最終アクティブ: 5分前</p>
                  </div>
                  <Badge variant="secondary">オンライン</Badge>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

