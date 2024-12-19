'use client'

import { toast } from "@/hooks/use-toast"
import { useDropzone } from "react-dropzone"
import { JsonPreview } from "../json-preview"
import { Heading } from "@/components/ui/typography"
import { cn } from "@/lib"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useTranslations } from "next-intl"


type Props = {
  onValueChange: (value: any) => void
  value: any
}

export const JsonFileUploader = ({ onValueChange, value }: Props) => {
  const notEmpty = !!Object.entries(value).length

  const t = useTranslations()

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const jsonObject = JSON.parse(reader.result as string)
        onValueChange(jsonObject)
      } catch (error) {
        toast({
          title: 'Invalid JSON file',
          description: `Please select a valid JSON file. ${(error as Error).message}`,
          variant: 'destructive'
        })
        return
      }
    }
    reader.readAsText(file)
  }

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': []
    },
    noClick: true,
    multiple: false
  })

  return (
    <div {...getRootProps()}
      className={cn(
        "group relative flex h-full bg-muted/50 rounded-lg py-2",
        isDragActive && "outline outline-4 outline-blue-600 bg-blue-600/10"
      )}>
      <input {...getInputProps()} />
      <Button
        type="button"
        onClick={open}
        variant={'outline'} size={'icon'}
        className={cn(
          "absolute z-50 bg-transparent",
          notEmpty ? "top-3 right-3 size-9" : "size-14 top-[calc(50%-3rem)] left-1/2 -translate-x-1/2 -translate-y-1/2"
        )}>
        <Upload size={notEmpty ? 16 : 32} />
      </Button>
      <Heading weight={500} className={cn(
        "hidden absolute z-20 text-center whitespace-pre-line",
        (!notEmpty || isDragActive) && "block top-[calc(50%+1rem)] left-1/2 -translate-x-1/2 -translate-y-1/2"
      )}>
        {isDragActive
          ? t('jsonContent.form.dnd.active')
          : t('jsonContent.form.dnd.inactive')}
      </Heading>
      {notEmpty && (
        <div className="overflow-scroll">
          <JsonPreview initData={value} />
        </div>
      )}
    </div>
  )
}