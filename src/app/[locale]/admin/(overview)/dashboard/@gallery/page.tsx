import { imageUrlService, mediaFolderService } from "@/di/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Images } from "lucide-react";


export default async function DashboardPage() {
  const imageCount = await imageUrlService.getCount()
  const folderCount = await mediaFolderService.getCount()

  return (
    <Card className="col-span-6 @[64rem]:col-span-2 h-48 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">ギャラリー</CardTitle>
        <Images className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="text-2xl font-bold">{imageCount}</div>
        <p className="text-xs text-muted-foreground mt-auto">
          画像数: {imageCount}, フォルダー数: {folderCount}
        </p>
      </CardContent>
    </Card>
  )
}