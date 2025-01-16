import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { NavLink } from "./nav-link"

type Props = {
  parent: string
  items: {
    title: string
    url: string
  }[]
}

export const NavSubmenu = ({ items, parent }: Props) => {
  const t = useTranslations('sidebar')

  return (
    <>
      <CollapsibleTrigger asChild>
        <SidebarMenuAction className="[&>svg]:data-[state=open]:rotate-90 [&>svg]:[transition:transform_150ms_ease-out] size-8 hover:bg-foreground/10 peer-data-[size=default]/menu-button:top-0.5">
          <ChevronRight />
          <span className="sr-only">Toggle</span>
        </SidebarMenuAction>
      </CollapsibleTrigger>
      <CollapsibleContent className="my-1 ml-1 CollapsibleContent">
        <SidebarMenuSub>
          {items?.map((subItem) => (
            <SidebarMenuSubItem key={subItem.title}>
              <SidebarMenuSubButton asChild>
                <NavLink url={subItem.url} title={t(`${parent}.${subItem.title}`)}>
                  <span>{t(`${parent}.${subItem.title}`)}</span>
                </NavLink>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </>
  )
}