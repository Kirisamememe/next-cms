import "reflect-metadata";
import { container } from '@/di/inversify.config'
import { TYPES } from '@/di/types'
import { IAccessTokenService, IAllowedEmailService, IApiService, IArticleCategoryService, IArticleService, IImageUrlService, IJsonContentCategoryService, IJsonContentService, IMediaFolderService, IUserService } from '../services'

const articleService = container.get<IArticleService>(TYPES.ArticleService)
const imageUrlService = container.get<IImageUrlService>(TYPES.ImageUrlService)
const mediaFolderService = container.get<IMediaFolderService>(TYPES.MediaFolderService)
const userService = container.get<IUserService>(TYPES.UserService)
const allowedEmailService = container.get<IAllowedEmailService>(TYPES.AllowedEmailService)
const accessTokenService = container.get<IAccessTokenService>(TYPES.AccessTokenService)
const apiService = container.get<IApiService>(TYPES.ApiService)
const jsonContentService = container.get<IJsonContentService>(TYPES.JsonContentService)
const jsonContentCategoryService = container.get<IJsonContentCategoryService>(TYPES.JsonContentCategoryService)
const articleCategoryService = container.get<IArticleCategoryService>(TYPES.ArticleCategoryService)



export {
  articleService,
  imageUrlService,
  mediaFolderService,
  userService,
  allowedEmailService,
  accessTokenService,
  apiService,
  jsonContentService,
  jsonContentCategoryService,
  articleCategoryService
}