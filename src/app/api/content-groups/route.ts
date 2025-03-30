import { NextRequest, NextResponse } from "next/server";
import { accessTokenService, apiService, contentGroupService } from "@/di/services";


export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  // 稼働確認
  const data = await apiService.getByName('manyContentGroups')
  if (!data || !data.activatedAt) {
    return
  }

  // トークン確認
  const authHeader = req.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')
  if (!token) return
  if (!await accessTokenService.isTokenAvailable(token)) {
    return NextResponse.json({ error: 'Token is expired or invalid' }, { status: 401 })
  }


  // データ取得
  const contentGroups = await contentGroupService.findMany()

  return NextResponse.json(contentGroups)
}
