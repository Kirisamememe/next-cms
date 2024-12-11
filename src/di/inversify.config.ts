import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";


// Repository Interfaces
import {
  IArticleAtomsRepository,
  IArticleRepository,
  IImageUrlRepository,
  IMediaFolderRepository,
  IUserRepository,
  IAllowedEmailRepository,
  IAccessTokenRepository,
  IApiRepository,
  IJsonContentRepository,
  IJsonAtomRepository
} from '@/repositories'

// Repository Implementations
import {
  ArticleRepository,
  ArticleAtomsRepository,
  ImageUrlRepository,
  MediaFolderRepository,
  UserRepository,
  AllowedEmailRepository,
  AccessTokenRepository,
  ApiRepository,
  JsonContentRepository,
  JsonAtomRepository
} from '@/repositories'

// Service Interfaces
import {
  IArticleService,
  IImageUrlService,
  IMediaFolderService,
  IUserService,
  IAllowedEmailService,
  IAccessTokenService,
  IApiService,
  IJsonContentService
} from '@/services'


// Service Implementations
import {
  ArticleService,
  ImageUrlService,
  MediaFolderService,
  UserService,
  AllowedEmailService,
  AccessTokenService,
  ApiService,
  JsonContentService
} from '@/services'


const container = new Container()

// Repositories
container.bind<IArticleRepository>(TYPES.ArticleRepository).to(ArticleRepository)
container.bind<IArticleAtomsRepository>(TYPES.ArticleAtomsRepository).to(ArticleAtomsRepository)
container.bind<IImageUrlRepository>(TYPES.ImageUrlRepository).to(ImageUrlRepository)
container.bind<IMediaFolderRepository>(TYPES.MediaFolderRepository).to(MediaFolderRepository)
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)
container.bind<IAllowedEmailRepository>(TYPES.AllowedEmailRepository).to(AllowedEmailRepository)
container.bind<IAccessTokenRepository>(TYPES.AccessTokenRepository).to(AccessTokenRepository)
container.bind<IApiRepository>(TYPES.ApiRepository).to(ApiRepository)
container.bind<IJsonContentRepository>(TYPES.JsonContentRepository).to(JsonContentRepository)
container.bind<IJsonAtomRepository>(TYPES.JsonAtomRepository).to(JsonAtomRepository)

// Services
container.bind<IArticleService>(TYPES.ArticleService).to(ArticleService)
container.bind<IImageUrlService>(TYPES.ImageUrlService).to(ImageUrlService)
container.bind<IMediaFolderService>(TYPES.MediaFolderService).to(MediaFolderService)
container.bind<IUserService>(TYPES.UserService).to(UserService)
container.bind<IAllowedEmailService>(TYPES.AllowedEmailService).to(AllowedEmailService)
container.bind<IAccessTokenService>(TYPES.AccessTokenService).to(AccessTokenService)
container.bind<IApiService>(TYPES.ApiService).to(ApiService)
container.bind<IJsonContentService>(TYPES.JsonContentService).to(JsonContentService)



export { container }