"use client"

import { Search, Bell, Plus, Settings, User, Moon, Workflow, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface TopNavProps {
  onOpenFlowBuilder: () => void
  onOpenOnboarding: () => void
}

export function TopNav({ onOpenFlowBuilder, onOpenOnboarding }: TopNavProps) {
  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar módulos, pedidos, clientes..." className="pl-10 bg-secondary border-border" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-purple-500/30 text-purple-500 hover:bg-purple-500/10 bg-transparent"
          onClick={onOpenOnboarding}
        >
          <Wand2 className="h-4 w-4" />
          <span className="hidden md:inline">Demo Onboarding</span>
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
          onClick={onOpenFlowBuilder}
        >
          <Workflow className="h-4 w-4" />
          <span className="hidden md:inline">Automatizar</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline">Crear</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Crear nuevo</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Pedido B2B</DropdownMenuItem>
            <DropdownMenuItem>Orden de Producción</DropdownMenuItem>
            <DropdownMenuItem>Venta POS</DropdownMenuItem>
            <DropdownMenuItem>Orden de Servicio</DropdownMenuItem>
            <DropdownMenuItem>Inspección de Calidad</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-destructive">
            3
          </Badge>
        </Button>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon">
          <Moon className="h-5 w-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/professional-colombian-business-person.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col">
              <span>Juan David Pérez</span>
              <span className="text-xs font-normal text-muted-foreground">Administrador</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-4 w-4 mr-2" />
              Mi Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => (window.location.hash = "configuracion")}>
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Cerrar Sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
