import { NextRequest, NextResponse } from "next/server";
import { accessTokenService, apiService, articleService } from "@/di/services";


export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const data = await apiService.getByName('manyArticles')
  if (!data || !data.activatedAt) {
    return
  }

  const authHeader = req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')
  if (!token) return
  if (!await accessTokenService.isTokenAvailable(token)) {
    return NextResponse.json({ error: 'Token is expired or invalid' }, { status: 401 })
  }

  const articles = await articleService.getManyPublished()

  const searchParams = req.nextUrl.searchParams
  const search = searchParams.get('search')
  if (search) {
    const filteredArticles = articles.filter((article) => article.atom.body.includes(search) || article.atom.title?.includes(search))
    return NextResponse.json({ data: filteredArticles })
  }

  return NextResponse.json(articles)
}
