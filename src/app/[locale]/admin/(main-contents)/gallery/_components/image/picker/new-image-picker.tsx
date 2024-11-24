import { Flexbox, FlexColumn } from "@/components/ui/flexbox"
import { cloudinaryClient } from "@/lib/cloudinary"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewImagePickerSelectAll } from "./new-image-picker-select-all"
import { NewImageUpload } from "./new-image-upload"
import { NotFoundIllustration } from "@/components/404"
import { Heading } from "@/components/ui/typography"
import { NewImagePickerGrid } from "./new-image-picker-grid"

// const PROVIDERS = ['cloudinary', 'vercel', 'sm.ms']

export async function NewImagePicker() {
  const { data, error } = await cloudinaryClient.fetchAll()
  const urls = data ? data.resources.map((res) => res.secure_url) : []


  return (
    <FlexColumn className="flex-grow relative min-w-80">
      <FlexColumn className="overflow-scroll rounded-lg">
        <Tabs defaultValue="cloudinary" className="">
          <TabsList className="sticky top-1 left-1 bg-muted/70 z-[51] backdrop-blur-md mb-2 sm:w-[calc(100%-0.5rem)]">
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
          <TabsContent value="cloudinary" className="relative">
            {error && (
              <Flexbox center className="m-auto">
                <NotFoundIllustration />
                <Heading size={20}>
                  Not Found
                </Heading>
                <p>Could not find requested resource</p>
              </Flexbox>
            )}
            {!!urls.length &&
              <NewImagePickerGrid urls={urls} />
            }
          </TabsContent>
          <TabsContent value="vercel">
          </TabsContent>
          <TabsContent value="sm.ms">
          </TabsContent>
        </Tabs>
      </FlexColumn>
      {data && <NewImageUpload />}
      {!!urls.length &&
        <NewImagePickerSelectAll urls={urls} />
      }
    </FlexColumn>
  )
}