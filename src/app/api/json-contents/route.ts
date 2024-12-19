import { NextRequest, NextResponse } from "next/server";
import { accessTokenService, apiService, jsonContentService } from "@/di/services";


export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const data = await apiService.getByName('manyJsonContents')
  if (!data || !data.activatedAt) {
    return
  }

  const authHeader = req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')
  if (!token) return
  if (!await accessTokenService.isTokenAvailable(token)) {
    return NextResponse.json({ error: 'Token is expired or invalid' }, { status: 401 })
  }

  const jsonContents = await jsonContentService.getMany('published')

  const searchParams = req.nextUrl.searchParams
  const search = searchParams.get('search')
  if (search) {
    const filteredJsonContents = jsonContents.filter((jsonContent) => JSON.stringify(jsonContent.jsonAtom.content).includes(search) || jsonContent.jsonAtom.title?.includes(search))
    return NextResponse.json({ data: filteredJsonContents })
  }

  return NextResponse.json(jsonContents)
}

