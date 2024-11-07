import { fetchDrafts } from "../../_actions/fetch";
import { ArticleList } from "../../_components/article-list";

export default async function DraftArticlePage() {
  const articles = await fetchDrafts()

  return (
    <ArticleList articles={articles} />
  )
}