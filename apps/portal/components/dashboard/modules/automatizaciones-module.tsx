"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Sparkles,
  Search,
  Plus,
  MoreVertical,
  Play,
  Pause,
  Copy,
  Trash2,
  Edit,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  GitBranch,
  FileJson,
  Upload,
  Download,
  BarChart3,
  RefreshCw,
  Eye,
  History,
  Grid3X3,
  List,
  Activity,
  Timer,
  Target,
  Layers,
  Box,
  ShoppingCart,
  Users,
  FileText,
  Mail,
  Webhook,
  Star,
  StarOff,
  Archive,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"

interface Flow {
  id: string
  name: string
  description: string
  category: string
  trigger: {
    type: string
    icon: any
    label: string
  }
  nodesCount: number
  status: "active" | "inactive" | "error" | "draft"
  lastRun: string | null
  lastRunStatus: "success" | "error" | "running" | null
  runsToday: number
  runsTotal: number
  avgDuration: string
  successRate: number
  createdAt: string
  updatedAt: string
  createdBy: string
  tags: string[]
  isFavorite: boolean
  isArchived: boolean
  version: number
}

const flows: Flow[] = [
  {
    id: "flow-1",
    name: "Facturación Electrónica DIAN",
    description: "Genera y envía facturas electrónicas automáticamente cuando se confirma una venta",
    category: "Finanzas",
    trigger: { type: "event", icon: ShoppingCart, label: "Nueva Venta" },
    nodesCount: 12,
    status: "active",
    lastRun: "Hace 5 min",
    lastRunStatus: "success",
    runsToday: 47,
    runsTotal: 12540,
    avgDuration: "2.3s",
    successRate: 99.2,
    createdAt: "2024-01-15",
    updatedAt: "2024-12-01",
    createdBy: "Admin",
    tags: ["DIAN", "Facturas", "Crítico"],
    isFavorite: true,
    isArchived: false,
    version: 8,
  },
  {
    id: "flow-2",
    name: "Control de Stock Inteligente",
    description: "Monitorea niveles de inventario y genera órdenes de compra automáticamente",
    category: "Operaciones",
    trigger: { type: "schedule", icon: Clock, label: "Cada hora" },
    nodesCount: 11,
    status: "active",
    lastRun: "Hace 23 min",
    lastRunStatus: "success",
    runsToday: 24,
    runsTotal: 8760,
    avgDuration: "4.5s",
    successRate: 98.7,
    createdAt: "2024-02-20",
    updatedAt: "2024-11-28",
    createdBy: "Admin",
    tags: ["Inventario", "IA"],
    isFavorite: true,
    isArchived: false,
    version: 5,
  },
  {
    id: "flow-3",
    name: "Onboarding de Clientes",
    description: "Secuencia de bienvenida para nuevos clientes con emails y tareas",
    category: "Comercial",
    trigger: { type: "event", icon: Users, label: "Nuevo Cliente" },
    nodesCount: 15,
    status: "active",
    lastRun: "Hace 2 horas",
    lastRunStatus: "success",
    runsToday: 8,
    runsTotal: 2340,
    avgDuration: "1.2s",
    successRate: 100,
    createdAt: "2024-03-10",
    updatedAt: "2024-11-15",
    createdBy: "Marketing",
    tags: ["CRM", "Emails"],
    isFavorite: false,
    isArchived: false,
    version: 3,
  },
  {
    id: "flow-4",
    name: "Liquidación de Nómina",
    description: "Proceso completo de liquidación de nómina con cálculos y dispersión",
    category: "RRHH",
    trigger: { type: "manual", icon: Play, label: "Manual" },
    nodesCount: 18,
    status: "active",
    lastRun: "Hace 15 días",
    lastRunStatus: "success",
    runsToday: 0,
    runsTotal: 24,
    avgDuration: "45s",
    successRate: 100,
    createdAt: "2024-01-20",
    updatedAt: "2024-11-30",
    createdBy: "RRHH",
    tags: ["Nómina", "Crítico"],
    isFavorite: true,
    isArchived: false,
    version: 12,
  },
  {
    id: "flow-5",
    name: "Alertas de Cartera Vencida",
    description: "Envía recordatorios escalonados a clientes con facturas vencidas",
    category: "Finanzas",
    trigger: { type: "schedule", icon: Clock, label: "Diario 8am" },
    nodesCount: 16,
    status: "active",
    lastRun: "Hoy 8:00am",
    lastRunStatus: "success",
    runsToday: 1,
    runsTotal: 365,
    avgDuration: "12s",
    successRate: 99.5,
    createdAt: "2024-04-01",
    updatedAt: "2024-10-20",
    createdBy: "Finanzas",
    tags: ["Cobranza", "WhatsApp"],
    isFavorite: false,
    isArchived: false,
    version: 4,
  },
  {
    id: "flow-6",
    name: "Sincronización E-commerce",
    description: "Sincroniza pedidos, inventario y precios con tiendas online",
    category: "E-commerce",
    trigger: { type: "webhook", icon: Webhook, label: "Webhook" },
    nodesCount: 9,
    status: "error",
    lastRun: "Hace 1 hora",
    lastRunStatus: "error",
    runsToday: 156,
    runsTotal: 45230,
    avgDuration: "1.8s",
    successRate: 94.3,
    createdAt: "2024-02-01",
    updatedAt: "2024-12-01",
    createdBy: "Admin",
    tags: ["MercadoLibre", "Shopify"],
    isFavorite: false,
    isArchived: false,
    version: 7,
  },
  {
    id: "flow-7",
    name: "Aprobación de Compras",
    description: "Flujo de aprobación según montos con notificaciones y escalamiento",
    category: "Operaciones",
    trigger: { type: "event", icon: FileText, label: "Nueva OC" },
    nodesCount: 14,
    status: "active",
    lastRun: "Hace 30 min",
    lastRunStatus: "success",
    runsToday: 12,
    runsTotal: 3450,
    avgDuration: "0.8s",
    successRate: 100,
    createdAt: "2024-05-15",
    updatedAt: "2024-11-10",
    createdBy: "Compras",
    tags: ["Aprobaciones"],
    isFavorite: false,
    isArchived: false,
    version: 2,
  },
  {
    id: "flow-8",
    name: "Backup de Reportes [Desactivado]",
    description: "Genera backups automáticos de reportes críticos",
    category: "Sistema",
    trigger: { type: "schedule", icon: Clock, label: "Semanal" },
    nodesCount: 6,
    status: "inactive",
    lastRun: "Hace 2 meses",
    lastRunStatus: "success",
    runsToday: 0,
    runsTotal: 52,
    avgDuration: "30s",
    successRate: 100,
    createdAt: "2024-01-01",
    updatedAt: "2024-10-01",
    createdBy: "Admin",
    tags: ["Backup"],
    isFavorite: false,
    isArchived: false,
    version: 1,
  },
  {
    id: "flow-9",
    name: "Análisis de Sentimiento",
    description: "Analiza feedback de clientes con IA y genera alertas",
    category: "IA",
    trigger: { type: "event", icon: Mail, label: "Nuevo Feedback" },
    nodesCount: 8,
    status: "draft",
    lastRun: null,
    lastRunStatus: null,
    runsToday: 0,
    runsTotal: 0,
    avgDuration: "-",
    successRate: 0,
    createdAt: "2024-11-25",
    updatedAt: "2024-11-30",
    createdBy: "Admin",
    tags: ["IA", "NPS"],
    isFavorite: false,
    isArchived: false,
    version: 1,
  },
]

const categories = [
  { id: "all", label: "Todos", count: 9 },
  { id: "Finanzas", label: "Finanzas", count: 2 },
  { id: "Operaciones", label: "Operaciones", count: 2 },
  { id: "Comercial", label: "Comercial", count: 1 },
  { id: "RRHH", label: "RRHH", count: 1 },
  { id: "E-commerce", label: "E-commerce", count: 1 },
  { id: "Sistema", label: "Sistema", count: 1 },
  { id: "IA", label: "IA", count: 1 },
]

const templates = [
  {
    id: "tpl-1",
    name: "Facturación DIAN Básica",
    description: "Flujo básico para emitir facturas electrónicas",
    category: "Finanzas",
    nodesCount: 8,
    uses: 1240,
  },
  {
    id: "tpl-2",
    name: "Alerta de Stock Bajo",
    description: "Notifica cuando un producto llega al mínimo",
    category: "Inventario",
    nodesCount: 5,
    uses: 890,
  },
  {
    id: "tpl-3",
    name: "Bienvenida a Cliente",
    description: "Email de bienvenida con secuencia de onboarding",
    category: "CRM",
    nodesCount: 6,
    uses: 2100,
  },
  {
    id: "tpl-4",
    name: "Aprobación por Niveles",
    description: "Flujo de aprobación con escalamiento automático",
    category: "General",
    nodesCount: 10,
    uses: 560,
  },
  {
    id: "tpl-5",
    name: "Sync con Google Sheets",
    description: "Sincroniza datos con hojas de cálculo",
    category: "Integraciones",
    nodesCount: 4,
    uses: 3200,
  },
  {
    id: "tpl-6",
    name: "Notificación Multi-canal",
    description: "Envía notificaciones por email, WhatsApp y push",
    category: "Notificaciones",
    nodesCount: 7,
    uses: 1800,
  },
]

interface AutomatizacionesModuleProps {
  onOpenFlowBuilder?: (flowId?: string) => void
}

export function AutomatizacionesModule({ onOpenFlowBuilder }: AutomatizacionesModuleProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [flowsList, setFlowsList] = useState(flows)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [showNewFolderDialog, setShowNewFolderDialog] = useState(false)
  const [selectedFlow, setSelectedFlow] = useState<Flow | null>(null)
  const [showRunHistory, setShowRunHistory] = useState(false)

  const filteredFlows = flowsList.filter((flow) => {
    const matchesSearch =
      flow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      flow.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || flow.category === selectedCategory
    const matchesStatus = statusFilter === "all" || flow.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus && !flow.isArchived
  })

  const toggleFlowStatus = (flowId: string) => {
    setFlowsList((prev) =>
      prev.map((f) => (f.id === flowId ? { ...f, status: f.status === "active" ? "inactive" : "active" } : f)),
    )
  }

  const toggleFavorite = (flowId: string) => {
    setFlowsList((prev) => prev.map((f) => (f.id === flowId ? { ...f, isFavorite: !f.isFavorite } : f)))
  }

  const duplicateFlow = (flow: Flow) => {
    const newFlow: Flow = {
      ...flow,
      id: `flow-${Date.now()}`,
      name: `${flow.name} (Copia)`,
      status: "draft",
      lastRun: null,
      lastRunStatus: null,
      runsToday: 0,
      runsTotal: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
      isFavorite: false,
      version: 1,
    }
    setFlowsList((prev) => [newFlow, ...prev])
  }

  const deleteFlow = () => {
    if (selectedFlow) {
      setFlowsList((prev) => prev.filter((f) => f.id !== selectedFlow.id))
      setShowDeleteDialog(false)
      setSelectedFlow(null)
    }
  }

  const archiveFlow = (flowId: string) => {
    setFlowsList((prev) => prev.map((f) => (f.id === flowId ? { ...f, isArchived: true, status: "inactive" } : f)))
  }

  const getStatusBadge = (status: Flow["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Activo
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
            <Pause className="w-3 h-3 mr-1" />
            Inactivo
          </Badge>
        )
      case "error":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <XCircle className="w-3 h-3 mr-1" />
            Error
          </Badge>
        )
      case "draft":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <Edit className="w-3 h-3 mr-1" />
            Borrador
          </Badge>
        )
    }
  }

  const getRunStatusIcon = (status: Flow["lastRunStatus"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-400" />
      case "running":
        return <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  // Stats
  const activeFlows = flowsList.filter((f) => f.status === "active").length
  const totalRunsToday = flowsList.reduce((acc, f) => acc + f.runsToday, 0)
  const avgSuccessRate =
    flowsList.filter((f) => f.runsTotal > 0).reduce((acc, f) => acc + f.successRate, 0) /
    flowsList.filter((f) => f.runsTotal > 0).length
  const errorFlows = flowsList.filter((f) => f.status === "error").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-7 w-7 text-primary" />
            Automatizaciones
          </h1>
          <p className="text-muted-foreground mt-1">Gestiona tus flujos de trabajo automatizados</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowImportDialog(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowExportDialog(true)}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button
            className="bg-gradient-to-r from-primary to-violet-500 hover:from-primary/90 hover:to-violet-500/90"
            onClick={() => onOpenFlowBuilder?.()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Flow
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flows Activos</p>
                <p className="text-3xl font-bold text-emerald-400">{activeFlows}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Zap className="h-6 w-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ejecuciones Hoy</p>
                <p className="text-3xl font-bold text-blue-400">{totalRunsToday}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-500/10 to-violet-500/5 border-violet-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasa de Éxito</p>
                <p className="text-3xl font-bold text-violet-400">{avgSuccessRate.toFixed(1)}%</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-violet-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Con Errores</p>
                <p className="text-3xl font-bold text-red-400">{errorFlows}</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="flows" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="flows" className="gap-2">
            <GitBranch className="h-4 w-4" />
            Mis Flows
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <Layers className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-2">
            <History className="h-4 w-4" />
            Historial
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flows" className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar flows por nombre, descripción o tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label} ({cat.count})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
                <SelectItem value="error">Con Error</SelectItem>
                <SelectItem value="draft">Borradores</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center border rounded-lg p-1 bg-muted/30">
              <Button
                variant="ghost"
                size="sm"
                className={cn("h-7 px-2", viewMode === "grid" && "bg-background shadow-sm")}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn("h-7 px-2", viewMode === "list" && "bg-background shadow-sm")}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Flows Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-3 gap-4">
              {filteredFlows.map((flow) => (
                <Card
                  key={flow.id}
                  className={cn(
                    "group hover:border-primary/50 transition-all cursor-pointer",
                    flow.status === "error" && "border-red-500/30",
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "h-10 w-10 rounded-lg flex items-center justify-center",
                            flow.status === "active"
                              ? "bg-primary/20"
                              : flow.status === "error"
                                ? "bg-red-500/20"
                                : "bg-muted",
                          )}
                        >
                          <flow.trigger.icon
                            className={cn(
                              "h-5 w-5",
                              flow.status === "active"
                                ? "text-primary"
                                : flow.status === "error"
                                  ? "text-red-400"
                                  : "text-muted-foreground",
                            )}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm flex items-center gap-1">
                            {flow.name}
                            {flow.isFavorite && <Star className="h-3 w-3 text-amber-400 fill-amber-400" />}
                          </h3>
                          <p className="text-xs text-muted-foreground">{flow.trigger.label}</p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onOpenFlowBuilder?.(flow.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => duplicateFlow(flow)}>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleFavorite(flow.id)}>
                            {flow.isFavorite ? (
                              <>
                                <StarOff className="h-4 w-4 mr-2" />
                                Quitar favorito
                              </>
                            ) : (
                              <>
                                <Star className="h-4 w-4 mr-2" />
                                Agregar favorito
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedFlow(flow)
                              setShowRunHistory(true)
                            }}
                          >
                            <History className="h-4 w-4 mr-2" />
                            Ver historial
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileJson className="h-4 w-4 mr-2" />
                            Exportar JSON
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => archiveFlow(flow.id)}>
                            <Archive className="h-4 w-4 mr-2" />
                            Archivar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-400"
                            onClick={() => {
                              setSelectedFlow(flow)
                              setShowDeleteDialog(true)
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{flow.description}</p>

                    <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                      {flow.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 h-5">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Box className="h-3 w-3" />
                        {flow.nodesCount} nodos
                      </span>
                      <span className="flex items-center gap-1">
                        <Timer className="h-3 w-3" />
                        {flow.avgDuration}
                      </span>
                      <span className="flex items-center gap-1">
                        {getRunStatusIcon(flow.lastRunStatus)}
                        {flow.lastRun || "Sin ejecutar"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="flex items-center gap-2">{getStatusBadge(flow.status)}</div>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={flow.status === "active"}
                          onCheckedChange={() => toggleFlowStatus(flow.id)}
                          disabled={flow.status === "draft"}
                        />
                        <Button variant="ghost" size="sm" className="h-7" disabled={flow.status === "draft"}>
                          <Play className="h-3 w-3 mr-1" />
                          Ejecutar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50 text-xs text-muted-foreground">
                      <th className="text-left p-4 font-medium">Flow</th>
                      <th className="text-left p-4 font-medium">Trigger</th>
                      <th className="text-left p-4 font-medium">Estado</th>
                      <th className="text-left p-4 font-medium">Última ejecución</th>
                      <th className="text-left p-4 font-medium">Hoy</th>
                      <th className="text-left p-4 font-medium">Éxito</th>
                      <th className="text-left p-4 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFlows.map((flow) => (
                      <tr key={flow.id} className="border-b border-border/30 hover:bg-muted/20">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "h-9 w-9 rounded-lg flex items-center justify-center",
                                flow.status === "active" ? "bg-primary/20" : "bg-muted",
                              )}
                            >
                              <flow.trigger.icon className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-sm flex items-center gap-1">
                                {flow.name}
                                {flow.isFavorite && <Star className="h-3 w-3 text-amber-400 fill-amber-400" />}
                              </p>
                              <p className="text-xs text-muted-foreground">{flow.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="text-xs">
                            {flow.trigger.label}
                          </Badge>
                        </td>
                        <td className="p-4">{getStatusBadge(flow.status)}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-sm">
                            {getRunStatusIcon(flow.lastRunStatus)}
                            {flow.lastRun || "-"}
                          </div>
                        </td>
                        <td className="p-4 text-sm">{flow.runsToday}</td>
                        <td className="p-4">
                          <span
                            className={cn(
                              "text-sm font-medium",
                              flow.successRate >= 98
                                ? "text-emerald-400"
                                : flow.successRate >= 90
                                  ? "text-amber-400"
                                  : "text-red-400",
                            )}
                          >
                            {flow.successRate > 0 ? `${flow.successRate}%` : "-"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => onOpenFlowBuilder?.(flow.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={flow.status === "draft"}>
                              <Play className="h-4 w-4" />
                            </Button>
                            <Switch
                              checked={flow.status === "active"}
                              onCheckedChange={() => toggleFlowStatus(flow.id)}
                              disabled={flow.status === "draft"}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Templates pre-construidos para empezar rápidamente</p>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Crear Template
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="group hover:border-primary/50 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center">
                      <Layers className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                  </div>

                  <h3 className="font-semibold mb-1">{template.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Box className="h-3 w-3" />
                      {template.nodesCount} nodos
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {template.uses.toLocaleString()} usos
                    </span>
                  </div>

                  <Button className="w-full bg-transparent" variant="outline" onClick={() => onOpenFlowBuilder?.()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Usar Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <History className="h-5 w-5" />
                Historial de Ejecuciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-2">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/20"
                    >
                      <div className="flex items-center gap-3">
                        {i % 5 === 0 ? (
                          <XCircle className="h-5 w-5 text-red-400" />
                        ) : (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        )}
                        <div>
                          <p className="font-medium text-sm">{flows[i % flows.length].name}</p>
                          <p className="text-xs text-muted-foreground">
                            Hace {(i + 1) * 5} minutos • {(Math.random() * 5).toFixed(2)}s
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        <Button variant="ghost" size="sm">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Re-ejecutar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Ejecuciones por Día</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end gap-2">
                  {[65, 78, 92, 45, 88, 120, 95].map((value, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t"
                        style={{ height: `${(value / 120) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tasa de Éxito por Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {flows.slice(0, 5).map((flow) => (
                    <div key={flow.id} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="truncate max-w-[200px]">{flow.name}</span>
                        <span className="font-medium">{flow.successRate}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            flow.successRate >= 98
                              ? "bg-emerald-500"
                              : flow.successRate >= 90
                                ? "bg-amber-500"
                                : "bg-red-500",
                          )}
                          style={{ width: `${flow.successRate}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Flows por Ejecuciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                {flows
                  .sort((a, b) => b.runsTotal - a.runsTotal)
                  .slice(0, 5)
                  .map((flow, i) => (
                    <div key={flow.id} className="text-center p-4 rounded-lg bg-muted/30">
                      <div className="text-2xl font-bold text-primary mb-1">#{i + 1}</div>
                      <p className="text-sm font-medium truncate">{flow.name}</p>
                      <p className="text-xs text-muted-foreground">{flow.runsTotal.toLocaleString()} ejecuciones</p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Flow</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar "{selectedFlow?.name}"? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={deleteFlow}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar Flow</DialogTitle>
            <DialogDescription>Importa un flow desde un archivo JSON</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground mb-2">
                Arrastra un archivo JSON aquí o haz clic para seleccionar
              </p>
              <Button variant="outline" size="sm">
                Seleccionar archivo
              </Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">o pega el JSON directamente:</div>
            <Textarea placeholder='{"name": "Mi Flow", "nodes": [...]}' rows={5} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImportDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowImportDialog(false)}>Importar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exportar Flows</DialogTitle>
            <DialogDescription>Selecciona los flows que deseas exportar</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-64">
            <div className="space-y-2">
              {flowsList.map((flow) => (
                <label
                  key={flow.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 cursor-pointer"
                >
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">{flow.name}</span>
                </label>
              ))}
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowExportDialog(false)}>
              <Download className="h-4 w-4 mr-2" />
              Exportar JSON
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
