import { ArticleList } from "../../_components/article-list";
import { Filter, idSchema, TAKE } from "@/types";
import { notFound } from "next/navigation";
import { ToolBar } from "../../_components/toolbar";
import { Suspense } from "react";
import { CircleSpinLoading } from "@/components/circle-spin-loading";

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

  const { orderby, sort, search, category, take } = await searchParams

  const orderbyParam = orderby !== 'createdAt' ? 'updatedAt' : 'createdAt'
  const sortOpt = sort !== 'asc' ? 'desc' : 'asc'
  const searchQuery = search?.toString() || ''
  const categoryId = category ? idSchema.parse(Number(category)) : undefined
  const takeNumber = take ? Number(take) : TAKE

  return (
    <>
      <ToolBar />
      <Suspense key={orderbyParam + searchQuery + categoryId + sortOpt} fallback={<CircleSpinLoading />}>
        <ArticleList filter={filter} orderby={orderbyParam} sortOpt={sortOpt} searchQuery={searchQuery} categoryId={categoryId} take={takeNumber} />
      </Suspense>
    </>
  )
}