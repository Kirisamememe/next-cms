import { apiService } from "@/services/api-service";
import { articleService } from "@/services/article-service";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET() {
  const { data, noData } = await apiService.getByName('article')
  if (noData) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }
  if (!data.activatedAt) {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }

  const articles = await articleService.getMany()
  return Response.json({ articles })
}
