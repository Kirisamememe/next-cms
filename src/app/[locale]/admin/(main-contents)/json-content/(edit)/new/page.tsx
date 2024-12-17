import { jsonContentCategoryService } from "@/di/services";
import { NewJsonContent } from "../../_components/form/new-json-content";

export default async function NewJsonPage() {
  const categories = await jsonContentCategoryService.fetchMany()

  return (
    <NewJsonContent categories={categories} />
  )
}