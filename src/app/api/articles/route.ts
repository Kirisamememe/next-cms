import { NextRequest, NextResponse } from "next/server";
import { accessTokenService, apiService, articleService } from "@/di/services";


export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const data = await apiService.getByName('article')
  if (!data || !data.activatedAt) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
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
    const data = await articleService.getById(Number(id), true)
    if (!data) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }
    return NextResponse.json({ data })
  }

  const articles = await articleService.getManyPublished()

  const search = searchParams.get('search')
  if (search) {
    const filteredArticles = articles.filter((article) => article.atom.body.includes(search) || article.atom.title?.includes(search))
    return NextResponse.json({ data: filteredArticles })
  }

  return NextResponse.json({ articles })

  // return NextResponse.json({ req })
}
