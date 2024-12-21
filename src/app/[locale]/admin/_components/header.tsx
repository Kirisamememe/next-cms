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
import { cn } from "@/lib";
import { useDynamicHeader } from "./dynamic-header-provider";

export function Header() {
  const pathname = usePathname()
  const t = useTranslations('breadcrumb')

  if (pathname.split('/')[2] === 'gallery') {
    const staticSegments = ['preview', 'new', 'edit']

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

          if (!staticSegments.includes(arr[2])) {
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
                {t(`${arr[1]}.2.${segment}`)}
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
  const { atTop, isGoingUp } = useDynamicHeader()

  return (
    <FlexRow className={cn(
      "sticky shrink-0 top-0 h-16 w-full justify-between items-center bg-card/80 backdrop-blur-xl z-50 transition-transform duration-300 shadow-[0_1px_0_0_hsla(var(--foreground)/0.1)]",
      (!atTop && !isGoingUp) && "-translate-y-16"
    )}>
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