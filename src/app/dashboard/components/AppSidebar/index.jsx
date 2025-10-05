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
  Briefcase,
  Handshake,
  Home,
  Info,
  LayoutDashboard,
  Package,
  ScanQrCode,
  Settings,
  Store,
  TextSearch,
  Users,
} from "lucide-react"

const items = [
  {
    title: "Painel Principal",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Banner Principal",
    url: "/dashboard/banner-principal",
    icon: ScanQrCode,
  },
  {
    title: "Produtos",
    url: "/dashboard/produtos", // ✅ CORRIGIDO
    icon: Store,
  },
  {
    title: "Usuários", // ✅ NOVO
    url: "/dashboard/usuarios",
    icon: Users,
  },
  {
    title: "Dados da Ss Lares",
    url: "/dashboard/dados-empresa",
    icon: TextSearch,
  },
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
]

const publicPagesItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Produtos",
    url: "/produtos",
    icon: Package,
  },
  {
    title: "Sobre Nós",
    url: "/sobre-nos",
    icon: Info,
  },
  {
    title: "Seja Parceiro",
    url: "/seja-parceiro",
    icon: Handshake,
  },
  {
    title: "Trabalhe Conosco",
    url: "/trabalhe-conosco",
    icon: Briefcase,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="mt-6 flex items-center justify-center">
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
        <SidebarGroup>
          <SidebarGroupLabel>Páginas Públicas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {publicPagesItems.map((item) => (
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
