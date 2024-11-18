'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FileText, Users } from 'lucide-react'

type ContentStats = {
  type: string
  count: number
  views: number
  totalCharacters: number
}

type ApiUsage = {
  name: string
  requests: number
  limit: number
}

export default function Dashboard() {
  const [userInfo] = useState({
    name: '山田 太郎',
    email: 'taro.yamada@example.com',
    role: '管理者',
    ipAddress: '192.168.1.1',
    lastLogin: new Date('2023-06-15T09:30:00')
  })

  const [contentStats] = useState<ContentStats[]>([
    { type: 'ブログ記事', count: 50, views: 10000, totalCharacters: 250000 },
    { type: 'ポートフォリオ', count: 10, views: 5000, totalCharacters: 50000 },
    { type: 'ギャラリー', count: 5, views: 3000, totalCharacters: 10000 },
    { type: 'バイオグラフィー', count: 1, views: 2000, totalCharacters: 5000 },
  ])

  const [apiUsage] = useState<ApiUsage[]>([
    { name: 'メインコンテンツAPI', requests: 15000, limit: 20000 },
    { name: 'カスタムコンテンツAPI', requests: 5000, limit: 10000 },
  ])

  const [dbStats] = useState({
    totalSize: 500, // MB
    usedSize: 350, // MB
    connections: 25,
    maxConnections: 100
  })

  useEffect(() => {
    // ここで実際のデータをフェッチする処理を行います
    // 今回はダミーデータを使用しています
  }, [])

  return (
    <div className="container mx-auto">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ユーザー情報</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>{userInfo.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{userInfo.name}</p>
                <p className="text-xs text-muted-foreground">{userInfo.email}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-xs"><strong>役割:</strong> {userInfo.role}</p>
              <p className="text-xs"><strong>IPアドレス:</strong> {userInfo.ipAddress}</p>
              <p className="text-xs"><strong>最終ログイン:</strong> {userInfo.lastLogin.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        {contentStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.type}</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.count}</div>
              <p className="text-xs text-muted-foreground">
                閲覧数: {stat.views.toLocaleString()} / 文字数: {stat.totalCharacters.toLocaleString()}
              </p>
              <Progress
                value={(stat.views / 20000) * 100}
                className="mt-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>API使用状況</CardTitle>
            <CardDescription>各APIの使用状況と制限</CardDescription>
          </CardHeader>
          <CardContent>
            {apiUsage.map((api, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{api.name}</span>
                  <Badge variant={api.requests > api.limit * 0.8 ? "destructive" : "secondary"}>
                    {api.requests.toLocaleString()} / {api.limit.toLocaleString()}
                  </Badge>
                </div>
                <Progress
                  value={(api.requests / api.limit) * 100}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>データベース統計</CardTitle>
            <CardDescription>データベースの使用状況と接続数</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">ストレージ使用量</span>
                  <span className="text-sm text-muted-foreground">
                    {dbStats.usedSize} MB / {dbStats.totalSize} MB
                  </span>
                </div>
                <Progress
                  value={(dbStats.usedSize / dbStats.totalSize) * 100}
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">接続数</span>
                  <span className="text-sm text-muted-foreground">
                    {dbStats.connections} / {dbStats.maxConnections}
                  </span>
                </div>
                <Progress
                  value={(dbStats.connections / dbStats.maxConnections) * 100}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>コンテンツ閲覧統計</CardTitle>
          <CardDescription>過去7日間のコンテンツタイプ別閲覧数</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: '6日前', ブログ記事: 400, ポートフォリオ: 240, ギャラリー: 180, バイオグラフィー: 100 },
                { name: '5日前', ブログ記事: 300, ポートフォリオ: 200, ギャラリー: 150, バイオグラフィー: 80 },
                { name: '4日前', ブログ記事: 500, ポートフォリオ: 280, ギャラリー: 220, バイオグラフィー: 120 },
                { name: '3日前', ブログ記事: 450, ポートフォリオ: 260, ギャラリー: 200, バイオグラフィー: 110 },
                { name: '2日前', ブログ記事: 600, ポートフォリオ: 320, ギャラリー: 250, バイオグラフィー: 140 },
                { name: '昨日', ブログ記事: 550, ポートフォリオ: 300, ギャラリー: 230, バイオグラフィー: 130 },
                { name: '今日', ブログ記事: 700, ポートフォリオ: 380, ギャラリー: 280, バイオグラフィー: 160 },
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="ブログ記事" fill="hsl(var(--chart-1))" />
              <Bar dataKey="ポートフォリオ" fill="hsl(var(--chart-2))" />
              <Bar dataKey="ギャラリー" fill="hsl(var(--chart-3))" />
              <Bar dataKey="バイオグラフィー" fill="hsl(var(--chart-4))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}