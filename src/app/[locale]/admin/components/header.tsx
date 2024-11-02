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
    <FlexRow className="sticky shrink-0 top-0 h-16 w-full border-b justify-between items-center bg-background/50 backdrop-blur-xl z-50">
      <FlexRow p={3} gap={2} center>
        <SidebarTrigger className="size-8" />
        <Heading>
          <Breadcrumb>
            <BreadcrumbList>
              {pathname.split('/').slice(1, 4).map((token, index, arr) => {
                if (index === 0) return null
                if (arr.length === 2) {
                  return (
                    <BreadcrumbPage key={token} className="text-base font-bold">
                      {t(`${arr[1]}.${index}`)}
                    </BreadcrumbPage>
                  )
                }

                const href = '/' + arr.slice(0, index + 1).join('/')

                if (index === 1) {
                  return (
                    <BreadcrumbItem key={token} className="text-base font-bold hover:text-foreground">
                      <Link href={href}>
                        {t(`${arr[1]}.1`)}
                      </Link>
                    </BreadcrumbItem>
                  )
                }

                return (
                  <React.Fragment key={token}>
                    <BreadcrumbSeparator />
                    <BreadcrumbPage className="text-base font-bold">
                      {t(`${arr[1]}.2${token.match(/^[0-9]+$/) ? '' : `.${token}`}`)}
                    </BreadcrumbPage>
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