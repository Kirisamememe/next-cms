import { articleService } from "@/di/services";

import { ArticleList } from "../../_components/article-list";

export default async function PublishedArticlePage() {
  const articles = await articleService.getManyPublished()

  return (
    <ArticleList articles={articles} />
  )
}