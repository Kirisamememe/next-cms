'use client'

import { FlexRow } from "@/components/ui/flexbox";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Heading } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Link, usePathname } from "@/i18n/routing";
import React from "react";


export function Header() {
  const pathname = usePathname()
  const t = useTranslations('breadcrumb')

  return (
    <FlexRow className="sticky top-0 h-16 w-full border-b justify-between items-center bg-background/50 backdrop-blur-xl z-50">
      <FlexRow p={3} gap={2} center>
        <SidebarTrigger className="size-8" />
        <Heading>
          <Breadcrumb>
            <BreadcrumbList>
              {pathname.split('/').slice(1, 4).map((_, index, arr) => {
                if (index === 0) return null
                const href = '/' + arr.slice(0, index + 1).join('/')

                return (
                  <React.Fragment key={index}>
                    {index < arr.length - 1 ? 
                    <>
                      <BreadcrumbItem className="text-base font-bold hover:text-foreground">
                        <Link href={href}>
                          {t(`${arr[1]}.${index}`)}
                        </Link>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    </> :
                    <BreadcrumbPage className="text-base font-bold">
                      {t(`${arr[1]}.${index}`)}
                    </BreadcrumbPage>}
                  </React.Fragment>
                )
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </Heading>
      </FlexRow>
    </FlexRow>
  )
}