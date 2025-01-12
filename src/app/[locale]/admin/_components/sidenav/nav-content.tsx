import {
  // LayoutTemplate, 
  // Hexagon,
  PieChart,
  LibraryBig,
  CircleGauge,
  Settings2,
  Server,
  Users,
  Newspaper,
  FileJson,
  Images,
  BookOpenText,
  Hexagon,
  SquareArrowOutUpRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export const contents = [
  {
    title: "article",
    url: "/admin/articles",
    icon: Newspaper,
    items: [
      {
        title: "draft",
        url: "/admin/articles/draft",
      },
      {
        title: "published",
        url: "/admin/articles/published",
      },
      {
        title: "archive",
        url: "/admin/articles/archive",
      },
    ],
  },
  {
    title: "jsonContent",
    url: "/admin/json-content",
    icon: FileJson,
    items: [
      {
        title: "draft",
        url: "/admin/json-content/draft",
      },
      {
        title: "published",
        url: "/admin/json-content/published",
      },
      {
        title: "archive",
        url: "/admin/json-content/archive",
      },
    ],
  },
  {
    title: "gallery",
    url: "/admin/gallery",
    icon: Images,
    items: [],
  },
  {
    title: "contentGroup",
    url: "/admin/content-group",
    icon: LibraryBig,
    items: [],
  },
]

export const api = [
  {
    title: "restfulApi",
    url: "/admin/restful-api",
    icon: Server,
    items: [
      {
        title: "APIManagement",
        url: "/admin/restful-api",
      },
      {
        title: "accessToken",
        url: "/admin/restful-api/token",
      }
    ]
  },
  {
    title: "graphQL",
    url: "/admin/graphQL",
    icon: Hexagon,
    items: []
  },
]

export const system = [
  {
    title: "dashboard",
    url: "/admin/dashboard",
    icon: CircleGauge,
  },
  // {
  //   title: "buildInPages",
  //   url: "/admin/build-in-pages",
  //   icon: LayoutTemplate,
  // },
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
    title: "log",
    url: "/admin/log",
    icon: PieChart,
  },
]

export const other = [
  {
    title: "docs",
    url: "/admin/docs",
    icon: BookOpenText,
  },
  {
    title: "github",
    url: "https://github.com/Kirisamememe/next-cms",
    icon: FaGithub,
    subIcon: SquareArrowOutUpRight,
    blank: true
  },
]