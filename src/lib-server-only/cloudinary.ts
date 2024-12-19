import 'server-only'
import { v2 as cloudinary, ImageFormat } from 'cloudinary';
import { CloudinaryApiResponse, CloudinaryResponse } from '@/types';

export class Cloudinary {
  static instance: Cloudinary

  static getInstance() {
    if (!Cloudinary.instance) {
      Cloudinary.instance = new Cloudinary()
    }
    return Cloudinary.instance
  }

  private client = cloudinary

  constructor() {
    this.client.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }


  async upload(path: string) {
    return await this.client.uploader
      .upload(path, {
        folder: '',
        resource_type: 'image'
      })
      .catch((error) => {
        console.log(error);
      })
  }


  async fetch(id: string, options?: {
    fetch_format?: ImageFormat,
    quality?: number | string,
  }) {
    const res = await this.client.api.resources_by_asset_ids(id, options)
    if (!res.resources[0]) {
      return ''
    }
    return res.resources[0].secure_url
  }


  async fetchAll(): Promise<CloudinaryApiResponse<CloudinaryResponse>> {
    return await this.client.api.resources({
      max_results: 200,
    }).then((res: CloudinaryResponse) => ({
      isSuccess: true as const,
      data: res
    }))
      .catch((err) => {
        console.log(err)
        return {
          isSuccess: false as const,
          error: {
            message: 'Cloudinary Error'
          }
        }
      })
  }

  async fetchByRootFolders() {
    return await this.client.api.resources({
      max_results: 200
    })
  }

  async fetchByFolders(path: string) {
    return await this.client.api.resources_by_asset_folder(path, {
      max_results: 30
    })
  }

  async getRootFolders() {
    return await this.client.api.root_folders()
  }

  async getSubFolders(path: string) {
    return await this.client.api.sub_folders(path)
  }

  async createFolder() {
    this.client.api.create_folder('')
  }


  async delete(id: string) {
    return await this.client.api.delete_resources([id])
  }

}