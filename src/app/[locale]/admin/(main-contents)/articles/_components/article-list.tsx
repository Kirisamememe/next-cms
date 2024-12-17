import { ArticleCard } from "./article-card";
import { ArticleForClient } from "@/types";
import { GridColumn } from "@/components/ui/grid";
import { useTranslations } from "next-intl";
import { NoContentFound } from "../../../../../../components/no-article-found";


type Props = {
  articles: ArticleForClient[]
}

export function ArticleList({ articles }: Props) {
  const t = useTranslations()

  return (
    <>
      <GridColumn className="appear @[105rem]:grid-cols-2 gap-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </GridColumn>
      {articles.length === 0 &&
        <NoContentFound text={t('article.noArticles')} />
      }
    </>
  )
}


