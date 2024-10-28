import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar"
import { FlexRow } from "@/components/ui/flexbox";
import { SideNavFooterContainer } from "./sidenav-footer";
import { Logo } from "./logo";
import { LogoText } from "./logo-text";
import { NavLink } from "./nav-link"
import { useTranslations } from "next-intl";
import { customContents, navMain, overview, restful } from "./nav-content";

export function SideNav() {
  const t = useTranslations('sidebar');

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2 transition-all">
        <FlexRow gap={3} className="shrink-0">
          <Logo />
          <LogoText />
        </FlexRow>
      </SidebarHeader>

      <SidebarContent>

        <SidebarGroup className="">
          <SidebarGroupLabel>
            {t(`overview.name`)}
          </SidebarGroupLabel>
          <SidebarMenu>
            {overview.map((item, index) => (
              <SidebarMenuItem key={index}>
                <NavLink url={item.url} title={item.title}>
                  {item.icon && <item.icon />}
                  <span>{t(`overview.${item.title}`)}</span>
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            {t(`mainContents.name`)}
          </SidebarGroupLabel>
          <SidebarMenu>
            {navMain.map((item, index) => (
              <SidebarMenuItem key={index}>
                <NavLink url={item.url} title={item.title}>
                  {item.icon && <item.icon />}
                  <span>{t(`mainContents.${item.title}`)}</span>
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            {t(`customContents.name`)}
          </SidebarGroupLabel>
          <SidebarMenu>
            {customContents.map((item, index) => (
              <SidebarMenuItem key={index}>
                <NavLink url={item.url} title={item.title}>
                  {item.icon && <item.icon />}
                  <span>{t(`customContents.${item.title}`)}</span>
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="">
          <SidebarGroupLabel>
            {t(`restful.name`)}
          </SidebarGroupLabel>
          <SidebarMenu>
            {restful.map((item, index) => (
              <SidebarMenuItem key={index}>
                <NavLink url={item.url} title={item.title}>
                  {item.icon && <item.icon />}
                  <span>{t(`restful.${item.title}`)}</span>
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