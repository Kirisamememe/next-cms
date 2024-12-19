import { NewImageFormTabsContainer } from "./new-image-form-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NewSingleImage } from "./new-single-image";
import { NewMultipleImages } from "./new-multiple-images";
import { useTranslations } from "next-intl";
import { LabelText } from "@/components/ui/typography";

export function NewImageDialog() {
  const t = useTranslations()

  return (
    <NewImageFormTabsContainer>

      <TabsList className="bg-transparent sm:w-fit gap-6 px-0 sm:px-0 lg:px-0 [&>button]:text-lg [&>button]:font-semibold [&>button]:rounded-none [&>button]:h-12">
        <TabsTrigger value="single" className="px-0 sm:px-0 lg:px-0 data-[state=active]:shadow-[0_2px_0_0_hsl(var(--foreground))]">
          {t('gallery.imageUrl.form.singleUrl')}
        </TabsTrigger>
        <TabsTrigger value="multiple" className="px-0 sm:px-0 lg:px-0 data-[state=active]:shadow-[0_2px_0_0_hsl(var(--foreground))]">
          {t('gallery.imageUrl.form.multipleUrls')}
        </TabsTrigger>
      </TabsList>

      <LabelText size={14} height={1.2} mt={2}>
        {t('gallery.imageUrl.description')}
      </LabelText>

      <TabsContent value="single" className="flex-grow">
        <NewSingleImage />
      </TabsContent>

      <TabsContent value="multiple" className="flex-grow">
        <NewMultipleImages />
      </TabsContent>

    </NewImageFormTabsContainer>
  )
}