import { articleService } from "@/services/article-service";
import { ArticleList } from "../../_components/article-list";

export default async function DraftArticlePage() {
  const articles = await articleService.getMany('draft')

  return (
    <ArticleList articles={articles} />
  )
}