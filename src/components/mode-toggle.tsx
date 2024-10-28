"use client"

import * as React from "react"
import { Moon, Sun, Monitor, ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const t = useTranslations()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full justify-start h-9 p-2 rounded-sm">
          <Monitor size={16} className={cn("hidden", theme === 'system' && "block")} />
          <Sun size={16} className={cn("hidden", theme === 'light' && "block")} />
          <Moon size={16} className={cn("hidden", theme === 'dark' && "block")} />
          {t('sidebar.footer.theme')}
          <ChevronRight className="ml-auto" size={16} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="-ml-1">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun size={16} />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon size={16} />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor size={16} />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    
  )
}
