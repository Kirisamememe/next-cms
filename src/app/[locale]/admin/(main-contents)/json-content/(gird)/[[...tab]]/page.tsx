import { Flexbox } from "@/components/ui/flexbox";
import { JsonContentGrid } from "../../_components/json-content-grid";
import { Filter, idSchema } from "@/types";
import { notFound } from "next/navigation";
import { JsonContentToolbar } from "../../_components/json-content-toolbar";
import { Suspense } from "react";
import { CircleSpinLoading } from "@/components/circle-spin-loading";

type Props = {
  params: Promise<{ tab?: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params, searchParams }: Props) {
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

  const sortOpt = sort !== 'asc' ? 'desc' : 'asc'
  const categoryId = category ? idSchema.parse(Number(category)) : undefined
  const searchQuery = search?.toString() || ''


  return (
    <Flexbox gap={4} className="appear shrink-0 h-full">
      <JsonContentToolbar />
      <Suspense key={searchQuery + categoryId + sortOpt} fallback={<CircleSpinLoading />}>
        <JsonContentGrid filter={filter} sortOpt={sortOpt} searchQuery={searchQuery} categoryId={categoryId} />
      </Suspense>
    </Flexbox>
  )
}