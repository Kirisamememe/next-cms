import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from "@/components/ui/sidebar"
import { Heading } from "../../../../../components/ui/typography"
import { Button } from "../../../../../components/ui/button"
import { getDictionary } from "@/lib/translator";
import { Flexbox, FlexRow } from "../../../../../components/ui/flexbox";
import { SideNavFooterContainer } from "./sidenav-footer";
import { Logo } from "./logo";
import { LogoText } from "./logo-text";
import { LayoutTemplate, LibraryBig, FileText, CircleGauge, PieChart, Settings2, Server, Users, Newspaper, PencilRuler, House, BookImage, Images, BookCopy, BookOpenText } from "lucide-react";
import { cn } from "@/lib/utils"
import { NavLink } from "./nav-link"

type Props = {
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}

export function SideNav({ dictionary }: Props) {

  const navMain = [
    {
      title: "ホームページ",
      url: "/admin/homepage",
      icon: House,
      items: [],
    },
    {
      title: "ブログ記事",
      url: "/admin/articles",
      icon: Newspaper,
      items: [],
    },
    {
      title: "ポートフォリオ",
      url: "/admin/portfolio",
      icon: BookCopy,
      items: [],
    },
    {
      title: "ギャラリー",
      url: "/admin/gallery",
      icon: Images,
      items: [],
    },
    {
      title: "略歴",
      url: "/admin/about-me",
      icon: LayoutTemplate,
      items: [],
    },
  ]

  const customContents = [
    {
      title: "単体コンテンツ",
      url: "/admin/single-contents",
      icon: FileText,
      items: [],
    },
    {
      title: "コレクション",
      url: "/admin/collections",
      icon: LibraryBig,
      items: [],
    }
  ]

  const restful = [
    {
      title: "API管理",
      url: "/admin/restful-api",
      icon: Server,
    },
    {
      title: "ログ集計",
      url: "/admin/log",
      icon: PieChart,
    },
    {
      title: "テスト",
      url: "#",
      icon: PencilRuler,
    },
  ]

  const overview = [
    {
      title: "ダッシュボード",
      url: "/admin/dashboard",
      icon: CircleGauge,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "編集者管理",
      url: "/admin/editors",
      icon: Users,
    },
    {
      title: "環境設定",
      url: "/admin/preference",
      icon: Settings2,
    },
    {
      title: "ドキュメント",
      url: "/admin/docs",
      icon: BookOpenText,
    },
  ]

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
            Overview
          </SidebarGroupLabel>
          <SidebarMenu>
            {overview.map((item) => (
              <SidebarMenuItem>
                <NavLink url={item.url} title={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Main Contents</SidebarGroupLabel>
          <SidebarMenu>
            {navMain.map((item) => (
              <SidebarMenuItem>
                <NavLink url={item.url} title={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Custom Contents</SidebarGroupLabel>
          <SidebarMenu>
            {customContents.map((item) => (
              <SidebarMenuItem>
                <NavLink url={item.url} title={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="">
          <SidebarGroupLabel>
            Restful API
          </SidebarGroupLabel>
          <SidebarMenu>
            {restful.map((item) => (
              <SidebarMenuItem>
                <NavLink url={item.url} title={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {/* <ChevronRight className="ml-auto transition-transform duration-200" /> */}
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>

      <SideNavFooterContainer dictionary={dictionary} />

      <SidebarRail />
    </Sidebar>
  )
}