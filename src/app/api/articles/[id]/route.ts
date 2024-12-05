import { apiService } from "@/di/services"
import { NextResponse } from "next/server"

export async function GET() {
  const data = await apiService.getByName('article')
  if (!data || !data.activatedAt) {
    return
  }

  return NextResponse.json({ data: "test" })
}