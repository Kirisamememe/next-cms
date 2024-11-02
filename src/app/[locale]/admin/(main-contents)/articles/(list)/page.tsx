import { ArticleList } from "../components/article-list";
import { prisma } from "@/lib/prisma";


export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    where: {
      archived_at: null
    },
    include: {
      article_atoms: {
        include: {
          author: true
        },
        orderBy: [{
          published_at: {
            sort: "desc",
            nulls: "last"
          }
        }, {
          created_at: "desc"
        }]
      },
      author: true,
      last_edited: true
    },
    orderBy: {
      created_at: "desc"
    }
  })

  return (
    <ArticleList articles={articles} />
  )
}