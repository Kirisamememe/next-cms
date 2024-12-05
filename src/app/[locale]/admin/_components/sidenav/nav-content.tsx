import { LayoutTemplate, LibraryBig, CircleGauge, PieChart, Settings2, Server, Users, Newspaper, FileJson, Images, BookImage, BookOpenText, Hexagon } from "lucide-react";

export const contents = [
  {
    title: "article",
    url: "/admin/articles",
    icon: Newspaper,
    items: [],
  },
  {
    title: "jsonContent",
    url: "/admin/json-content",
    icon: FileJson,
    items: [],
  },
  {
    title: "gallery",
    url: "/admin/gallery",
    icon: Images,
    items: [],
  },
  {
    title: "mediaCollection",
    url: "/admin/media-collection",
    icon: BookImage,
    items: [],
  },
  {
    title: "contentsGroup",
    url: "/admin/contents-group",
    icon: LibraryBig,
    items: [],
  },
]

export const api = [
  {
    title: "restfulApi",
    url: "/admin/restful-api",
    icon: Server,
  },
  {
    title: "graphQL",
    url: "/admin/graphQL",
    icon: Hexagon,
  },
  {
    title: "log",
    url: "/admin/log",
    icon: PieChart,
  },
]

export const system = [
  {
    title: "dashboard",
    url: "/admin/dashboard",
    icon: CircleGauge,
  },
  {
    title: "buildInPages",
    url: "/admin/build-in-pages",
    icon: LayoutTemplate,
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