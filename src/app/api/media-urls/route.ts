import { NextRequest, NextResponse } from "next/server";
import { accessTokenService, apiService, imageUrlService } from "@/di/services";


export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const data = await apiService.getByName('manyMediaUrls')
  if (!data || !data.activatedAt) {
    return
  }

  const authHeader = req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')
  if (!token) return
  if (!await accessTokenService.isTokenAvailable(token)) {
    return NextResponse.json({ error: 'Token is expired or invalid' }, { status: 401 })
  }

  const searchParams = req.nextUrl.searchParams
  const folder = searchParams.get('folder')
  if (folder) {
    const mediaUrls = await imageUrlService.getUrlsByFolder(folder)
    return NextResponse.json(mediaUrls)
  }

  const mediaUrls = await imageUrlService.getMany()

  return NextResponse.json(mediaUrls)
}
