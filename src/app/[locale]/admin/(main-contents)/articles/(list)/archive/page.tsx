import { articleService } from "@/di/services";
import { ArticleList } from "../../_components/article-list";
// import { getArticleService } from "@/di/hook";

export default async function ArchivedArticlePage() {
  const articles = await articleService.getMany('archive')

  return <ArticleList articles={articles} />
}