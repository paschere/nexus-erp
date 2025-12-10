"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LayoutDashboard,
  Plus,
  GripVertical,
  BarChart3,
  LineChart,
  PieChart,
  Table2,
  Hash,
  TrendingUp,
  Activity,
  Globe,
  Calendar,
  Users,
  DollarSign,
  Package,
  ShoppingCart,
  Trash2,
  Copy,
  Eye,
  Save,
  Undo,
  Redo,
  Smartphone,
  Monitor,
  Tablet,
  Sparkles,
  Download,
  Upload,
  Play,
  Pause,
  Minimize2,
  Layers,
  Type,
  ImageIcon,
  Clock,
  Target,
  Gauge,
  Map,
  List,
  Grid3X3,
  CircleDot,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Widget {
  id: string
  type: string
  title: string
  x: number
  y: number
  w: number
  h: number
  config: Record<string, any>
}

interface Dashboard {
  id: string
  name: string
  description: string
  widgets: Widget[]
  createdAt: string
  updatedAt: string
  isPublic: boolean
}

const widgetTypes = [
  { id: "kpi", icon: Hash, label: "KPI Card", category: "metrics" },
  { id: "trend", icon: TrendingUp, label: "Trend Card", category: "metrics" },
  { id: "gauge", icon: Gauge, label: "Gauge", category: "metrics" },
  { id: "progress", icon: Activity, label: "Progress", category: "metrics" },
  { id: "bar-chart", icon: BarChart3, label: "Bar Chart", category: "charts" },
  { id: "line-chart", icon: LineChart, label: "Line Chart", category: "charts" },
  { id: "pie-chart", icon: PieChart, label: "Pie Chart", category: "charts" },
  { id: "area-chart", icon: Activity, label: "Area Chart", category: "charts" },
  { id: "scatter", icon: CircleDot, label: "Scatter Plot", category: "charts" },
  { id: "table", icon: Table2, label: "Data Table", category: "data" },
  { id: "list", icon: List, label: "List", category: "data" },
  { id: "grid", icon: Grid3X3, label: "Data Grid", category: "data" },
  { id: "calendar", icon: Calendar, label: "Calendar", category: "data" },
  { id: "map", icon: Map, label: "Map", category: "data" },
  { id: "text", icon: Type, label: "Text Block", category: "content" },
  { id: "image", icon: ImageIcon, label: "Image", category: "content" },
  { id: "iframe", icon: Globe, label: "Embed/iFrame", category: "content" },
  { id: "clock", icon: Clock, label: "Clock", category: "content" },
]

const dataSources = [
  { id: "ventas", label: "Ventas", icon: ShoppingCart },
  { id: "clientes", label: "Clientes", icon: Users },
  { id: "inventario", label: "Inventario", icon: Package },
  { id: "finanzas", label: "Finanzas", icon: DollarSign },
  { id: "proyectos", label: "Proyectos", icon: Target },
  { id: "rrhh", label: "Recursos Humanos", icon: Users },
]

const savedDashboards: Dashboard[] = [
  {
    id: "1",
    name: "Dashboard Ejecutivo",
    description: "Vista general para gerencia",
    widgets: [],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    isPublic: true,
  },
  {
    id: "2",
    name: "KPIs de Ventas",
    description: "Métricas clave del equipo comercial",
    widgets: [],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    isPublic: false,
  },
  {
    id: "3",
    name: "Control de Inventario",
    description: "Monitoreo de stock y movimientos",
    widgets: [],
    createdAt: "2024-01-05",
    updatedAt: "2024-01-19",
    isPublic: true,
  },
]

export function DashboardBuilderModule() {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false)
  const [selectedDashboard, setSelectedDashboard] = useState<Dashboard | null>(null)
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: "1",
      type: "kpi",
      title: "Ventas Totales",
      x: 0,
      y: 0,
      w: 2,
      h: 1,
      config: { value: "$125,430", change: 12.5, prefix: "$" },
    },
    { id: "2", type: "kpi", title: "Clientes Nuevos", x: 2, y: 0, w: 2, h: 1, config: { value: "234", change: 8.2 } },
    { id: "3", type: "trend", title: "Crecimiento", x: 4, y: 0, w: 2, h: 1, config: { value: "23.5%", trend: "up" } },
    { id: "4", type: "bar-chart", title: "Ventas por Mes", x: 0, y: 1, w: 4, h: 2, config: {} },
    { id: "5", type: "pie-chart", title: "Distribución", x: 4, y: 1, w: 2, h: 2, config: {} },
    { id: "6", type: "table", title: "Últimas Transacciones", x: 0, y: 3, w: 6, h: 2, config: {} },
  ])
  const [selectedWidget, setSelectedWidget] = useState<Widget | null>(null)
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [isPreview, setIsPreview] = useState(false)
  const [draggedWidgetType, setDraggedWidgetType] = useState<string | null>(null)

  const addWidget = (type: string) => {
    const widgetType = widgetTypes.find((w) => w.id === type)
    const newWidget: Widget = {
      id: Date.now().toString(),
      type,
      title: widgetType?.label || "Nuevo Widget",
      x: 0,
      y: Math.max(...widgets.map((w) => w.y + w.h), 0),
      w: type.includes("chart") || type === "table" ? 3 : 2,
      h: type.includes("chart") || type === "table" ? 2 : 1,
      config: {},
    }
    setWidgets([...widgets, newWidget])
    setSelectedWidget(newWidget)
  }

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id))
    if (selectedWidget?.id === id) setSelectedWidget(null)
  }

  const duplicateWidget = (widget: Widget) => {
    const newWidget = {
      ...widget,
      id: Date.now().toString(),
      y: widget.y + widget.h,
    }
    setWidgets([...widgets, newWidget])
  }

  const renderWidgetPreview = (widget: Widget) => {
    switch (widget.type) {
      case "kpi":
        return (
          <div className="h-full flex flex-col justify-center p-4">
            <p className="text-3xl font-bold text-foreground">{widget.config.value || "0"}</p>
            {widget.config.change && (
              <div
                className={cn(
                  "flex items-center gap-1 text-sm",
                  widget.config.change > 0 ? "text-emerald-500" : "text-red-500",
                )}
              >
                {widget.config.change > 0 ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : (
                  <ArrowDownRight className="h-4 w-4" />
                )}
                <span>{Math.abs(widget.config.change)}%</span>
              </div>
            )}
          </div>
        )
      case "trend":
        return (
          <div className="h-full flex flex-col justify-center p-4">
            <div className="flex items-center gap-2">
              <TrendingUp
                className={cn("h-8 w-8", widget.config.trend === "up" ? "text-emerald-500" : "text-red-500")}
              />
              <span className="text-2xl font-bold">{widget.config.value || "0%"}</span>
            </div>
          </div>
        )
      case "gauge":
        return (
          <div className="h-full flex items-center justify-center p-4">
            <div className="relative w-24 h-24">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="75, 100"
                  className="text-primary"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">75%</span>
            </div>
          </div>
        )
      case "bar-chart":
        return (
          <div className="h-full flex items-end justify-around p-4 gap-2">
            {[60, 80, 45, 90, 70, 55].map((h, i) => (
              <div key={i} className="bg-primary/80 rounded-t w-full" style={{ height: `${h}%` }} />
            ))}
          </div>
        )
      case "line-chart":
        return (
          <div className="h-full flex items-center justify-center p-4">
            <svg className="w-full h-full" viewBox="0 0 100 50">
              <polyline
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
                points="0,40 20,35 40,20 60,30 80,15 100,25"
              />
            </svg>
          </div>
        )
      case "pie-chart":
        return (
          <div className="h-full flex items-center justify-center p-4">
            <svg className="w-20 h-20" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="40, 100"
                className="text-primary"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="30, 100"
                strokeDashoffset="-40"
                className="text-chart-2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="30, 100"
                strokeDashoffset="-70"
                className="text-chart-3"
              />
            </svg>
          </div>
        )
      case "table":
        return (
          <div className="h-full p-3 overflow-hidden">
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground border-b pb-2">
                <span>ID</span>
                <span>Cliente</span>
                <span>Monto</span>
                <span>Estado</span>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-4 gap-2 text-xs">
                  <span>#{1000 + i}</span>
                  <span>Cliente {i}</span>
                  <span>${(Math.random() * 1000).toFixed(0)}</span>
                  <Badge variant="outline" className="text-[10px] px-1">
                    Activo
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )
      case "text":
        return (
          <div className="h-full p-4">
            <p className="text-sm text-muted-foreground">Texto personalizado aquí...</p>
          </div>
        )
      case "clock":
        return (
          <div className="h-full flex items-center justify-center">
            <span className="text-2xl font-mono font-bold">{new Date().toLocaleTimeString()}</span>
          </div>
        )
      case "image":
        return (
          <div className="h-full flex items-center justify-center">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
          </div>
        )
      default:
        return (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <span className="text-sm">Widget Preview</span>
          </div>
        )
    }
  }

  if (isBuilderOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col">
        {/* Header */}
        <div className="h-14 border-b bg-card flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setIsBuilderOpen(false)}>
              <Minimize2 className="h-4 w-4 mr-2" />
              Cerrar
            </Button>
            <div className="h-6 w-px bg-border" />
            <Input value={selectedDashboard?.name || "Nuevo Dashboard"} className="w-64 h-8 bg-background" />
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "desktop" ? "secondary" : "ghost"}
                size="icon"
                className="h-7 w-7"
                onClick={() => setViewMode("desktop")}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "tablet" ? "secondary" : "ghost"}
                size="icon"
                className="h-7 w-7"
                onClick={() => setViewMode("tablet")}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "mobile" ? "secondary" : "ghost"}
                size="icon"
                className="h-7 w-7"
                onClick={() => setViewMode("mobile")}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            <div className="h-6 w-px bg-border" />

            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Redo className="h-4 w-4" />
            </Button>

            <div className="h-6 w-px bg-border" />

            <Button variant={isPreview ? "secondary" : "ghost"} size="sm" onClick={() => setIsPreview(!isPreview)}>
              {isPreview ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isPreview ? "Editar" : "Preview"}
            </Button>

            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>

            <Button size="sm" className="bg-primary text-primary-foreground">
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>
          </div>
        </div>

        {/* Builder Content */}
        <div className="flex-1 flex min-h-0">
          {/* Left Panel - Widgets */}
          {!isPreview && (
            <div className="w-72 border-r bg-card flex flex-col">
              <Tabs defaultValue="widgets" className="flex-1 flex flex-col">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-10 px-2">
                  <TabsTrigger value="widgets" className="text-xs">
                    Widgets
                  </TabsTrigger>
                  <TabsTrigger value="data" className="text-xs">
                    Datos
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="text-xs">
                    AI
                  </TabsTrigger>
                </TabsList>

                <ScrollArea className="flex-1">
                  <TabsContent value="widgets" className="p-3 m-0 space-y-4">
                    {/* Metrics */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">MÉTRICAS</p>
                      <div className="grid grid-cols-2 gap-2">
                        {widgetTypes
                          .filter((w) => w.category === "metrics")
                          .map((widget) => (
                            <button
                              key={widget.id}
                              onClick={() => addWidget(widget.id)}
                              className="flex flex-col items-center gap-1 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                            >
                              <widget.icon className="h-5 w-5 text-muted-foreground" />
                              <span className="text-xs">{widget.label}</span>
                            </button>
                          ))}
                      </div>
                    </div>

                    {/* Charts */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">GRÁFICOS</p>
                      <div className="grid grid-cols-2 gap-2">
                        {widgetTypes
                          .filter((w) => w.category === "charts")
                          .map((widget) => (
                            <button
                              key={widget.id}
                              onClick={() => addWidget(widget.id)}
                              className="flex flex-col items-center gap-1 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                            >
                              <widget.icon className="h-5 w-5 text-muted-foreground" />
                              <span className="text-xs">{widget.label}</span>
                            </button>
                          ))}
                      </div>
                    </div>

                    {/* Data */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">DATOS</p>
                      <div className="grid grid-cols-2 gap-2">
                        {widgetTypes
                          .filter((w) => w.category === "data")
                          .map((widget) => (
                            <button
                              key={widget.id}
                              onClick={() => addWidget(widget.id)}
                              className="flex flex-col items-center gap-1 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                            >
                              <widget.icon className="h-5 w-5 text-muted-foreground" />
                              <span className="text-xs">{widget.label}</span>
                            </button>
                          ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">CONTENIDO</p>
                      <div className="grid grid-cols-2 gap-2">
                        {widgetTypes
                          .filter((w) => w.category === "content")
                          .map((widget) => (
                            <button
                              key={widget.id}
                              onClick={() => addWidget(widget.id)}
                              className="flex flex-col items-center gap-1 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                            >
                              <widget.icon className="h-5 w-5 text-muted-foreground" />
                              <span className="text-xs">{widget.label}</span>
                            </button>
                          ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="data" className="p-3 m-0 space-y-3">
                    <p className="text-xs font-medium text-muted-foreground">FUENTES DE DATOS</p>
                    {dataSources.map((source) => (
                      <button
                        key={source.id}
                        className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all"
                      >
                        <source.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{source.label}</span>
                      </button>
                    ))}
                  </TabsContent>

                  <TabsContent value="ai" className="p-3 m-0 space-y-3">
                    <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">Generar con AI</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        Describe el dashboard que necesitas y la AI lo creará automáticamente.
                      </p>
                      <textarea
                        placeholder="Ej: Un dashboard de ventas con KPIs de ingresos, gráfico de tendencias mensuales y tabla de top productos..."
                        className="w-full h-24 text-sm p-2 rounded border bg-background resize-none"
                      />
                      <Button size="sm" className="w-full mt-2">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generar Dashboard
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">TEMPLATES AI</p>
                      {["Dashboard Ejecutivo", "Análisis de Ventas", "Control Financiero", "Métricas de RRHH"].map(
                        (template) => (
                          <button
                            key={template}
                            className="w-full text-left p-3 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all"
                          >
                            <span className="text-sm">{template}</span>
                          </button>
                        ),
                      )}
                    </div>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </div>
          )}

          {/* Canvas */}
          <div className="flex-1 bg-muted/30 p-6 overflow-auto">
            <div
              className={cn(
                "mx-auto bg-card rounded-xl border shadow-sm min-h-full transition-all",
                viewMode === "desktop" && "w-full max-w-6xl",
                viewMode === "tablet" && "w-[768px]",
                viewMode === "mobile" && "w-[375px]",
              )}
            >
              <div className="p-4 grid grid-cols-6 gap-4 auto-rows-[120px]">
                {widgets.map((widget) => {
                  const widgetType = widgetTypes.find((w) => w.id === widget.type)
                  return (
                    <div
                      key={widget.id}
                      onClick={() => !isPreview && setSelectedWidget(widget)}
                      className={cn(
                        "rounded-lg border bg-background transition-all cursor-pointer group relative",
                        !isPreview && "hover:border-primary",
                        selectedWidget?.id === widget.id && "ring-2 ring-primary border-primary",
                      )}
                      style={{
                        gridColumn: `span ${widget.w}`,
                        gridRow: `span ${widget.h}`,
                      }}
                    >
                      {!isPreview && (
                        <>
                          <div className="absolute -top-2 left-2 px-2 py-0.5 bg-muted rounded text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            {widget.title}
                          </div>
                          <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={(e) => {
                                e.stopPropagation()
                                duplicateWidget(widget)
                              }}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 text-destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeWidget(widget.id)
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                            <GripVertical className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </>
                      )}
                      {renderWidgetPreview(widget)}
                    </div>
                  )
                })}

                {/* Add Widget Placeholder */}
                {!isPreview && (
                  <button
                    onClick={() => addWidget("kpi")}
                    className="rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-all col-span-2"
                  >
                    <Plus className="h-6 w-6" />
                    <span className="text-sm">Agregar Widget</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Properties */}
          {!isPreview && selectedWidget && (
            <div className="w-72 border-l bg-card">
              <div className="p-3 border-b">
                <h3 className="font-medium text-sm">Propiedades del Widget</h3>
              </div>
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <div className="p-3 space-y-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Título</label>
                    <Input
                      value={selectedWidget.title}
                      onChange={(e) => {
                        setWidgets(
                          widgets.map((w) => (w.id === selectedWidget.id ? { ...w, title: e.target.value } : w)),
                        )
                        setSelectedWidget({ ...selectedWidget, title: e.target.value })
                      }}
                      className="mt-1 h-8"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Ancho</label>
                      <Select
                        value={String(selectedWidget.w)}
                        onValueChange={(v) => {
                          const newW = Number.parseInt(v)
                          setWidgets(widgets.map((w) => (w.id === selectedWidget.id ? { ...w, w: newW } : w)))
                          setSelectedWidget({ ...selectedWidget, w: newW })
                        }}
                      >
                        <SelectTrigger className="mt-1 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <SelectItem key={n} value={String(n)}>
                              {n} columnas
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">Alto</label>
                      <Select
                        value={String(selectedWidget.h)}
                        onValueChange={(v) => {
                          const newH = Number.parseInt(v)
                          setWidgets(widgets.map((w) => (w.id === selectedWidget.id ? { ...w, h: newH } : w)))
                          setSelectedWidget({ ...selectedWidget, h: newH })
                        }}
                      >
                        <SelectTrigger className="mt-1 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4].map((n) => (
                            <SelectItem key={n} value={String(n)}>
                              {n} filas
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Fuente de Datos</label>
                    <Select>
                      <SelectTrigger className="mt-1 h-8">
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent>
                        {dataSources.map((source) => (
                          <SelectItem key={source.id} value={source.id}>
                            {source.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedWidget.type === "kpi" && (
                    <>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Valor</label>
                        <Input
                          value={selectedWidget.config.value || ""}
                          onChange={(e) => {
                            const newConfig = { ...selectedWidget.config, value: e.target.value }
                            setWidgets(
                              widgets.map((w) => (w.id === selectedWidget.id ? { ...w, config: newConfig } : w)),
                            )
                            setSelectedWidget({ ...selectedWidget, config: newConfig })
                          }}
                          className="mt-1 h-8"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Cambio (%)</label>
                        <Input
                          type="number"
                          value={selectedWidget.config.change || ""}
                          onChange={(e) => {
                            const newConfig = { ...selectedWidget.config, change: Number.parseFloat(e.target.value) }
                            setWidgets(
                              widgets.map((w) => (w.id === selectedWidget.id ? { ...w, config: newConfig } : w)),
                            )
                            setSelectedWidget({ ...selectedWidget, config: newConfig })
                          }}
                          className="mt-1 h-8"
                        />
                      </div>
                    </>
                  )}

                  <div className="pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-destructive bg-transparent"
                      onClick={() => removeWidget(selectedWidget.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar Widget
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Builder</h1>
          <p className="text-muted-foreground">Crea dashboards personalizados con widgets drag-and-drop</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button onClick={() => setIsBuilderOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Dashboard
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <LayoutDashboard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Dashboards</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
                <Layers className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">48</p>
                <p className="text-xs text-muted-foreground">Widgets Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Compartidos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                <Eye className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold">1.2k</p>
                <p className="text-xs text-muted-foreground">Vistas este mes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboards Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Mis Dashboards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savedDashboards.map((dashboard) => (
            <Card
              key={dashboard.id}
              className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => {
                setSelectedDashboard(dashboard)
                setIsBuilderOpen(true)
              }}
            >
              <CardContent className="p-0">
                <div className="h-32 bg-muted rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <div className="grid grid-cols-3 gap-1 p-3 w-full h-full opacity-50">
                    <div className="bg-primary/30 rounded" />
                    <div className="bg-chart-2/30 rounded" />
                    <div className="bg-chart-3/30 rounded" />
                    <div className="bg-chart-4/30 rounded col-span-2" />
                    <div className="bg-chart-5/30 rounded" />
                  </div>
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Abrir
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">{dashboard.name}</h3>
                    {dashboard.isPublic && (
                      <Badge variant="outline" className="text-xs">
                        Público
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{dashboard.description}</p>
                  <p className="text-xs text-muted-foreground">Actualizado: {dashboard.updatedAt}</p>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* New Dashboard Card */}
          <Card
            className="bg-card border-dashed border-2 hover:border-primary transition-all cursor-pointer"
            onClick={() => setIsBuilderOpen(true)}
          >
            <CardContent className="h-full flex flex-col items-center justify-center p-6 text-muted-foreground hover:text-primary transition-colors">
              <Plus className="h-12 w-12 mb-2" />
              <p className="font-medium">Crear Dashboard</p>
              <p className="text-sm">Empieza desde cero o usa AI</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
