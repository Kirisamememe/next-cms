import { articleService } from "@/di/services";
import { ArticleList } from "../../_components/article-list";
import { Filter } from "@/types";
import { notFound } from "next/navigation";
import { sortContents } from "@/lib";

type Props = {
  params: Promise<{ tab?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ArticlesPage({ params, searchParams }: Props) {
  const { tab } = await params
  if (tab && tab?.length > 1) {
    notFound()
  }

  let filter: Filter

  if (!tab) {
    filter = 'all'
  } else if (tab[0] === 'draft' || tab[0] === 'published' || tab[0] === 'archive') {
    filter = tab[0]
  } else {
    notFound()
  }

  const { sort } = await searchParams

  const sortOpt = sort !== 'asc' ? 'desc' : 'asc'

  const articles = await articleService.getMany(filter)
  const sorted = sortContents(articles, sortOpt)

  return (
    <ArticleList articles={sorted} />
  )
}