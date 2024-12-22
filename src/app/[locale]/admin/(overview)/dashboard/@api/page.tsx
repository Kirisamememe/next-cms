import { apiService } from "@/di/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PiIcon as Api } from 'lucide-react'
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";


export default async function DashboardPage() {
  const apis = await apiService.getMany()

  return (
    <Card className="col-span-6 @[54rem]:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          API一覧
        </CardTitle>
        <Api className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-fit @[54rem]:h-72 w-full rounded-md">
          {apis.map((api, index) => (
            <div key={index} className="flex items-center space-x-4 py-2">
              <div className="flex-shrink-0">
                <Api className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {api.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  ステータス: アクティブ
                </p>
              </div>
              <Badge variant="outline">v1.0</Badge>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}