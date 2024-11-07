'use server'

import { articleService } from "@/services/article-service"

async function fetchById(id: number) {
  return await articleService.findById(id)
}

async function fetchMany() {
  return await articleService.findArticles()
}

async function fetchDrafts() {
  return await articleService.findArticles('draft')
}

async function fetchPublications() {
  return await articleService.findArticles('publish')
}

async function fetchArchives() {
  return await articleService.findArticles('archive')
}

export {
  fetchById,
  fetchMany,
  fetchDrafts,
  fetchPublications,
  fetchArchives,
}

