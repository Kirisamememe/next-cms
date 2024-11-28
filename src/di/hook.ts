import "reflect-metadata";
import { container } from "./inversify.config";
import { ArticleService, ImageUrlService, MediaFolderService } from "@/services";
// import { TYPES } from "./types";

export function getArticleService() {
  return container.get<ArticleService>(ArticleService)
}

export function getImageUrlService() {
  return container.get<ImageUrlService>(ImageUrlService)
}

export function getMediaFolderService() {
  return container.get<MediaFolderService>(MediaFolderService)
}