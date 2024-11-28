import { articleService } from "@/di/services";
import { ArticleList } from "../_components/article-list";
// import { getArticleService } from "@/di/hook";


export default async function ArticlesPage() {
  // const articleService = getArticleService()
  const articles = await articleService.getMany()

  return (
    <ArticleList articles={articles} />
  )
}