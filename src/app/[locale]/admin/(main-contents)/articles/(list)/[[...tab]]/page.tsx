import { articleCategoryService, articleService } from "@/di/services";
import { ArticleList } from "../../_components/article-list";
import { Filter, idSchema } from "@/types";
import { notFound } from "next/navigation";
import { sortContents } from "@/lib";
import { ToolBar } from "../../_components/toolbar";

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

  const { sort, search, category } = await searchParams

  const categoryId = category ? idSchema.parse(Number(category)) : null
  const searchQuery = search?.toString() || ''
  const sortOpt = sort !== 'asc' ? 'desc' : 'asc'

  const categories = await articleCategoryService.fetchMany()
  const articles = await articleService.getMany(filter)
  const filteredArticles = sortContents(articles, sortOpt).filter((article) => (!categoryId || article.categoryId === categoryId) && (
    article.atom.body.toLowerCase().includes(searchQuery.toLowerCase())
    || article.atom.title?.toLowerCase().includes(searchQuery.toLowerCase())))

  return (
    <>
      <ToolBar categories={categories} />
      <ArticleList articles={filteredArticles} />
    </>
  )
}