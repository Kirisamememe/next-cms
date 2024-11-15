import 'server-only'
import { apiRepository } from "@/repositories/api-repository"
import { apiSchema } from '@/types/api-schema'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

class ApiService {

  async getByName(name: string) {
    const data = await apiRepository.findByName(name)
    if (!data) {
      return {
        noData: 'Api not found' as const
      }
    }
    return { data }
  }

  async toggleActive(apiId: number, operatorId: number, state: boolean) {
    const data = await apiRepository.update(apiId, operatorId, { activatedAt: state ? new Date() : null })
    if (!data) {
      return {
        error: 'Api not found' as const
      }
    }
    revalidatePath('/admin/restful-api')
    return { data }
  }


  async getManyForCache() {
    const data = await apiRepository.findManyForCache()
    if (!data.length) {
      return {
        noData: 'Api not found' as const
      }
    }
    return { data }
  }


  async createMainApi(
    operatorId: number,
    values: z.infer<typeof apiSchema>
  ) {
    const data = await apiRepository.create(operatorId, values)
    if (!data) {
      return {
        noData: 'Error' as const
      }
    }
    return { data }
  }
}

export const apiService = new ApiService()