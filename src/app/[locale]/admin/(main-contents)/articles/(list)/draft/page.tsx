import { articleService } from "@/di/services";
import { ArticleList } from "../../_components/article-list";


export default async function DraftArticlePage() {
  const articles = await articleService.getManyDraft()

  return (
    <ArticleList articles={articles} />
  )
}