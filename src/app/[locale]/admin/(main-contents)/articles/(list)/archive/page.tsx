import { articleService } from "@/di/services";
import { ArticleList } from "../../_components/article-list";


export default async function ArchivedArticlePage() {
  const articles = await articleService.getManyArchived()

  return <ArticleList articles={articles} />
}