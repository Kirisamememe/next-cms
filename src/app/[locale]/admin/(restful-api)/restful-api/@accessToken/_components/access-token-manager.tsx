'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Copy, RefreshCw } from "lucide-react"

export function AccessTokenManager() {
  const [accessToken, setAccessToken] = useState<string>('')

  const generateAccessToken = () => {
    const newToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setAccessToken(newToken)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>アクセストークン生成</CardTitle>
        <CardDescription>APIアクセストークンを生成・管理します</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Input
            value={accessToken}
            readOnly
            placeholder="ここにアクセストークンが表示されます"
            className="flex-grow"
          />
          <Button onClick={() => copyToClipboard(accessToken)} size="icon">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={generateAccessToken}>
          <RefreshCw className="mr-2 h-4 w-4" /> 新しいトークンを生成
        </Button>
      </CardFooter>
    </Card>
  )
}