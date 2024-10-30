import { Flexbox } from "@/components/ui/flexbox";
import ArticleList from "./components/article-list";

export default function ArticlesPage() { 

  return (
    <Flexbox gap={6} className="appear justify-stretch">
      <ArticleList />
    </Flexbox>
  )
}