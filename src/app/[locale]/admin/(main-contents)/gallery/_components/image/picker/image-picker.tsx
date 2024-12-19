import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImagePickerCloudinary } from "./image-picker-cloudinary"
import { cn } from "@/lib"
import { Suspense } from "react"
import { CircleSpinLoading } from "@/components/circle-spin-loading"

type Props = {
  expanded: boolean
}

export async function ImagePicker({ expanded }: Props) {
  if (!expanded) return null

  return (
    <Tabs
      defaultValue="cloudinary"
      className={cn(
        "relative flex-grow rounded-lg transition-all w-80 ml-5",
      )}>
      <div className="absolute inset-0 w-full h-10 p-1">
        <TabsList className="sticky top-1 bg-muted/70 z-[51] backdrop-blur-md sm:w-full">
          <TabsTrigger value="cloudinary" className="sm:w-full">
            Cloudinary
          </TabsTrigger>
          <TabsTrigger value="vercel" className="sm:w-full" disabled>
            Vercel
          </TabsTrigger>
          <TabsTrigger value="sm.ms" className="sm:w-full" disabled>
            SM.MS
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="cloudinary" className="relative h-full mt-0">
        <Suspense key={expanded.toString()} fallback={<CircleSpinLoading />}>
          <ImagePickerCloudinary />
        </Suspense>
      </TabsContent>
      <TabsContent value="vercel">
      </TabsContent>
      <TabsContent value="sm.ms">
      </TabsContent>
    </Tabs>
  )
}