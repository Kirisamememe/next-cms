import { handlers } from "@/auth" // Referring to the auth.ts we just created
import { NextRequest } from "next/server"

const reqWithTrustedOrigin = (req: NextRequest): NextRequest => {
  // 環境変数 AUTH_TRUST_HOST が true でなければ何もしない
  if (process.env.AUTH_TRUST_HOST !== 'true') return req

  // Nginx/Tunnelから送られてくるはずのヘッダーを取得
  const proto = req.headers.get('x-forwarded-proto')
  const host = req.headers.get('x-forwarded-host') // または 'host' ヘッダーを使うか確認

  // ヘッダーがない場合は警告を出して元のリクエストを返す
  if (!proto || !host) {
    console.warn("Missing x-forwarded-proto or x-forwarded-host headers.")
    return req
  }

  // 正しいオリジンを構築
  const envOrigin = `${proto}://${host}`
  const { href, origin } = req.nextUrl // 元のリクエストURLとオリジン

  // 元の href 内の誤ったオリジン (例: "http://localhost:3000") を
  // ヘッダーから構築した正しいオリジン (envOrigin) に置換して新しいリクエストを作成
  return new NextRequest(href.replace(origin, envOrigin), req)
}

export const GET = (req: NextRequest) => {
  return handlers.GET(reqWithTrustedOrigin(req))
}

export const POST = (req: NextRequest) => {
  return handlers.POST(reqWithTrustedOrigin(req))
}