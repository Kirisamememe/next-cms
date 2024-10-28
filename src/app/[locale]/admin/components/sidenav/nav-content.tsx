import { LayoutTemplate, LibraryBig, FileText, CircleGauge, PieChart, Settings2, Server, Users, Newspaper, PencilRuler, House, Images, BookCopy, BookOpenText } from "lucide-react";

export const navMain = [
  {
    title: "homepage",
    url: "/admin/homepage",
    icon: House,
    items: [],
  },
  {
    title: "articles",
    url: "/admin/articles",
    icon: Newspaper,
    items: [],
  },
  {
    title: "portfolio",
    url: "/admin/portfolio",
    icon: BookCopy,
    items: [],
  },
  {
    title: "gallery",
    url: "/admin/gallery",
    icon: Images,
    items: [],
  },
  {
    title: "aboutMe",
    url: "/admin/about-me",
    icon: LayoutTemplate,
    items: [],
  },
]

export const customContents = [
  {
    title: "singleContents",
    url: "/admin/single-contents",
    icon: FileText,
    items: [],
  },
  {
    title: "collections",
    url: "/admin/collections",
    icon: LibraryBig,
    items: [],
  }
]

export const restful = [
  {
    title: "restfulApi",
    url: "/admin/restful-api",
    icon: Server,
  },
  {
    title: "log",
    url: "/admin/log",
    icon: PieChart,
  },
  {
    title: "apiTest",
    url: "/admin/restful-api-test",
    icon: PencilRuler,
  },
]

export const overview = [
  {
    title: "dashboard",
    url: "/admin/dashboard",
    icon: CircleGauge,
    isActive: true,
  },
  {
    title: "editors",
    url: "/admin/editors",
    icon: Users,
  },
  {
    title: "preference",
    url: "/admin/preference",
    icon: Settings2,
  },
  {
    title: "docs",
    url: "/admin/docs",
    icon: BookOpenText,
  },
]