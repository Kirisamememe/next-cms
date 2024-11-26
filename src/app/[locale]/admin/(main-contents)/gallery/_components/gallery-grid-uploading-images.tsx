'use client'

import { FlexRow } from "@/components/ui/flexbox"
import { useGalleryContext } from "./gallery-provider"
import { GalleryImageItem } from "./image-item"

export function ImageUploading() {
  const { files } = useGalleryContext()

  return files.map((file) => (
    <div key={file.url} className="relative">
      <FlexRow center className="absolute inset-0 w-full h-full bg-background/50 z-20">

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


      </FlexRow>
      <GalleryImageItem url={file.url} />
    </div>
  ))
}