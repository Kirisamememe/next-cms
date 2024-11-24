'use client'

import { CloudinaryApiResponse, CloudinaryErrorResponse, CloudinaryResource } from "@/types/image";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useMemo } from "react";

export const useBlobStorage = () => {

  const cloudinaryApi = useMemo(() => {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL,
      timeout: 120000,
      timeoutErrorMessage: 'Upload timed out'
    })

    return axiosInstance
  }, [])

  const uploadToCloudinary = useCallback(async (
    file: File,
    abortController: AbortController,
    onProgress?: (progress: number) => void,
  ): Promise<CloudinaryApiResponse<CloudinaryResource>> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)


    return cloudinaryApi.post('', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      signal: abortController.signal,
      onUploadProgress: (progressEvent) => {
        if (!onProgress) return

        const total = progressEvent.total ?? 0
        if (total === 0) return

        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / total
        )

        onProgress(percentCompleted)
      }
    })
      .then((response: AxiosResponse<CloudinaryResource>) => ({
        data: response.data
      }))
      .catch((err: AxiosError<CloudinaryErrorResponse>) => ({
        error: {
          message: err.response?.data.error.message || err.message || 'Unknown Error'
        }
      }))
  }, [cloudinaryApi])

  return {
    uploadToCloudinary
  }
}