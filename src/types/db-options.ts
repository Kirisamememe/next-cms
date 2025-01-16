export type FindManyOptions = {
  orderBy?: {
    column: string,
    nullable: boolean,
    order?: 'desc' | 'asc',
  }[],
  orderby?: 'createdAt' | 'updatedAt',
  nullable?: boolean,
  sort?: 'asc' | 'desc',
  take?: number,
  skip?: number,
  searchStr?: string,
  editorsInfo?: boolean,
  categoryId?: number
}

export type Filter = 'all' | 'draft' | 'published' | 'archive'