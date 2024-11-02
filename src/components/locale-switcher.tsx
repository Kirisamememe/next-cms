"use client";

import { Languages, Check, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { i18n, locales, type Locale } from "../i18n/config";
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation'
import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

type Props = {
  className?: string;
  variant?: "ghost" | "outline";
  side?: "top" | "bottom" | "left" | "right",
  align?: "end" | "center" | "start",
  sideOffset?: number
}

export default function LocaleSwitcher({
  className,
  variant = "outline",
  side = "right",
  align = "end",
  sideOffset = -2
}: Props) {
  const t = useTranslations()
  const params = useParams<{ locale: string }>()
  const pathname = usePathname();
  const localeParam = params.locale

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant} size="sm"
            className={cn(
              "w-full h-9 justify-start active:scale-100 cursor-pointer",
              variant === 'outline' && "w-auto p-0 size-10 justify-center",
              className
            )}>
            <Languages size={16} />
            {variant === 'ghost' &&
              <>
                {t('sidebar.footer.language')}
                <ChevronRight className="ml-auto" size={16} />
              </>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={align} side={side} sideOffset={sideOffset} >
          {locales.map((locale, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link href={pathname} locale={locale}>
                <Check size={16} className={cn(locale !== localeParam && "text-transparent", "mr-2")} />
                {i18n.locales[locale as Locale]}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}