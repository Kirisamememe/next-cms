import { NextRequest, NextResponse } from "next/server";
import { accessTokenService, apiService, imageUrlService } from "@/di/services";
import { idSchema } from "@/types";

type Params = Promise<{ id: string }>

export async function GET(
  req: NextRequest,
  segmentData: { params: Params }
) {
  const api = await apiService.getByName('uniqueMediaUrl')
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

  const parsedId = await idSchema.parseAsync(Number(id))
  const mediaUrl = await imageUrlService.getById(parsedId)

  if (!mediaUrl) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  return NextResponse.json(mediaUrl)
}
