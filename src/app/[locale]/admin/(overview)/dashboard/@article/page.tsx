import { articleCategoryService, articleService } from "@/di/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";


export default async function Page() {
  const articleCount = await articleService.getCount()
  const articleCategories = await articleCategoryService.fetchMany()

  return (
    <Card className="col-span-6 @[64rem]:col-span-2 h-48 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">記事</CardTitle>
        <FileText className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="text-2xl font-bold mb-2">
          {articleCount}
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {articleCategories.map((category, index) => (
            <Badge key={index} variant="secondary">{category.name}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}