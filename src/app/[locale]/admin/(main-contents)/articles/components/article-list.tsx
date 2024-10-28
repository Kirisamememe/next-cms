import { prisma } from "@/prisma";
import { ArticleCard } from "./article-card";
import { FlexColumn } from "@/components/ui/flexbox";

export default async function ArticleList() {
  const articles = await prisma.article.findMany({
    include: {
      article_atoms: true
    }
  })

  return (
    <FlexColumn gap={3}>
      {articles.length &&
        articles.map((article, index) => {
          const title = article.article_atoms[0].title || extractTitleFromMarkdown(article.article_atoms[0].body)
          const summary = article.article_atoms[0].summary || extractFirstNCharacters(article.article_atoms[0].body)

          return <ArticleCard key={index} id={article.id} title={title} summary={summary} />
        })
      }
    </FlexColumn>
  )
}

function extractFirstNCharacters(text: string, n: number = 80): string {
  const lines = text.split('\n');
  const contentLines = lines.filter(line => !line.trim().startsWith('#'));
  const content = contentLines.join(' ').replace(/\s+/g, ' ').trim();
  return content.length > n ? content.slice(0, n) + '...' : content;
};

function extractTitleFromMarkdown(markdown: string): string {
  const lines = markdown.split('\n');
  for (const line of lines) {
    if (line.startsWith('# ')) return line.slice(2).trim();
    if (line.startsWith('## ')) return line.slice(3).trim();
    if (line.startsWith('### ')) return line.slice(4).trim();
  }
  return markdown.slice(0, 15) + '...';
};