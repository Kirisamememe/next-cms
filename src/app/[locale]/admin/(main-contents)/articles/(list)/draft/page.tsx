import { articleService } from "@/di/services";
import { ArticleList } from "../../_components/article-list";
// import { getArticleService } from "@/di/hook";

export default async function DraftArticlePage() {
  const articles = await articleService.getMany('draft')

  return (
    <ArticleList articles={articles} />
  )
}