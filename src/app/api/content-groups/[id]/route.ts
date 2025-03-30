import { NextRequest, NextResponse } from "next/server";
import { accessTokenService, apiService, contentGroupService } from "@/di/services";
import { idSchema } from "@/types";

type Params = Promise<{ id: string }>

export async function GET(
  req: NextRequest,
  segmentData: { params: Params }
) {
  // 稼働確認
  const api = await apiService.getByName('uniqueContentGroup')
  if (!api || !api.activatedAt) {
    return
  }

  // トークン確認
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')
  if (!token) return
  if (!await accessTokenService.isTokenAvailable(token)) {
    return NextResponse.json({ error: 'Token is expired or invalid' }, { status: 401 })
  }

  // id確認
  const { id } = await segmentData.params
  if (!id) {
    return NextResponse.json({ error: "Invalid query" })
  }
  const parsedId = await idSchema.parseAsync(Number(id))

  // データ取得
  const contentGroup = await contentGroupService.findUnique(parsedId)

  if (!contentGroup) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  return NextResponse.json(contentGroup)
}
