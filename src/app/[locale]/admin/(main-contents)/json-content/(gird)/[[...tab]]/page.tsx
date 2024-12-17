import { Flexbox } from "@/components/ui/flexbox";
import { JsonContentGrid } from "../../_components/json-content-grid";
import { Filter } from "@/types";
import { jsonContentService } from "@/di/services";
import { notFound } from "next/navigation";
import { sortContents } from "@/lib";

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

  const { sort } = await searchParams

  const sortOpt = sort !== 'asc' ? 'desc' : 'asc'

  const data = await jsonContentService.getMany(filter)
  const sorted = sortContents(data, sortOpt)

  return (
    <Flexbox gap={4} className="appear shrink-0 h-full">
      <JsonContentGrid jsonContents={sorted} />
    </Flexbox>
  )
}