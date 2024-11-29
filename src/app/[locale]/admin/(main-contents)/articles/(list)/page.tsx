import { articleService } from "@/di/services";
import { ArticleList } from "../_components/article-list";



export default async function ArticlesPage() {
  const articles = await articleService.getMany()

  return (
    <ArticleList articles={articles} />
  )
}