import 'server-only'
import { v2 as cloudinary, ImageFormat } from 'cloudinary';

class Cloudinary {

  private client = cloudinary

  constructor() {
    this.client.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
  }


  async upload(id: string, path: string) {
    return await this.client.uploader
      .upload(path, {
        public_id: id,
      })
      .catch((error) => {
        console.log(error);
      });
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


  async fetchAll() {
    return await this.client.api.resources({
      max_results: 200,
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

export const cloudinaryClient = new Cloudinary()