import { NextRequest, NextResponse } from "next/server";
import { accessTokenService, apiService, imageUrlService } from "@/di/services";
import { idSchema } from "@/types";


export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const data = await apiService.getByName('gallery')
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
  const id = searchParams.get('id')

  if (id) {
    const parsedId = await idSchema.safeParseAsync(id)
    if (parsedId.error) {
      return NextResponse.json({ error: 'Invalid query' }, { status: 400 })
    }
    const data = await imageUrlService.fetchById(parsedId.data)
    if (!data) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }
    return NextResponse.json({ data })
  }



}
