import { fetchArchives } from "../../_actions/fetch";
import { ArticleList } from "../../_components/article-list";

export default async function ArchivedArticlePage() {
  const articles = await fetchArchives()

  return <ArticleList articles={articles} />
}