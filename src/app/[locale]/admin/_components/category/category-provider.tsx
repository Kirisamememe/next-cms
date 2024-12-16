'use client'

import { ContentCategory } from "@/types"
import { createContext, use, useMemo } from "react"

type CategoryContextType = {
  categories: ContentCategory[]
}


const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

type Props = {
  children: React.ReactNode
  categories: ContentCategory[]
}

export function CategoryProvider({ children, categories }: Props) {

  const value = useMemo(() => ({
    categories,
  }), [categories])

  return (
    <CategoryContext value={value}>
      {children}
    </CategoryContext>
  )
}


export function useCategory() {
  const context = use(CategoryContext)
  if (!context) {
    throw new Error("useCategory must be used within an CategoryProvider")
  }
  return context
}