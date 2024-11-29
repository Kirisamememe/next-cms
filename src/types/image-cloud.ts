import { ImageFormat } from "cloudinary"

export type CloudinaryResponse = {
  resources: CloudinaryResource[]
}

export type CloudinaryResource = {
  public_id: string,
  asset_id: string,
  format: ImageFormat,
  version: number,
  resource_type: 'image',
  created_at: Date,
  bytes: number,
  width: number,
  height: number,
  folder: string,
  secure_url: 'https://res.cloudinary.com/dvs51igrz/image/upload/v1695504140/weeqqbsocd5nliyduluu.jpg'
}

export type CloudinaryErrorResponse = {
  error: {
    message: string
  }
}

export type CloudinaryFolders = {
  folders: {
    name: string
    path: string
    external_id: string
  }[]
}

export type CloudinaryApiResponse<T> = {
  data?: T
  error?: {
    message: string
  }
}