export const TYPES = {
  // Repositories
  AccessTokenRepository: Symbol.for('AccessTokenRepository'),
  AllowedEmailRepository: Symbol.for('AllowedEmailRepository'),
  ApiRepository: Symbol.for('ApiRepository'),
  ArticleRepository: Symbol.for('ArticleRepository'),
  ArticleAtomsRepository: Symbol.for('ArticleAtomsRepository'),
  ImageUrlRepository: Symbol.for('ImageUrlRepository'),
  MediaFolderRepository: Symbol.for('MediaFolderRepository'),
  UserRepository: Symbol.for('UserRepository'),
  JsonContentRepository: Symbol.for('JsonContentRepository'),
  JsonAtomRepository: Symbol.for('JsonAtomRepository'),

  // Services
  AccessTokenService: Symbol.for('AccessTokenService'),
  AllowedEmailService: Symbol.for('AllowedEmailService'),
  ApiService: Symbol.for('ApiService'),
  ArticleService: Symbol.for('ArticleService'),
  ImageUrlService: Symbol.for('ImageUrlService'),
  MediaFolderService: Symbol.for('MediaFolderService'),
  UserService: Symbol.for('UserService'),
  JsonContentService: Symbol.for('JsonContentService')
} as const