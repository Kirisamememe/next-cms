import { idSchema } from "@/types";
import { notFound } from "next/navigation";
import { jsonContentService } from "@/di/services";
import { EditJsonContent } from "../../../_components/form/edit-json-content";

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function EditJsonPage({ params }: Props) {
  const { id } = await params

  const parseId = await idSchema.safeParseAsync(Number(id))
  if (parseId.error) {
    notFound()
  }

  const data = await jsonContentService.getById(parseId.data)
  if (!data) {
    notFound()
  }

  return (
    <EditJsonContent jsonContent={data} />
  )
}