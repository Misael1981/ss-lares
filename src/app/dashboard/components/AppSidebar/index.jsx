"use client"

import LogoImage from "@/components/Header/components/LogoImage"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  ScanQrCode,
  Settings,
  Store,
  TextSearch,
  Users,
} from "lucide-react"

const items = [
  {
    title: "Painel Principal",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Banner Principal",
    url: "#",
    icon: ScanQrCode,
  },
  {
    title: "Produtos",
    url: "#",
    icon: Store,
  },
  {
    title: "Usuários",
    url: "#",
    icon: Users,
  },
  {
    title: "Dados da Ss Lares",
    url: "#",
    icon: TextSearch,
  },
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center">
        <LogoImage />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Aplicações</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
