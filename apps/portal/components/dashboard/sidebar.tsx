"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingCart,
  Factory,
  ClipboardCheck,
  Store,
  Truck,
  Shield,
  Settings,
  Users,
  BarChart3,
  FileText,
  HelpCircle,
  Package,
  Calculator,
  UserCog,
  ShoppingBag,
  Target,
  FolderKanban,
  Wallet,
  Building2,
  Sliders,
  Contact,
  ShoppingBasket,
  LayoutGrid,
  Globe,
  Code2,
  CreditCard,
  FileCheck,
  Warehouse,
  Headphones,
  Receipt,
  Calendar,
  Bell,
  Activity,
  Briefcase,
  PieChart,
  FileSignature,
  Brain,
  RotateCcw,
  Car,
  MonitorPlay,
  TrendingUp,
  Banknote,
  UsersRound,
  Sparkles,
  PenTool,
  Landmark,
  Percent,
  PiggyBank,
  RefreshCw,
  BarChart2,
  MessageSquare,
  Building,
  Workflow,
  Search,
  ChevronDown,
  ChevronRight,
  Database,
  Terminal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useState, useMemo } from "react"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  activeModule: string
  onModuleChange: (module: string) => void
  onOpenFlowBuilder: () => void
}

const modulesByCategory = {
  ejecutivo: {
    label: "Ejecutivo & Analytics",
    icon: TrendingUp,
    modules: [
      { id: "dashboard", icon: LayoutDashboard, label: "Dashboard Principal" },
      { id: "ceo-dashboard", icon: PieChart, label: "Vista CEO", badge: "Pro" },
      { id: "forecasting", icon: Brain, label: "Forecasting AI", badge: "AI" },
      { id: "reportes", icon: BarChart3, label: "Reportes" },
      { id: "business-intelligence", icon: BarChart2, label: "Business Intelligence", badge: "AI" },
    ],
  },
  comercial: {
    label: "Comercial & Ventas",
    icon: Target,
    modules: [
      { id: "ventas", icon: Target, label: "Ventas CRM" },
      { id: "cotizaciones", icon: Receipt, label: "Cotizaciones" },
      { id: "contactos", icon: Contact, label: "Clientes" },
      { id: "comisiones", icon: Percent, label: "Comisiones" },
      { id: "contratos", icon: FileSignature, label: "Contratos" },
      { id: "ecommerce", icon: ShoppingCart, label: "E-Commerce B2B" },
      { id: "portal-clientes", icon: MonitorPlay, label: "Portal Clientes" },
      { id: "encuestas", icon: MessageSquare, label: "Encuestas NPS" },
      { id: "suscripciones", icon: RefreshCw, label: "Suscripciones" },
    ],
  },
  operaciones: {
    label: "Operaciones & Logística",
    icon: Package,
    modules: [
      { id: "inventario", icon: Package, label: "Inventario" },
      { id: "almacen-visual", icon: Warehouse, label: "Almacén Visual", badge: "AI" },
      { id: "compras", icon: ShoppingBag, label: "Compras" },
      { id: "proveedores", icon: Briefcase, label: "Proveedores" },
      { id: "pos", icon: Store, label: "POS Retail" },
      { id: "garantias", icon: RotateCcw, label: "Garantías RMA" },
      { id: "flotas", icon: Car, label: "Gestión de Flotas" },
    ],
  },
  produccion: {
    label: "Producción & Calidad",
    icon: Factory,
    modules: [
      { id: "manufactura", icon: Factory, label: "Manufactura MRP" },
      { id: "calidad", icon: ClipboardCheck, label: "Control de Calidad" },
      { id: "field", icon: Truck, label: "Field Service" },
    ],
  },
  finanzas: {
    label: "Finanzas & Contabilidad",
    icon: Banknote,
    modules: [
      { id: "contabilidad", icon: Calculator, label: "Contabilidad" },
      { id: "facturacion-dian", icon: FileCheck, label: "Facturación DIAN" },
      { id: "tesoreria", icon: Wallet, label: "Tesorería" },
      { id: "conciliacion-bancaria", icon: Landmark, label: "Conciliación Bancaria", badge: "AI" },
      { id: "presupuesto", icon: PiggyBank, label: "Presupuesto" },
      { id: "activos", icon: Building2, label: "Activos Fijos" },
    ],
  },
  talento: {
    label: "Talento Humano",
    icon: UsersRound,
    modules: [
      { id: "rrhh", icon: UserCog, label: "Recursos Humanos" },
      { id: "nomina-electronica", icon: FileText, label: "Nómina Electrónica" },
      { id: "proyectos", icon: FolderKanban, label: "Proyectos" },
      { id: "agenda", icon: Calendar, label: "Agenda" },
    ],
  },
  herramientas: {
    label: "Herramientas & Personalización",
    icon: Sparkles,
    modules: [
      { id: "automatizaciones", icon: Workflow, label: "Automatizaciones", badge: "AI" },
      { id: "call-center", icon: Headphones, label: "Call Center AI", badge: "AI" },
      { id: "entidades", icon: Database, label: "Creador de Entidades" },
      { id: "campos", icon: Sliders, label: "Campos Personalizados" },
      { id: "nql-console", icon: Terminal, label: "Consola NQL", badge: "Pro" },
      { id: "dashboard-builder", icon: LayoutGrid, label: "Dashboard Builder" },
      { id: "landing-builder", icon: Globe, label: "Landing Builder" },
      { id: "firma-electronica", icon: PenTool, label: "Firma Electrónica" },
    ],
  },
  administracion: {
    label: "Administración & Config",
    icon: Settings,
    modules: [
      { id: "usuarios", icon: Users, label: "Usuarios" },
      { id: "multi-empresa", icon: Building, label: "Multi-Empresa", badge: "Pro" },
      { id: "grc", icon: Shield, label: "GRC" },
      { id: "auditoria", icon: Activity, label: "Auditoría" },
      { id: "documentos", icon: FileText, label: "Documentos" },
      { id: "notificaciones", icon: Bell, label: "Notificaciones" },
      { id: "api", icon: Code2, label: "API" },
      { id: "settings", icon: Settings, label: "Configuración" },
    ],
  },
}

export function Sidebar({ collapsed, onToggle, activeModule, onModuleChange, onOpenFlowBuilder }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "ejecutivo",
    "comercial",
    "operaciones",
    "finanzas",
  ])

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return modulesByCategory

    const filtered: typeof modulesByCategory = {} as any
    Object.entries(modulesByCategory).forEach(([key, category]) => {
      const matchingModules = category.modules.filter((m) => m.label.toLowerCase().includes(searchQuery.toLowerCase()))
      if (matchingModules.length > 0) {
        filtered[key as keyof typeof modulesByCategory] = {
          ...category,
          modules: matchingModules,
        }
      }
    })
    return filtered
  }, [searchQuery])

  const toggleCategory = (categoryKey: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryKey) ? prev.filter((k) => k !== categoryKey) : [...prev, categoryKey],
    )
  }

  if (collapsed) {
    return (
      <aside className="h-full w-16 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center shadow-lg">
          <span className="text-primary-foreground font-bold text-lg">N</span>
        </div>
        <Separator className="w-8 bg-sidebar-border" />
        <Button onClick={onOpenFlowBuilder} size="icon" variant="ghost" className="text-primary">
          <Sparkles className="h-5 w-5" />
        </Button>
        <div className="flex-1" />
        <Button onClick={onToggle} size="icon" variant="ghost">
          <Settings className="h-5 w-5" />
        </Button>
      </aside>
    )
  }

  return (
    <aside className="h-full w-72 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground font-bold text-lg">N</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-foreground leading-none">NEXUS ERP</span>
            <span className="text-xs text-muted-foreground">Enterprise Platform</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Search & Quick Actions */}
      <div className="p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar módulos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-sidebar-accent/50 border-sidebar-border"
          />
        </div>

        <Button
          onClick={onOpenFlowBuilder}
          className="w-full bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90 h-9 gap-2"
        >
          <Sparkles className="h-4 w-4" />
          <span className="font-medium text-sm">Nueva Automatización</span>
        </Button>
      </div>

      {/* Categories & Modules */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-3">
          <div className="space-y-2 pb-4">
            {Object.entries(filteredCategories).map(([key, category]) => {
              const isExpanded = expandedCategories.includes(key)
              return (
                <div key={key} className="space-y-1">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(key)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-sidebar-accent/50 transition-colors group"
                  >
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <category.icon className="h-4 w-4 text-primary" />
                    <span className="text-xs font-semibold text-foreground uppercase tracking-wide flex-1 text-left">
                      {category.label}
                    </span>
                    <Badge variant="outline" className="h-4 text-[10px] px-1.5 bg-sidebar-accent">
                      {category.modules.length}
                    </Badge>
                  </button>

                  {/* Modules List */}
                  {isExpanded && (
                    <div className="space-y-0.5 pl-1">
                      {category.modules.map((module) => (
                        <button
                          key={module.id}
                          onClick={() => onModuleChange(module.id)}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-3 py-2 rounded-md transition-all text-sm",
                            activeModule === module.id
                              ? "bg-primary/15 text-primary shadow-sm ring-1 ring-primary/20"
                              : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/70",
                          )}
                        >
                          <module.icon
                            className={cn("h-4 w-4 shrink-0", activeModule === module.id && "text-primary")}
                          />
                          <span className="flex-1 text-left font-medium">{module.label}</span>
                          {module.badge && (
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-[9px] h-4 px-1.5 font-semibold",
                                module.badge === "AI" && "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-400/30",
                                module.badge === "Pro" && "bg-amber-500/10 text-amber-400 border-amber-400/30",
                              )}
                            >
                              {module.badge}
                            </Badge>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        <Button
          onClick={() => onModuleChange("billing")}
          variant="outline"
          className="w-full h-9 justify-start gap-2 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border-emerald-500/30 hover:from-emerald-500/10 hover:to-teal-500/10"
        >
          <CreditCard className="h-4 w-4 text-emerald-400" />
          <span className="text-sm font-medium flex-1 text-left text-emerald-400">Suscripción Pro</span>
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => onModuleChange("marketplace")}
            variant="ghost"
            size="sm"
            className="h-8 text-xs gap-1.5"
          >
            <ShoppingBasket className="h-3.5 w-3.5" />
            Marketplace
          </Button>
          <Button onClick={() => onModuleChange("ayuda")} variant="ghost" size="sm" className="h-8 text-xs gap-1.5">
            <HelpCircle className="h-3.5 w-3.5" />
            Ayuda
          </Button>
        </div>
      </div>
    </aside>
  )
}
