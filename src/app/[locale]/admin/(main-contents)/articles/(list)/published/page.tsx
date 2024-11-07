import { fetchPublications } from "../../_actions/fetch";
import { ArticleList } from "../../_components/article-list";

export default async function PublishedArticlePage() {
  const articles = await fetchPublications()

  return (
    <ArticleList articles={articles} />
  )
}