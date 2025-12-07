import { articleService } from "@/di/services";
import { ArticleCard } from "./article-card";
import { GridColumn } from "@/components/ui/grid"


export async function ArticleList() {
  const articles = await articleService.getMany('published')

  return (
    <GridColumn md={3}>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </GridColumn>
  )
}