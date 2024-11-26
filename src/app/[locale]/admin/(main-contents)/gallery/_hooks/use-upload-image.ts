import { useBlobStorage } from "@/hooks/use-blob-storage"
import { Dispatch, SetStateAction, useCallback } from "react"
import { revalidateGallery } from "../_actions/update"
import { toast } from "@/hooks/use-toast"
import { ImageFile } from "../_components/image/new-image-provider"

type Props = {
  setFiles: Dispatch<SetStateAction<ImageFile[]>>
}

export const useUploadImage = ({ setFiles }: Props) => {
  const { uploadToCloudinary } = useBlobStorage()

  const uploadImage = useCallback(async (
    file: File,
    fileUrl: string,
    abortController: AbortController
  ) => {
    const { data, error } = await uploadToCloudinary(
      file,
      abortController,
      (progress) => {
        setFiles(prev => prev.map((f) =>
          f.url === fileUrl
            ? { ...f, uploadingState: { progress } }
            : f
        ))
      }
    )

    if (error) {
      setFiles(prev => prev.map((f) =>
        f.url === fileUrl
          ? { ...f, uploadingState: { progress: 0, error: { message: error?.message } } }
          : f
      ))
      if (error.message === 'canceled') {
        return
      }
      toast({
        title: error.message,
        variant: 'destructive'
      })
      return
    }

    setFiles(prev => prev.map((f) =>
      f.url === fileUrl
        ? { ...f, uploadingState: { progress: 200 } }
        : f
    ))
    revalidateGallery()
    return data

  }, [setFiles, uploadToCloudinary])

  return {
    uploadImage
  }
}