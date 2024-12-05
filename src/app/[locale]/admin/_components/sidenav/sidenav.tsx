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
import { contents, system, api } from "./nav-content";
import { Link } from "@/i18n";

export function SideNav() {
  const t = useTranslations('sidebar');

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 group-data-[collapsible=icon]:p-2 transition-all">
        <Link href={"/admin/dashboard"}>
          <FlexRow gap={3} className="shrink-0">
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
            {contents.map((item, index) => (
              <SidebarMenuItem key={index}>
                <NavLink url={item.url} title={t(`contents.${item.title}`)}>
                  {item.icon && <item.icon />}
                  <span>{t(`contents.${item.title}`)}</span>
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="">
          <SidebarGroupLabel>
            {t(`api.name`)}
          </SidebarGroupLabel>
          <SidebarMenu>
            {api.map((item, index) => (
              <SidebarMenuItem key={index}>
                <NavLink url={item.url} title={t(`api.${item.title}`)}>
                  {item.icon && <item.icon />}
                  <span>{t(`api.${item.title}`)}</span>
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