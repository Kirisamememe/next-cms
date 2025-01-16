import { notFound } from "next/navigation"
import { GroupFormProvider } from "./_components/group-form-provider"
import { GridColumn } from "@/components/ui/grid"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { contentGroupService } from "@/di/services"
import { idSchema } from "@/types"

type Props = {
  children: React.ReactNode
  article: React.ReactNode
  json: React.ReactNode
  folder: React.ReactNode
  params: Promise<{ edit: string[] }>
}

export default async function Layout({ article, json, folder, children, params }: Props) {
  const { edit } = await params

  if (
    (edit[0] !== 'edit' || edit.length !== 2) &&
    (edit[0] !== 'new' || edit.length !== 1)
  ) {
    notFound()
  }

  if (edit[0] === 'new') {
    return (
      <GroupFormProvider>
        <ScrollArea className="flex-grow h-[calc(100vh-4rem)] [&>*>div]:h-full">
          <GridColumn p={4} className="appear @[72rem]:grid-cols-2 grid-flow-row gap-4 h-full">
            <div className="grid grid-cols-subgrid row-span-2 gap-4">
              {article}
              {json}
            </div>
            {folder}
          </GridColumn>
          <ScrollBar />
        </ScrollArea>
        {children}
      </GroupFormProvider>
    )
  }

  const parsedId = await idSchema.safeParseAsync(Number(edit[1]))
  if (parsedId.error) {
    notFound()
  }

  const groupValues = await contentGroupService.findUnique(parsedId.data)
  if (!groupValues) {
    notFound()
  }

  return (
    <GroupFormProvider groupValues={groupValues}>
      <ScrollArea className="flex-grow h-[calc(100vh-4rem)] [&>*>div]:h-full">
        <GridColumn p={4} className="appear @[72rem]:grid-cols-2 grid-flow-row gap-4 h-full">
          <div className="grid grid-cols-subgrid row-span-2 gap-4">
            {article}
            {json}
          </div>
          {folder}
        </GridColumn>
        <ScrollBar />
      </ScrollArea>
      {children}
    </GroupFormProvider>
  )
}