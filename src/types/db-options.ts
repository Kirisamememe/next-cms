export type FindManyOptions = {
  orderBy?: {
    column: string,
    nullable: boolean,
    order?: 'desc' | 'asc',
  }[],
  take?: number,
}

export type Filter = 'all' | 'draft' | 'publish' | 'archive'