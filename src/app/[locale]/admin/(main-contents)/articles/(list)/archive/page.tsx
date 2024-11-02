import { prisma } from "@/lib/prisma";
import { ArticleList } from "../../components/article-list";

export default async function ArchivedArticlePage() {
  const articles = await prisma.article.findMany({
    where: {
      archived_at: { not: null }
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

  return <ArticleList articles={articles} />
}