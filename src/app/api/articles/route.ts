import { accessTokenService } from "@/services/access-token-service";
import { apiService } from "@/services/api-service";
import { articleService } from "@/services/article-service";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { data, noData } = await apiService.getByName('article')
  if (noData) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }
  if (!data.activatedAt) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }

  const authHeader = req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!await accessTokenService.isTokenAvailable(token)) {
    return NextResponse.json({ error: 'Token is expired or invalid' }, { status: 401 })
  }

  const searchParams = req.nextUrl.searchParams

  const id = searchParams.get('id')
  if (id) {
    const { data, noData } = await articleService.getById(Number(id))
    if (noData) {
      return Response.json({ error: noData })
    }
    return Response.json({ data })
  }

  const articles = await articleService.getMany()

  const search = searchParams.get('search')
  if (search) {
    const filteredArticles = articles.filter((article) => article.atom.body.includes(search) || article.atom.title?.includes(search))
    return Response.json({ data: filteredArticles })
  }

  return Response.json({ articles })
}
