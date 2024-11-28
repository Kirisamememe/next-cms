import { articleService } from "@/di/services";
import { ArticleList } from "../_components/article-list";



export default async function ArticlesPage() {
  // const articleService = getArticleService()
  const articles = await articleService.getMany()

  return (
    <ArticleList articles={articles} />
  )
}