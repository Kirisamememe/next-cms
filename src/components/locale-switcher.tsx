"use client";

import { Languages, Check, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { redirect, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { i18n, locales, type Locale } from "../i18n-config";
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation'

type Props = {
  className?: string;
  variant?: "ghost" | "outline";
  side?: "top" | "bottom" | "left" | "right"
}

export default function LocaleSwitcher({ className, variant = "outline", side = "bottom" }: Props) {
  const params = useParams<{ locale: string }>()
  const pathname = usePathname();
  const localeParam = params.locale

  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const changeLocale = (locale: Locale) => {
    Cookies.set('NEXT_LOCALE', locale, { expires: new Date(new Date().getTime() + 730 * 24 * 60 * 60 * 1000)})
    redirect(redirectedPathname(locale))
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size="sm" className={cn("w-full h-9 justify-start", variant === 'outline' && "w-auto p-0 size-10 justify-center", className)}>
            <Languages size={16} />
            {variant === 'ghost' && 
            <>
              Language
              <ChevronRight className="ml-auto" size={16} />
            </>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side={"right"} className='-ml-1'>
          {locales.map((locale, index) => (
            <DropdownMenuItem key={index} onClick={() => changeLocale(locale as Locale)}>
              <Check size={16} className={cn(locale !== localeParam && "text-transparent", "mr-2")} />
              {i18n.locales[locale as Locale]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}