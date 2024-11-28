'use client'

import { checkOversize, cn } from "@/lib"
import { useGalleryContext } from "./gallery-provider"
import { useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Input } from "@/components/ui/input"
import { FlexColumn } from "@/components/ui/flexbox"
import { LabelText } from "@/components/ui/typography"
import { useTranslations } from "next-intl"
import { useUploadImage } from "../_hooks/use-upload-image"
import { createImageUrl } from "../_actions/create"
import { useParams } from "next/navigation"

export function DefaultUploader() {
  const t = useTranslations()

  const { filesDragging, files, setFiles } = useGalleryContext()
  const { uploadImage } = useUploadImage({ setFiles })

  const { folders } = useParams<{ folders?: string[] }>()
  const pathArr = (folders && folders.length) ? ['.', ...folders] : ['.']
  const folderPath = decodeURIComponent(pathArr.join('/'))


  const clearSelection = useCallback(() => {
    files.forEach((file) => URL.revokeObjectURL(file.url))
    setFiles([])
  }, [files, setFiles])


  /**
   * 画像マウント時の操作
   */
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return

    Promise.all(acceptedFiles.map(async (acceptedFile) => {
      if (files.map((file) => file.file.name).includes(acceptedFile.name)) return

      const abortController = new AbortController()
      const url = URL.createObjectURL(acceptedFile)
      const isOversize = checkOversize(acceptedFile.size)

      setFiles((prev) => [
        ...prev, {
          url,
          file: acceptedFile,
          uploadingState: {
            progress: 1,
            ...(isOversize && { error: { message: 'Image size must be less than 10MB' } })
          },
          abortController
        }
      ])

      if (isOversize) {
        return
      }

      const res = await uploadImage(acceptedFile, url, abortController)
      if (!res) {
        return {
          error: {
            message: 'Failed'
          }
        }
      }

      await createImageUrl({ name: res.asset_id, url: res.secure_url, folderPath })
        .then(() => {
          setFiles((fs) => fs.filter((f) => f.url !== url))
        })

    })).finally(() => {
      clearSelection()
    })

  }, [clearSelection, files, folderPath, setFiles, uploadImage])


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: true
  })


  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.url))
  }, [files])


  useEffect(() => {
    return () => setFiles([])
  }, [setFiles])

  return (
    <>
      <div className={"absolute top-0 left-0 w-full h-full pointer-events-none z-50"}>
        <div {...getRootProps()}
          className={cn(
            "sticky top-0 w-full h-screen pointer-events-none rounded-md",
            filesDragging && "pointer-events-auto",
            isDragActive && "outline outline-blue-600 outline-4 -outline-offset-4 bg-blue-950/90"
          )}>
          <Input
            {...getInputProps()}
          />
          {isDragActive && (
            <FlexColumn center className="w-full h-full">
              <LabelText size={20} color='foreground' weight={600} className={"pointer-events-none"}>
                {t('gallery.imageUrl.imagePicker.drag&drop')}
              </LabelText>
            </FlexColumn>
          )}
        </div>
      </div>
    </>
  )
}