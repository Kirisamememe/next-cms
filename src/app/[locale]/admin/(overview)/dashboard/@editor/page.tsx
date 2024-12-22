import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { userService } from "@/di/services";
import { Users } from "lucide-react";


export default async function DashboardPage() {
  const editors = await userService.getMany()

  return (
    <Card className="col-span-6 @[54rem]:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">現在の編集者</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-fit @[54rem]:h-72 w-full rounded-md">
          {editors.map((editor, index) => (
            <div key={index} className="flex items-center space-x-4 py-2">
              <div className="flex-shrink-0">
                <Avatar>
                  <AvatarImage src={editor.image || ''} />
                  <AvatarFallback>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                      {(editor?.nickname || editor?.name || 'USER').charAt(0)}
                    </div>
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{editor.nickname}</p>
                <p className="text-xs text-muted-foreground">最終アクティブ: 5分前</p>
              </div>
              <Badge variant="secondary">オンライン</Badge>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}