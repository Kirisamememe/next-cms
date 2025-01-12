import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { FlexRow } from "@/components/ui/flexbox";
import { SideNavFooterContainer } from "./sidenav-footer";
import { Logo } from "./logo";
import { LogoText } from "./logo-text";
import { NavLink } from "./nav-link"
import { useTranslations } from "next-intl";
import { contents, system, api, other } from "./nav-content";
import { Link } from "@/i18n";
import { ChevronRight } from "lucide-react";
import { NavSubmenu } from "./nav-submenu";

export function SideNav() {
  const t = useTranslations('sidebar');

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2 transition-all">
        <Link href={"/admin/dashboard"}>
          <FlexRow gap={3} centerY className="shrink-0">
            <Logo />
            <LogoText />
          </FlexRow>
        </Link>
      </SidebarHeader>

      <SidebarContent>

        <SidebarGroup className="">
          <SidebarGroupLabel>
            {t(`system.name`)}
          </SidebarGroupLabel>
          <SidebarMenu>
            {system.map((item, index) => (
              <SidebarMenuItem key={index}>
                <NavLink url={item.url} title={t(`system.${item.title}`)}>
                  {item.icon && <item.icon />}
                  <span>{t(`system.${item.title}`)}</span>
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            {t(`contents.name`)}
          </SidebarGroupLabel>
          <SidebarMenu>
            {contents.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen={false}>
                <SidebarMenuItem className="content-center">
                  <NavLink url={item.url} title={t(`contents.${item.title}`)}>
                    {item.icon && <item.icon />}
                    <span>{t(`contents.${item.title}`)}</span>
                  </NavLink>
                  {!!item.items.length && <NavSubmenu items={item.items} parent={'contents'} />}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="">
          <SidebarGroupLabel>
            {t(`api.name`)}
          </SidebarGroupLabel>
          <SidebarMenu>
            {api.map((item) => (
              <Collapsible key={item.title} asChild defaultOpen={false}>
                <SidebarMenuItem>
                  <NavLink url={item.url} title={t(`api.${item.title}`)}>
                    {item.icon && <item.icon />}
                    <span>{t(`api.${item.title}`)}</span>
                  </NavLink>
                  {!!item.items.length && <NavSubmenu items={item.items} parent={'api'} />}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            {t(`other.name`)}
          </SidebarGroupLabel>
          <SidebarMenu>
            {other.map((item, index) => (
              <SidebarMenuItem key={index}>
                <NavLink url={item.url} title={t(`other.${item.title}`)} blank={item.blank}>
                  {item.icon && <item.icon />}
                  <span>{t(`other.${item.title}`)}</span>
                  {item.subIcon &&
                    <span className="[&>svg]:size-3 [&>svg]:shrink-0 ml-auto">
                      <item.subIcon />
                    </span>
                  }
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>

      <SideNavFooterContainer />

      <SidebarRail />
    </Sidebar>
  )
}