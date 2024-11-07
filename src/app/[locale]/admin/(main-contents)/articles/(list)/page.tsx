import { fetchMany } from "../_actions/fetch";
import { ArticleList } from "../_components/article-list";


export default async function ArticlesPage() {
  const articles = await fetchMany()

  return (
    <ArticleList articles={articles} />
  )
}