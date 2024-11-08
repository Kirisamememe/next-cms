import { articleService } from "@/services/article-service";
import { ArticleList } from "../../_components/article-list";

export default async function ArchivedArticlePage() {
  const articles = await articleService.getArticles('archive')

  return <ArticleList articles={articles} />
}