import { Filter } from "@/types"

export class ContentRepository {
  orderBy(
    options: {
      column: string,
      order?: 'desc' | 'asc',
      nullable?: boolean
    }
  ) {
    const {
      column,
      order = 'desc',
      nullable = false
    } = options || {}

    return (
      nullable
        ? ({ [column]: { sort: order, nulls: "last" } })
        : ({ [column]: order })
    )
  }


  getFilter(filter: Filter) {
    if (filter === 'all') {
      return {
        where: {
          archivedAt: null
        }
      }
    }

    if (filter === 'draft') {
      return {
        where: {
          OR: [
            { publishedAt: null },
            { publishedAt: { gt: new Date() } }
          ],
          archivedAt: null
        }
      }
    }

    if (filter === 'publish') {
      return {
        where: {
          publishedAt: {
            lt: new Date()
          },
          archivedAt: null
        }
      }
    }

    if (filter === 'archive') {
      return {
        where: {
          archivedAt: { not: null }
        }
      }
    }
  }


  authorProperties = {
    select: {
      id: true,
      email: true,
      name: true,
      nickname: true,
      role: true,
      image: true
    }
  }


}