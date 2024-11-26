import { ImageFile } from "../new-image-provider"
import { Button } from "@/components/ui/button"
import { X, CircleAlert, RefreshCcw } from "lucide-react"
import { useTranslations } from "next-intl"
import { Dispatch, SetStateAction, useCallback } from "react"
import { byteToMB, checkOversize, cn } from "@/lib/utils"
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Heading, LabelText } from "@/components/ui/typography"
import { useUploadImage } from "../../../_hooks/use-upload-image"
import { FlexColumn, FlexRow } from "@/components/ui/flexbox"


type Props = {
  file: ImageFile
  setFiles: Dispatch<SetStateAction<ImageFile[]>>
}

export function ImageForUpload({ file, setFiles }: Props) {

  const t = useTranslations()
  const { uploadImage } = useUploadImage({ setFiles })

  /**
   * オーバーサイズの画像を取り除くための関数
   */
  const handleRemove = useCallback(() => {
    URL.revokeObjectURL(file.url)
    setFiles((prev) => prev.filter(f => f.url !== file.url))
  }, [file.url, setFiles])


  /**
   * アップロードを中止する
   */
  const handleAbort = useCallback(() => {
    file.abortController?.abort()
    setFiles((prev) => prev.map((f => f.url === file.url ? { ...f, uploadingState: { progress: 0, error: { message: 'Upload canceled' } } } : f)))
  }, [file.abortController, file.url, setFiles])


  /**
   * アップロードをやり直す
   */
  const handleReupload = useCallback(async () => {
    const abortController = new AbortController
    setFiles((prev) => prev.map((f) => f.url === file.url ? { ...f, abortController, uploadingState: { progress: 0 } } : f))
    await uploadImage(file.file, file.url, abortController)
  }, [file.file, file.url, setFiles, uploadImage])


  return (
    <FlexRow gap={2} className={"relative w-full h-10 items-center "}>

      {/* 画像本体 */}
      <div className="size-10 rounded-sm overflow-hidden shrink-0">
        <AspectRatio ratio={1}>
          <Image
            width={72} height={72}
            src={file.url} alt="Preview" priority
            className={cn(
              "w-full h-full object-cover object-center"
            )} />
        </AspectRatio>
      </div>

      {/* 画像情報 */}
      <FlexColumn>
        <Heading size={14} weight={500} className="truncate whitespace-nowrap mr-3">
          {file.file.name}
        </Heading>
        <LabelText>
          {`${byteToMB(file.file.size)}MB`}
        </LabelText>
      </FlexColumn>

      {/* アボート */}
      {file.uploadingState.progress < 100 && !file.uploadingState.error &&
        <Button
          variant={'secondary'} size={'sm'}
          className="shrink-0 bg-muted/40 backdrop-blur-md rounded-full h-8 text-xs ml-auto"
          onClick={handleAbort}
        >
          {t('common.cancel')}
        </Button>
      }

      {/* オーバーサイズ時のリムーブボタン */}
      {checkOversize(file.file.size) && (
        <Button
          variant={'ghost'} size={'icon'}
          className="shrink-0 bg-muted/40 backdrop-blur-md rounded-full size-8 ml-auto"
          onClick={handleRemove}
        >
          <X size={16} />
        </Button>
      )}

      {/* リトライ */}
      {file.uploadingState.error && !checkOversize(file.file.size) && (
        <Button
          variant={'ghost'} size={'icon'}
          className="shrink-0 bg-muted/40 backdrop-blur-md rounded-full size-8 ml-auto"
          onClick={handleReupload}
        >
          <RefreshCcw size={16} />
        </Button>
      )}

      {/* ステートエリア・画像の上のオーバーレイ */}
      {/* アボートの場合は何も表示しない */}
      {!!file.uploadingState && !file.abortController?.signal.aborted && (
        <FlexColumn center className={cn(
          "absolute top-0 left-0 size-10 z-10 bg-background/40 rounded-sm",
          !!file.uploadingState.error && "bg-destructive/60"
        )}>

          {/* 例外発生 */}
          {file.uploadingState.error && (
            <TooltipProvider delayDuration={50}>
              <Tooltip>
                <TooltipTrigger className="size-6 rounded-full">
                  <CircleAlert size={24} />
                </TooltipTrigger>
                <TooltipContent className={"bg-destructive text-destructive-foreground border-destructive"}>
                  <p>
                    {file.uploadingState.error.message}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {/* アップロード中 */}
          {!!file.uploadingState.progress && file.uploadingState.progress <= 100 && !file.uploadingState.error?.message && (
            <svg className="size-6" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                className="stroke-primary/30"
                strokeWidth="4"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                className="stroke-primary"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 16}`}
                strokeDashoffset={`${2 * Math.PI * 16 * (1 - (file.uploadingState.progress) / 100)}`}
                transform="rotate(-90 16 16)"
              />
            </svg>
          )}

          {/* アップロード成功 */}
          {file.uploadingState.progress === 200 && (
            <svg className="size-6" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                className="stroke-primary"
                strokeWidth="4"
              />
              <path
                d="M11 16L15 20L21 14"
                fill="none"
                className="stroke-primary"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

        </FlexColumn>
      )}
    </FlexRow>
  )
}