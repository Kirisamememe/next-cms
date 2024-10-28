import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import LocaleSwitcher from "@/components/locale-switcher"
import { ModeToggle } from "@/components/mode-toggle"
import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronsUpDown, LogOut, CircleUser, Cog } from "lucide-react"
import { getTranslations } from "next-intl/server"


export async function SideNavFooterContainer() {
  const session = await auth()
  const t = await getTranslations()

  const avatarLabel = (
    <>
      <Avatar className="size-9 group-data-[collapsible=icon]:size-8">
        {session?.user?.image &&
          <AvatarImage src={session.user.image} />}
        <AvatarFallback>{session?.user?.name || "USER"}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">
          {session?.user?.nickname || session?.user?.name}
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {session?.user?.email}
        </span>
      </div>
    </>
  )

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>

            {/* トリガー */}
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size={"lg"} className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                {avatarLabel}
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              {/* ユーザーラベル */}
              <DropdownMenuLabel className="flex gap-2 font-normal py-2">
                {avatarLabel}
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {/* テーマ */}
              <DropdownMenuGroup >
                <ModeToggle />
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* その他諸々 */}
              <DropdownMenuItem className="h-9" disabled >
                <CircleUser size={16} />
                {t('sidebar.footer.profile')}
              </DropdownMenuItem>
              <DropdownMenuItem className="h-9" disabled >
                <Cog size={16} />
                {t('sidebar.footer.setting')}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <LocaleSwitcher variant="ghost" className="font-normal" />
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* ログアウト */}
              <DropdownMenuGroup className="p-0">
                <DropdownMenuItem asChild className="py-0 w-full">
                  <form action={async () => {
                    'use server'
                    await signOut({ redirectTo: '/admin' })
                  }}>
                    <Button variant={"ghost"} size={"icon"} className="p-0 h-9 w-full justify-start">
                      <LogOut size={16} />
                      {t(`auth.signOut`)}
                    </Button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}