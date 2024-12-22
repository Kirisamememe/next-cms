import { jsonContentCategoryService, jsonContentService } from "@/di/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";


export default async function DashboardPage() {
  const jsonCount = await jsonContentService.getCount()
  const jsonCategories = await jsonContentCategoryService.fetchMany()

  return (
    <Card className="col-span-6 @[64rem]:col-span-2 h-48 flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">JSONコンテンツ</CardTitle>
        <Database className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="text-2xl font-bold mb-2">{jsonCount}</div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {jsonCategories.map((category, index) => (
            <Badge key={index} variant="secondary">{category.name}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}