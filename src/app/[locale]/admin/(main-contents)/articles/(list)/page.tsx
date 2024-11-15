import { articleService } from "@/services/article-service";
import { ArticleList } from "../_components/article-list";


export default async function ArticlesPage() {
  const articles = await articleService.getMany()

  return (
    <ArticleList articles={articles} />
  )
}