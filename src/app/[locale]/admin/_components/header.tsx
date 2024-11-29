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
import { Link, usePathname } from "@/i18n";
import React, { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

export function Header() {
  const pathname = usePathname()
  const t = useTranslations('breadcrumb')

  if (pathname.split('/')[2] === 'gallery') {
    return (
      <HeaderContainer>
        {/* リストの数は制限なし */}
        {pathname.split('/').slice(1).map((segment, index, arr) => {
          if (index === 0) return null

          // リストが一つだけ
          if (arr.length === 2) {
            return (
              <BreadcrumbPage key={segment} className="text-base font-semibold">
                {t(`${arr[1]}.${index}`)}
              </BreadcrumbPage>
            )
          }

          const href = '/' + arr.slice(0, index + 1).join('/')

          // 現在の要素が1番目
          if (index === 1) {
            return (
              <BreadcrumbItem key={segment} className="text-base font-semibold hover:text-foreground">
                <Link href={href}>
                  {t(`${arr[1]}.1`)}
                </Link>
              </BreadcrumbItem>
            )
          }

          if (arr[2] !== 'preview') {
            if (index < arr.length - 1) {
              return (
                <React.Fragment key={segment}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="text-base font-semibold hover:text-foreground">
                    <Link href={href}>
                      {decodeURIComponent(segment)}
                    </Link>
                  </BreadcrumbItem>
                </React.Fragment>
              )
            }

            return (
              <React.Fragment key={segment}>
                <BreadcrumbSeparator />
                <BreadcrumbPage className="text-base font-semibold">
                  {decodeURIComponent(segment)}
                </BreadcrumbPage>
              </React.Fragment>
            )
          }

          if (index > 2) {
            return null
          }

          return (
            <React.Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="text-base font-semibold">
                {t(`${arr[1]}.2`)}
              </BreadcrumbPage>
            </React.Fragment>
          )
        })}
      </HeaderContainer>
    )
  }


  return (
    <HeaderContainer>
      {/* リストは2つまで */}
      {pathname.split('/').slice(1, 4).map((segment, index, arr) => {
        if (index === 0) return null

        // リストが一つだけ
        if (arr.length === 2) {
          return (
            <BreadcrumbPage key={segment} className="text-base font-semibold">
              {t(`${arr[1]}.${index}`)}
            </BreadcrumbPage>
          )
        }

        const href = '/' + arr.slice(0, index + 1).join('/')

        // リストが二つ以上、現在の要素が1番目
        if (index === 1) {
          return (
            <BreadcrumbItem key={segment} className="text-base font-semibold hover:text-foreground">
              <Link href={href}>
                {t(`${arr[1]}.1`)}
              </Link>
            </BreadcrumbItem>
          )
        }

        // リストが二つ以上、現在の要素が2番目
        return (
          <React.Fragment key={segment}>
            <BreadcrumbSeparator />
            <BreadcrumbPage className="text-base font-semibold">
              {t(`${arr[1]}.2${segment.match(/^[0-9]+$/) ? '.id' : `.${segment}`}`)}
            </BreadcrumbPage>
          </React.Fragment>
        )
      })}
    </HeaderContainer>
  )
}




function HeaderContainer({ children }: { children: ReactNode }) {
  return (
    <FlexRow className="sticky shrink-0 top-0 h-16 w-full border-b justify-between items-center bg-background/50 backdrop-blur-xl z-50">
      <FlexRow p={3} gap={2} center>
        <SidebarTrigger className="size-9" />
        <Separator orientation="vertical" className="h-4 mr-1" />
        <Heading>
          <Breadcrumb>
            <BreadcrumbList>
              {children}
            </BreadcrumbList>
          </Breadcrumb>
        </Heading>
      </FlexRow>
    </FlexRow>
  )
}