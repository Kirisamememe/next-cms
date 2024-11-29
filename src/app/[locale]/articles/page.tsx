import { articleService } from "@/di/services"


export default async function ArticlesPage() {

  const articles = await articleService.getManyPublished()
  if (!articles.length) {
    return null
  }

  return (
    <div>
      {articles[0].publishedAt.toISOString()}
    </div>
  )
}