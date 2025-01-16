import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { extractTitleFromMarkdown } from "@/lib";
import { ArticleListItemForClient } from "@/types";

type Props = {
  article: ArticleListItemForClient
}

export function ArticleCard({ article }: Props) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {article.atom.title || extractTitleFromMarkdown(article.atom.body)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {article.atom.body}
      </CardContent>
    </Card>
  )
}