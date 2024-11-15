import { articleService } from "@/services/article-service";
import { ArticleList } from "../../_components/article-list";

export default async function PublishedArticlePage() {
  const articles = await articleService.getMany('publish')

  return (
    <ArticleList articles={articles} />
  )
}