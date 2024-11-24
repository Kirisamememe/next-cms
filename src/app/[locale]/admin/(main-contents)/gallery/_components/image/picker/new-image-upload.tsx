'use client'

import { FlexColumn, FlexRow } from "@/components/ui/flexbox"
import { useNewImageContext } from "../new-image-provider"
import { Button } from "@/components/ui/button"
import { ImagePlus, ImageUp, X } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input"
import { checkOversize, cn } from "@/lib/utils"
import { useGalleryContext } from "../../gallery-provider"
import { LabelText } from "@/components/ui/typography"
import { useUploadImage } from "../../../_hooks/use-upload-image"
import { ImageForUpload } from "./new-image-upload-item"


export function NewImageUpload() {
  const t = useTranslations()

  const { filesDragging } = useGalleryContext()
  const { files, setFiles } = useNewImageContext()
  const { uploadImage } = useUploadImage()

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

      await uploadImage(acceptedFile, url, abortController)
    }))

  }, [files, setFiles, uploadImage])


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: true
  })


  const clearSelection = () => {
    files.forEach((file) => URL.revokeObjectURL(file.url))
    setFiles([])
  }


  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.url))
  }, [files])


  useEffect(() => {
    return () => setFiles([])
  }, [setFiles])


  return (
    <>
      <div {...getRootProps()}
        className={cn(
          "absolute top-0 left-0 w-full h-full pointer-events-none z-[100] rounded-lg",
          filesDragging && "pointer-events-auto bg-background/80 outline outline-blue-600 outline-2",
          isDragActive && "outline-4 bg-blue-950/90"
        )}>
        <Input
          {...getInputProps()}
        />
        {filesDragging && (
          <FlexColumn center className="w-full h-full">
            <LabelText size={20} color='foreground' weight={600} className={"pointer-events-none"}>
              {t('gallery.imageUrl.imagePicker.drag&drop')}
            </LabelText>
          </FlexColumn>
        )}
      </div>

      <div className={cn(
        "absolute bottom-2 left-2 flex flex-col gap-2 z-50",
        !!files.length ? "w-[calc(100%-1rem)] h-[calc(100%-14rem)]" : "w-fit"
      )}>

        {!!files.length &&
          <FlexColumn gap={2}
            className={cn("p-2 bg-muted/70 backdrop-blur-md rounded-lg h-full")}>

            <div className="overflow-y-scroll rounded-md">
              <FlexColumn gap={2} className="rounded-sm overflow-hidden">
                {files.map((file) => (
                  <ImageForUpload key={file.url} file={file} setFiles={setFiles} />
                ))}
                <div {...getRootProps()} >
                  <Input
                    {...getInputProps()}
                  />
                  <Button
                    variant={'secondary'}
                    className="w-full h-10 bg-muted/50"
                  >
                    <ImagePlus size={20} />
                  </Button>
                </div>
              </FlexColumn>
            </div>

          </FlexColumn>
        }

        <FlexRow className="w-fit bg-muted/50 backdrop-blur-md rounded-full shrink-0">
          {!files.length ?
            <div {...getRootProps()}>
              <Input
                {...getInputProps()}
              />
              <Button
                size={'icon'} variant={'ghost'}
                className="rounded-full hover:bg-foreground hover:text-background"
              >
                <ImageUp size={20} />
              </Button>
            </div> :
            <Button
              size={'icon'} variant={'ghost'}
              onClick={clearSelection}
              className="rounded-full"
            >
              <X size={20} />
            </Button>
          }
        </FlexRow>
      </div>
    </>
  )
}

