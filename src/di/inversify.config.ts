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

// Services
container.bind<IArticleService>(TYPES.ArticleService).to(ArticleService)
container.bind<IImageUrlService>(TYPES.ImageUrlService).to(ImageUrlService)
container.bind<IMediaFolderService>(TYPES.MediaFolderService).to(MediaFolderService)
container.bind<IUserService>(TYPES.UserService).to(UserService)
container.bind<IAllowedEmailService>(TYPES.AllowedEmailService).to(AllowedEmailService)
container.bind<IAccessTokenService>(TYPES.AccessTokenService).to(AccessTokenService)
container.bind<IApiService>(TYPES.ApiService).to(ApiService)



export { container }