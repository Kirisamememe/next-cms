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

  const articles = await articleService.getMany()
  return Response.json({ articles })
}
