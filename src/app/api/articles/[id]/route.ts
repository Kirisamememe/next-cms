import { accessTokenService, apiService, articleService } from "@/di/services"
import { idSchema } from "@/types"
import { NextRequest, NextResponse } from "next/server"

type Params = Promise<{ id: string }>

export async function GET(
  req: NextRequest,
  segmentData: { params: Params }
) {
  const api = await apiService.getByName('uniqueArticle')
  if (!api || !api.activatedAt) {
    return
  }

  const response = NextResponse.json(api)
  response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
  response.headers.set('Access-Control-Allow-Methods', 'GET')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  const authHeader = req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')
  if (!token) return
  if (!await accessTokenService.isTokenAvailable(token)) {
    return NextResponse.json({ error: 'Token is expired or invalid' }, { status: 401 })
  }

  const { id } = await segmentData.params
  if (!id) {
    return NextResponse.json({ error: "Invalid query" })
  }

  const parsedId = idSchema.parse(Number(id))
  const article = await articleService.getById(parsedId, { publishedOnly: true })

  if (!article) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  return NextResponse.json(article)
}