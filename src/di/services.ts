import "reflect-metadata";
import { container } from '@/di/inversify.config'
import { TYPES } from '@/di/types'
import { IAccessTokenService, IAllowedEmailService, IApiService, IArticleService, IImageUrlService, IJsonContentService, IMediaFolderService, IUserService } from '../services'

const articleService = container.get<IArticleService>(TYPES.ArticleService)
const imageUrlService = container.get<IImageUrlService>(TYPES.ImageUrlService)
const mediaFolderService = container.get<IMediaFolderService>(TYPES.MediaFolderService)
const userService = container.get<IUserService>(TYPES.UserService)
const allowedEmailService = container.get<IAllowedEmailService>(TYPES.AllowedEmailService)
const accessTokenService = container.get<IAccessTokenService>(TYPES.AccessTokenService)
const apiService = container.get<IApiService>(TYPES.ApiService)
const jsonContentService = container.get<IJsonContentService>(TYPES.JsonContentService)


export {
  articleService,
  imageUrlService,
  mediaFolderService,
  userService,
  allowedEmailService,
  accessTokenService,
  apiService,
  jsonContentService
}