import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { NewImageFormTabsContainer } from "./new-image-form-tabs";
import { NewImagePicker } from "./picker/new-image-picker";
import { NewImageProvider } from "./new-image-provider";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { imageUrlService } from "@/services/image-url-service";
import { NewSingleImage } from "./new-single-image";
import { NewMultipleImages } from "./new-multiple-images";

export async function NewImageDialog() {
  const t = await getTranslations()
  const imageUrls = await imageUrlService.fetchAllUrls()

  return (
    <NewImageProvider imageUrls={imageUrls} >
      <Dialog>

        <DialogTrigger asChild>
          <Button variant={'outline'} className="">
            <ImagePlus size={16} />
            {t('gallery.imageUrl.btn')}
          </Button>
        </DialogTrigger>

        <DialogContent xHidden className="flex gap-6 max-w-3xl h-[35rem] sm:rounded-3xl lg:rounded-3xl">
          <NewImagePicker />

          <NewImageFormTabsContainer>
            <TabsList className="bg-transparent sm:w-fit gap-6 px-0 sm:px-0 lg:px-0 [&>button]:text-lg [&>button]:font-semibold [&>button]:rounded-none [&>button]:h-12">
              <TabsTrigger value="single" className="px-0 sm:px-0 lg:px-0 data-[state=active]:shadow-[0_2px_0_0_hsl(var(--foreground))]">
                {t('gallery.imageUrl.form.singleUrl')}
              </TabsTrigger>
              <TabsTrigger value="multiple" className="px-0 sm:px-0 lg:px-0 data-[state=active]:shadow-[0_2px_0_0_hsl(var(--foreground))]">
                {t('gallery.imageUrl.form.multipleUrls')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="single">
              <DialogHeader>
                <DialogTitle hidden>
                  {t('gallery.imageUrl.title')}
                </DialogTitle>
                <DialogDescription className="mb-4">
                  {t('gallery.imageUrl.description')}
                </DialogDescription>
              </DialogHeader>
              <NewSingleImage />
            </TabsContent>

            <TabsContent value="multiple">
              <DialogTitle hidden>
                {t('gallery.imageUrl.title')}
              </DialogTitle>
              <DialogDescription className="mb-4">
                {t('gallery.imageUrl.description')}
              </DialogDescription>
              <NewMultipleImages />
            </TabsContent>

          </NewImageFormTabsContainer>
        </DialogContent>
      </Dialog>
    </NewImageProvider>
  )
}