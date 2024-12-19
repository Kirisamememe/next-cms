import { accessTokenService, apiService, jsonContentService } from "@/di/services"
import { idSchema } from "@/types"
import { NextRequest, NextResponse } from "next/server"

type Params = Promise<{ id: string }>

export async function GET(
  req: NextRequest,
  segmentData: { params: Params }
) {
  const api = await apiService.getByName('uniqueJsonContent')
  if (!api || !api.activatedAt) {
    return
  }

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
  const jsonContent = await jsonContentService.getById(parsedId, { publishedOnly: true })

  if (!jsonContent) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  return NextResponse.json(jsonContent)
}