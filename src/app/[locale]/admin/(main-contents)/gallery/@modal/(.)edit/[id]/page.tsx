import GalleryEditPage from "../../../edit/[id]/page";

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ params, searchParams }: Props) {
  return (
    <GalleryEditPage params={params} searchParams={searchParams} />
  )
}