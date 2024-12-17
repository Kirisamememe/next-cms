import { Flexbox } from "@/components/ui/flexbox";
import { JsonContentGrid } from "../../_components/json-content-grid";
import { Filter, idSchema } from "@/types";
import { jsonContentService } from "@/di/services";
import { notFound } from "next/navigation";
import { sortContents } from "@/lib";
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
  const categoryId = category ? idSchema.parse(Number(category)) : null
  const searchQuery = search?.toString() || ''

  const data = await jsonContentService.getMany(filter)
  const filteredJsonContent = sortContents(data, sortOpt).filter((jsonContent) => (!categoryId || jsonContent.categoryId === categoryId) && (
    JSON.stringify(jsonContent.jsonAtom.content).toLowerCase().includes(searchQuery.toLowerCase())
    || jsonContent.jsonAtom.title?.toLowerCase().includes(searchQuery.toLowerCase())
    || jsonContent.jsonAtom.description?.toLowerCase().includes(searchQuery.toLowerCase())))

  return (
    <Flexbox gap={4} className="appear shrink-0 h-full">
      <JsonContentToolbar />
      <Suspense key={searchQuery + categoryId + sortOpt} fallback={<CircleSpinLoading />}>
        <JsonContentGrid jsonContents={filteredJsonContent} />
      </Suspense>
    </Flexbox>
  )
}