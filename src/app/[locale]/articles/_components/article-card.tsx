import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { extractTitleFromMarkdown } from "@/lib";
import { ArticleListItemForClient } from "@/types";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

type Props = {
  article: ArticleListItemForClient;
}

export function ArticleCard({ article }: Props) {
  const title = article.atom.title || extractTitleFromMarkdown(article.atom.body);
  const summary = article.atom.summary || article.atom.body.slice(0, 150) + "...";

  return (
    <Card className="group hover:border-primary transition-colors duration-200">
      <CardHeader className="space-y-2">
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {title}
        </CardTitle>
        {article.publishedAt && (
          <CardDescription className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            {format(article.publishedAt, "yyyy年MM月dd日", { locale: ja })}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">
          {summary}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{article.author.name}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
