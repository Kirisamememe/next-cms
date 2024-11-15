import { Api } from "@/types/api-schema"

type Props = {
  api: Api
}

export function ApiDetails({ api }: Props) {

  return (
    <div className="space-y-2 text-sm">
      <p><strong>パス:</strong> {api.path}</p>
      <p><strong>作成日時:</strong> {api.createdAt ? api.createdAt.toLocaleString() : ''}</p>
      <p><strong>更新日時:</strong> {api.updatedAt ? api.updatedAt.toLocaleString() : ''}</p>
      <p><strong>状態:</strong> {api.activatedAt ? `${api.activatedAt.toLocaleString()}に起動` : '未稼働'}</p>
      <p><strong>許可されたオリジン:</strong> {api.allowedOrigins}</p>
    </div>
  )
}