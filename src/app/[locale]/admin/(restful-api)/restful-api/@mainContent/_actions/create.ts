import { getSession } from "@/lib/getSession"
import { apiService } from "@/services/api-service"
import { revalidatePath } from "next/cache"

export async function createMainContentApi(name: string) {
  const { operatorId } = await getSession()
  const res = await apiService.createMainApi(
    operatorId,
    {
      name: name,
      path: `/api/${name}`
    }
  )
  revalidatePath('/admin/restful-api')
  return res
}