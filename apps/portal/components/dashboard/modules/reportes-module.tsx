"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  BarChart3,
  Download,
  Clock,
  Star,
  Search,
  Plus,
  Play,
  Eye,
  Edit,
  Trash2,
  Share2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  PieChart,
  LineChart,
  Table,
  Sparkles,
  Database,
  Columns,
  Filter,
  SortAsc,
  SortDesc,
  Layers,
  RefreshCw,
  Settings2,
  Palette,
  Maximize2,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Globe,
  X,
  GripVertical,
  LayoutGrid,
  AreaChart,
  ScatterChart,
  Activity,
  Target,
  Gauge,
  Map,
  Save,
  Upload,
  FolderOpen,
  History,
  Wand2,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Data for charts
const ventasMensuales = [
  { mes: "Ene", ventas: 45000000, meta: 40000000 },
  { mes: "Feb", ventas: 52000000, meta: 45000000 },
  { mes: "Mar", ventas: 48000000, meta: 50000000 },
  { mes: "Abr", ventas: 61000000, meta: 55000000 },
  { mes: "May", ventas: 55000000, meta: 55000000 },
  { mes: "Jun", ventas: 67000000, meta: 60000000 },
]

const ventasPorCategoria = [
  { categoria: "Electrónicos", valor: 35, color: "#2dd4bf" },
  { categoria: "Ropa", valor: 25, color: "#818cf8" },
  { categoria: "Hogar", valor: 20, color: "#fb7185" },
  { categoria: "Deportes", valor: 12, color: "#fbbf24" },
  { categoria: "Otros", valor: 8, color: "#94a3b8" },
]

const topProductos = [
  { nombre: "iPhone 15 Pro", ventas: 234, ingresos: 456000000, tendencia: 12 },
  { nombre: "MacBook Air M3", ventas: 156, ingresos: 389000000, tendencia: 8 },
  { nombre: "AirPods Pro", ventas: 312, ingresos: 234000000, tendencia: -3 },
  { nombre: "iPad Pro", ventas: 89, ingresos: 178000000, tendencia: 15 },
  { nombre: "Apple Watch", ventas: 201, ingresos: 156000000, tendencia: 5 },
]

const kpiData = [
  {
    id: "ventas",
    titulo: "Ventas del Mes",
    valor: "$324.5M",
    cambio: 12.5,
    tendencia: "up",
    sparkline: [40, 45, 42, 55, 48, 62, 58, 70, 65, 72, 78, 85],
  },
  {
    id: "ordenes",
    titulo: "Órdenes",
    valor: "1,847",
    cambio: 8.2,
    tendencia: "up",
    sparkline: [20, 25, 22, 30, 28, 35, 32, 40, 38, 42, 45, 48],
  },
  {
    id: "clientes",
    titulo: "Clientes Nuevos",
    valor: "234",
    cambio: -2.4,
    tendencia: "down",
    sparkline: [30, 28, 32, 25, 28, 22, 25, 20, 22, 18, 20, 15],
  },
  {
    id: "ticket",
    titulo: "Ticket Promedio",
    valor: "$175,650",
    cambio: 4.1,
    tendencia: "up",
    sparkline: [50, 52, 48, 55, 53, 58, 56, 60, 58, 62, 65, 68],
  },
]

const dataTables = [
  {
    id: "ventas",
    name: "Ventas",
    icon: ShoppingCart,
    color: "text-green-400",
    fields: [
      { id: "v1", name: "ID Venta", type: "number" },
      { id: "v2", name: "Fecha", type: "date" },
      { id: "v3", name: "Cliente", type: "relation" },
      { id: "v4", name: "Productos", type: "array" },
      { id: "v5", name: "Subtotal", type: "currency" },
      { id: "v6", name: "IVA", type: "currency" },
      { id: "v7", name: "Total", type: "currency" },
      { id: "v8", name: "Vendedor", type: "relation" },
      { id: "v9", name: "Estado", type: "status" },
      { id: "v10", name: "Método Pago", type: "enum" },
      { id: "v11", name: "Punto de Venta", type: "relation" },
    ],
  },
  {
    id: "clientes",
    name: "Clientes",
    icon: Users,
    color: "text-blue-400",
    fields: [
      { id: "c1", name: "NIT/CC", type: "string" },
      { id: "c2", name: "Razón Social", type: "string" },
      { id: "c3", name: "Email", type: "email" },
      { id: "c4", name: "Teléfono", type: "phone" },
      { id: "c5", name: "Ciudad", type: "string" },
      { id: "c6", name: "Departamento", type: "string" },
      { id: "c7", name: "Segmento", type: "enum" },
      { id: "c8", name: "Crédito Aprobado", type: "currency" },
      { id: "c9", name: "Saldo Cartera", type: "currency" },
      { id: "c10", name: "Días Mora", type: "number" },
    ],
  },
  {
    id: "productos",
    name: "Productos",
    icon: Package,
    color: "text-orange-400",
    fields: [
      { id: "p1", name: "SKU", type: "string" },
      { id: "p2", name: "Nombre", type: "string" },
      { id: "p3", name: "Categoría", type: "relation" },
      { id: "p4", name: "Precio Venta", type: "currency" },
      { id: "p5", name: "Costo", type: "currency" },
      { id: "p6", name: "Margen %", type: "percent" },
      { id: "p7", name: "Stock Total", type: "number" },
      { id: "p8", name: "Stock Mínimo", type: "number" },
      { id: "p9", name: "Proveedor", type: "relation" },
    ],
  },
  {
    id: "inventario",
    name: "Inventario",
    icon: Layers,
    color: "text-purple-400",
    fields: [
      { id: "i1", name: "Producto", type: "relation" },
      { id: "i2", name: "Bodega", type: "relation" },
      { id: "i3", name: "Lote", type: "string" },
      { id: "i4", name: "Stock Actual", type: "number" },
      { id: "i5", name: "Reservado", type: "number" },
      { id: "i6", name: "Disponible", type: "number" },
      { id: "i7", name: "Costo Promedio", type: "currency" },
      { id: "i8", name: "Fecha Vencimiento", type: "date" },
    ],
  },
  {
    id: "contabilidad",
    name: "Contabilidad",
    icon: DollarSign,
    color: "text-teal-400",
    fields: [
      { id: "ct1", name: "Cuenta PUC", type: "string" },
      { id: "ct2", name: "Descripción", type: "string" },
      { id: "ct3", name: "Débito", type: "currency" },
      { id: "ct4", name: "Crédito", type: "currency" },
      { id: "ct5", name: "Saldo", type: "currency" },
      { id: "ct6", name: "Centro Costo", type: "relation" },
      { id: "ct7", name: "Tercero", type: "relation" },
      { id: "ct8", name: "Fecha", type: "date" },
    ],
  },
  {
    id: "nomina",
    name: "Nómina",
    icon: Users,
    color: "text-pink-400",
    fields: [
      { id: "n1", name: "Empleado", type: "relation" },
      { id: "n2", name: "Período", type: "string" },
      { id: "n3", name: "Salario Base", type: "currency" },
      { id: "n4", name: "Horas Extras", type: "number" },
      { id: "n5", name: "Bonificaciones", type: "currency" },
      { id: "n6", name: "Deducciones", type: "currency" },
      { id: "n7", name: "Neto a Pagar", type: "currency" },
    ],
  },
]

const visualizationTypes = [
  { id: "table", name: "Tabla", icon: Table, description: "Datos tabulares con ordenamiento y filtros" },
  { id: "bar", name: "Barras", icon: BarChart3, description: "Comparar valores entre categorías" },
  { id: "line", name: "Líneas", icon: LineChart, description: "Tendencias a lo largo del tiempo" },
  { id: "area", name: "Área", icon: AreaChart, description: "Volumen acumulado en el tiempo" },
  { id: "pie", name: "Torta", icon: PieChart, description: "Distribución porcentual" },
  { id: "scatter", name: "Dispersión", icon: ScatterChart, description: "Correlación entre variables" },
  { id: "kpi", name: "KPI Card", icon: Target, description: "Métricas con indicadores" },
  { id: "gauge", name: "Gauge", icon: Gauge, description: "Progreso hacia una meta" },
  { id: "map", name: "Mapa", icon: Map, description: "Datos geográficos" },
  { id: "funnel", name: "Embudo", icon: Activity, description: "Pipeline y conversión" },
]

const aggregations = [
  { id: "sum", name: "Suma", icon: "Σ" },
  { id: "avg", name: "Promedio", icon: "x̄" },
  { id: "count", name: "Contar", icon: "#" },
  { id: "min", name: "Mínimo", icon: "↓" },
  { id: "max", name: "Máximo", icon: "↑" },
  { id: "distinct", name: "Únicos", icon: "∪" },
]

const savedReports = [
  {
    id: "1",
    nombre: "Dashboard Ejecutivo",
    descripcion: "KPIs principales del negocio",
    tipo: "dashboard",
    modulo: "General",
    ultimaEjecucion: "Hace 5 min",
    programado: "Cada hora",
    favorito: true,
    compartido: true,
    vistas: 1247,
  },
  {
    id: "2",
    nombre: "Ventas por Vendedor",
    descripcion: "Rendimiento del equipo comercial",
    tipo: "bar",
    modulo: "Ventas",
    ultimaEjecucion: "Hace 1 hora",
    programado: "Diario",
    favorito: true,
    compartido: false,
    vistas: 856,
  },
  {
    id: "3",
    nombre: "Cartera por Edades",
    descripcion: "Análisis de cuentas por cobrar",
    tipo: "table",
    modulo: "Contabilidad",
    ultimaEjecucion: "Ayer",
    programado: null,
    favorito: false,
    compartido: true,
    vistas: 432,
  },
  {
    id: "4",
    nombre: "Inventario Crítico",
    descripcion: "Productos bajo stock mínimo",
    tipo: "table",
    modulo: "Inventario",
    ultimaEjecucion: "Hace 2 horas",
    programado: "Cada 6 horas",
    favorito: true,
    compartido: false,
    vistas: 678,
  },
  {
    id: "5",
    nombre: "Rentabilidad por Producto",
    descripcion: "Análisis de márgenes",
    tipo: "scatter",
    modulo: "Ventas",
    ultimaEjecucion: "Hace 3 días",
    programado: "Semanal",
    favorito: false,
    compartido: true,
    vistas: 234,
  },
]

interface SelectedField {
  id: string
  name: string
  type: string
  tableId: string
  aggregation?: string
}

export function ReportesModule() {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTable, setSelectedTable] = useState<string>("ventas")
  const [selectedFields, setSelectedFields] = useState<SelectedField[]>([])
  const [visualizationType, setVisualizationType] = useState<string>("table")
  const [groupByField, setGroupByField] = useState<string>("")
  const [sortField, setSortField] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [filters, setFilters] = useState<any[]>([])
  const [isPreview, setIsPreview] = useState(false)
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")
  const [reportName, setReportName] = useState("Nuevo Reporte")

  const currentTable = dataTables.find((t) => t.id === selectedTable)

  const toggleField = (field: any) => {
    const exists = selectedFields.find((f) => f.id === field.id)
    if (exists) {
      setSelectedFields(selectedFields.filter((f) => f.id !== field.id))
    } else {
      setSelectedFields([
        ...selectedFields,
        {
          ...field,
          tableId: selectedTable,
          aggregation: undefined,
        },
      ])
    }
  }

  const setFieldAggregation = (fieldId: string, agg: string) => {
    setSelectedFields(selectedFields.map((f) => (f.id === fieldId ? { ...f, aggregation: agg } : f)))
  }

  const addFilter = () => {
    setFilters([...filters, { field: "", operator: "=", value: "" }])
  }

  const removeFilter = (idx: number) => {
    setFilters(filters.filter((_, i) => i !== idx))
  }

  const generateAIReport = () => {
    // Simular generación con AI
    if (aiPrompt.toLowerCase().includes("ventas")) {
      setSelectedTable("ventas")
      setSelectedFields([
        { id: "v2", name: "Fecha", type: "date", tableId: "ventas" },
        { id: "v7", name: "Total", type: "currency", tableId: "ventas", aggregation: "sum" },
        { id: "v8", name: "Vendedor", type: "relation", tableId: "ventas" },
      ])
      setVisualizationType("bar")
      setGroupByField("v8")
    } else if (aiPrompt.toLowerCase().includes("inventario")) {
      setSelectedTable("inventario")
      setSelectedFields([
        { id: "i1", name: "Producto", type: "relation", tableId: "inventario" },
        { id: "i4", name: "Stock Actual", type: "number", tableId: "inventario" },
        { id: "i5", name: "Reservado", type: "number", tableId: "inventario" },
        { id: "i6", name: "Disponible", type: "number", tableId: "inventario" },
      ])
      setVisualizationType("table")
      setFilters([{ field: "i6", operator: "<", value: "10" }])
    }
    setShowAIPanel(false)
  }

  // Sparkline component
  const Sparkline = ({ data, color = "#2dd4bf" }: { data: number[]; color?: string }) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    const points = data
      .map((v, i) => {
        const x = (i / (data.length - 1)) * 100
        const y = 100 - ((v - min) / range) * 100
        return `${x},${y}`
      })
      .join(" ")

    return (
      <svg className="w-full h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
      </svg>
    )
  }

  // Render chart preview based on type
  const renderChartPreview = () => {
    if (selectedFields.length === 0) {
      return (
        <div className="h-80 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-xl">
          <Database className="h-16 w-16 mb-4 opacity-20" />
          <p className="text-lg font-medium">Selecciona campos para visualizar</p>
          <p className="text-sm">Arrastra campos desde el panel izquierdo</p>
        </div>
      )
    }

    switch (visualizationType) {
      case "table":
        return (
          <div className="border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  {selectedFields.map((field) => (
                    <th key={field.id} className="text-left p-4 font-medium border-b">
                      <div className="flex items-center gap-2">
                        {field.name}
                        {field.aggregation && (
                          <Badge variant="secondary" className="text-[10px]">
                            {aggregations.find((a) => a.id === field.aggregation)?.name}
                          </Badge>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7].map((row) => (
                  <tr key={row} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    {selectedFields.map((field) => (
                      <td key={field.id} className="p-4">
                        {field.type === "currency" ? (
                          `$${(Math.random() * 10000000).toLocaleString("es-CO", { maximumFractionDigits: 0 })}`
                        ) : field.type === "number" ? (
                          Math.floor(Math.random() * 1000).toLocaleString()
                        ) : field.type === "date" ? (
                          `2024-01-${10 + row}`
                        ) : field.type === "percent" ? (
                          `${(Math.random() * 40 + 10).toFixed(1)}%`
                        ) : field.type === "status" ? (
                          <Badge variant={row % 3 === 0 ? "default" : "secondary"}>
                            {row % 3 === 0 ? "Completado" : "Pendiente"}
                          </Badge>
                        ) : (
                          `Registro ${row}`
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )

      case "bar":
        return (
          <div className="h-80 flex items-end justify-around p-6 border rounded-xl bg-gradient-to-b from-muted/20 to-muted/5">
            {ventasMensuales.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group">
                <div className="relative">
                  <div
                    className="w-14 bg-gradient-to-t from-primary to-primary/60 rounded-t-lg transition-all group-hover:from-primary/90 group-hover:to-primary/50 shadow-lg shadow-primary/20"
                    style={{ height: `${(item.ventas / 70000000) * 250}px` }}
                  />
                  <div
                    className="absolute bottom-0 left-0 w-14 border-2 border-dashed border-yellow-500/50 rounded-t-lg"
                    style={{ height: `${(item.meta / 70000000) * 250}px` }}
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground">{item.mes}</span>
              </div>
            ))}
          </div>
        )

      case "line":
        return (
          <div className="h-80 p-6 border rounded-xl bg-gradient-to-b from-muted/20 to-muted/5">
            <svg className="w-full h-full" viewBox="0 0 600 250" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={i} x1="0" y1={i * 62.5} x2="600" y2={i * 62.5} stroke="currentColor" strokeOpacity="0.1" />
              ))}
              {/* Area fill */}
              <path
                d="M0,200 L100,150 L200,170 L300,100 L400,120 L500,60 L600,40 L600,250 L0,250 Z"
                fill="url(#areaGradient)"
              />
              {/* Main line */}
              <path
                d="M0,200 L100,150 L200,170 L300,100 L400,120 L500,60 L600,40"
                fill="none"
                stroke="#2dd4bf"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Data points */}
              {[
                [0, 200],
                [100, 150],
                [200, 170],
                [300, 100],
                [400, 120],
                [500, 60],
                [600, 40],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="6" fill="#2dd4bf" stroke="#0f172a" strokeWidth="2" />
              ))}
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )

      case "pie":
        return (
          <div className="h-80 flex items-center justify-center p-6 border rounded-xl bg-gradient-to-b from-muted/20 to-muted/5">
            <div className="relative">
              <svg className="w-64 h-64 -rotate-90" viewBox="0 0 36 36">
                {
                  ventasPorCategoria.reduce(
                    (acc, item, i) => {
                      const offset = acc.offset
                      acc.elements.push(
                        <circle
                          key={i}
                          cx="18"
                          cy="18"
                          r="15.9155"
                          fill="none"
                          stroke={item.color}
                          strokeWidth="3.5"
                          strokeDasharray={`${item.valor} ${100 - item.valor}`}
                          strokeDashoffset={-offset}
                          className="transition-all duration-500 hover:opacity-80"
                        />,
                      )
                      acc.offset += item.valor
                      return acc
                    },
                    { elements: [] as JSX.Element[], offset: 0 },
                  ).elements
                }
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold">$324M</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </div>
            <div className="ml-8 space-y-2">
              {ventasPorCategoria.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.categoria}</span>
                  <span className="text-sm font-medium ml-auto">{item.valor}%</span>
                </div>
              ))}
            </div>
          </div>
        )

      case "kpi":
        return (
          <div className="grid grid-cols-2 gap-4">
            {kpiData.map((kpi) => (
              <Card key={kpi.id} className="bg-gradient-to-br from-card to-muted/20 border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{kpi.titulo}</p>
                      <p className="text-3xl font-bold mt-1">{kpi.valor}</p>
                    </div>
                    <div
                      className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                        kpi.tendencia === "up" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400",
                      )}
                    >
                      {kpi.tendencia === "up" ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      {kpi.cambio}%
                    </div>
                  </div>
                  <Sparkline data={kpi.sparkline} color={kpi.tendencia === "up" ? "#22c55e" : "#ef4444"} />
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case "gauge":
        return (
          <div className="h-80 flex items-center justify-center gap-8 p-6 border rounded-xl bg-gradient-to-b from-muted/20 to-muted/5">
            {[
              { label: "Ventas vs Meta", value: 85, color: "#2dd4bf" },
              { label: "Margen Bruto", value: 62, color: "#818cf8" },
              { label: "Satisfacción", value: 91, color: "#22c55e" },
            ].map((gauge, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke="currentColor"
                      strokeOpacity="0.1"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9155"
                      fill="none"
                      stroke={gauge.color}
                      strokeWidth="3"
                      strokeDasharray={`${gauge.value} ${100 - gauge.value}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{gauge.value}%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{gauge.label}</p>
              </div>
            ))}
          </div>
        )

      default:
        return (
          <div className="h-80 flex items-center justify-center border rounded-xl bg-muted/20">
            <p className="text-muted-foreground">Visualización: {visualizationType}</p>
          </div>
        )
    }
  }

  // Builder fullscreen mode
  if (isBuilderOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col">
        {/* Header */}
        <div className="h-14 border-b bg-card/95 backdrop-blur flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setIsBuilderOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cerrar
            </Button>
            <div className="h-6 w-px bg-border" />
            <Input
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              className="w-64 h-8 bg-muted/50 border-transparent focus:border-primary"
            />
            <Badge variant="secondary">Borrador</Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={showAIPanel ? "secondary" : "outline"}
              size="sm"
              onClick={() => setShowAIPanel(!showAIPanel)}
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              AI Assistant
            </Button>
            <div className="h-6 w-px bg-border" />
            <Button variant="ghost" size="sm">
              <History className="h-4 w-4 mr-2" />
              Historial
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Compartir
            </Button>
            <Button variant="ghost" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Programar
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>
          </div>
        </div>

        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* Left Panel - Data Sources */}
          <div className="w-80 border-r bg-card/50 flex flex-col shrink-0">
            <div className="p-3 border-b">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                Fuentes de Datos
              </h3>
            </div>

            <Tabs defaultValue="tables" className="flex-1 flex flex-col min-h-0">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-10 px-2 shrink-0">
                <TabsTrigger value="tables" className="text-xs">
                  Tablas
                </TabsTrigger>
                <TabsTrigger value="custom" className="text-xs">
                  SQL
                </TabsTrigger>
                <TabsTrigger value="api" className="text-xs">
                  API
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tables" className="flex-1 m-0 overflow-hidden flex flex-col min-h-0">
                <div className="p-3 border-b shrink-0">
                  <Select value={selectedTable} onValueChange={setSelectedTable}>
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dataTables.map((table) => (
                        <SelectItem key={table.id} value={table.id}>
                          <div className="flex items-center gap-2">
                            <table.icon className={cn("h-4 w-4", table.color)} />
                            {table.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <ScrollArea className="flex-1">
                  <div className="p-3 space-y-1">
                    <p className="text-xs font-medium text-muted-foreground mb-2 px-1">CAMPOS DISPONIBLES</p>
                    {currentTable?.fields.map((field) => {
                      const isSelected = selectedFields.find((f) => f.id === field.id)
                      return (
                        <button
                          key={field.id}
                          onClick={() => toggleField(field)}
                          className={cn(
                            "w-full flex items-center gap-2 p-2.5 rounded-lg text-left text-sm transition-all",
                            isSelected
                              ? "bg-primary/15 text-primary border border-primary/30"
                              : "hover:bg-muted border border-transparent",
                          )}
                        >
                          <Checkbox checked={!!isSelected} className="pointer-events-none" />
                          <Columns className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="flex-1 truncate">{field.name}</span>
                          <Badge variant="outline" className="text-[10px] shrink-0">
                            {field.type}
                          </Badge>
                        </button>
                      )
                    })}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="custom" className="flex-1 m-0 p-3">
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">Escribe una consulta SQL personalizada</p>
                  <textarea
                    placeholder="SELECT * FROM ventas WHERE fecha >= '2024-01-01'"
                    className="w-full h-40 p-3 rounded-lg border bg-muted/50 text-sm font-mono resize-none"
                  />
                  <Button size="sm" className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Ejecutar Query
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="api" className="flex-1 m-0 p-3">
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">Conecta con una API externa</p>
                  <Input placeholder="https://api.ejemplo.com/data" className="h-9" />
                  <Select>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Método" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="get">GET</SelectItem>
                      <SelectItem value="post">POST</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="sm" className="w-full">
                    <Globe className="h-4 w-4 mr-2" />
                    Conectar
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Center - Canvas */}
          <div className="flex-1 bg-muted/20 flex flex-col min-h-0 overflow-hidden">
            {/* Visualization type selector */}
            <div className="p-4 border-b bg-card/30 shrink-0">
              <div className="flex items-center gap-2 flex-wrap">
                {visualizationTypes.slice(0, 8).map((viz) => (
                  <Button
                    key={viz.id}
                    variant={visualizationType === viz.id ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setVisualizationType(viz.id)}
                    className="gap-2"
                  >
                    <viz.icon className="h-4 w-4" />
                    {viz.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Preview area */}
            <div className="flex-1 p-6 overflow-auto">
              <Card className="bg-card border-border/50 shadow-xl">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{reportName}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedFields.length} campos seleccionados • {currentTable?.name || "Sin fuente"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Maximize2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">{renderChartPreview()}</CardContent>
              </Card>
            </div>
          </div>

          {/* Right Panel - Configuration */}
          <div className="w-80 border-l bg-card/50 flex flex-col shrink-0">
            <div className="p-3 border-b">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-primary" />
                Configuración
              </h3>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-3 space-y-6">
                {/* Selected Fields */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Columns className="h-3 w-3" />
                    CAMPOS SELECCIONADOS
                  </p>
                  {selectedFields.length > 0 ? (
                    <div className="space-y-2">
                      {selectedFields.map((field, idx) => (
                        <div key={field.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border">
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                          <span className="text-sm flex-1 truncate">{field.name}</span>
                          {(field.type === "number" || field.type === "currency") && (
                            <Select
                              value={field.aggregation || "none"}
                              onValueChange={(v) => setFieldAggregation(field.id, v)}
                            >
                              <SelectTrigger className="h-7 w-20 text-xs">
                                <SelectValue placeholder="Agg" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">-</SelectItem>
                                {aggregations.map((agg) => (
                                  <SelectItem key={agg.id} value={agg.id}>
                                    {agg.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 shrink-0"
                            onClick={() => toggleField(field)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">No hay campos seleccionados</p>
                  )}
                </div>

                {/* Group By */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <Layers className="h-3 w-3" />
                    AGRUPAR POR
                  </p>
                  <Select value={groupByField} onValueChange={setGroupByField}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Seleccionar campo..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sin agrupación</SelectItem>
                      {selectedFields.map((f) => (
                        <SelectItem key={f.id} value={f.id}>
                          {f.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
                    <SortAsc className="h-3 w-3" />
                    ORDENAR POR
                  </p>
                  <div className="flex gap-2">
                    <Select value={sortField} onValueChange={setSortField}>
                      <SelectTrigger className="h-9 flex-1">
                        <SelectValue placeholder="Campo..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Sin ordenar</SelectItem>
                        {selectedFields.map((f) => (
                          <SelectItem key={f.id} value={f.id}>
                            {f.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 shrink-0 bg-transparent"
                      onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                    >
                      {sortDirection === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Filters */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                      <Filter className="h-3 w-3" />
                      FILTROS
                    </p>
                    <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={addFilter}>
                      <Plus className="h-3 w-3 mr-1" />
                      Agregar
                    </Button>
                  </div>
                  {filters.length > 0 ? (
                    <div className="space-y-2">
                      {filters.map((filter, idx) => (
                        <div key={idx} className="flex items-center gap-1 p-2 rounded-lg bg-muted/50 border">
                          <Select
                            value={filter.field || "default"}
                            onValueChange={(v) => {
                              const newFilters = [...filters]
                              newFilters[idx].field = v
                              setFilters(newFilters)
                            }}
                          >
                            <SelectTrigger className="h-7 flex-1 text-xs">
                              <SelectValue placeholder="Campo" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectedFields.map((f) => (
                                <SelectItem key={f.id} value={f.id}>
                                  {f.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Select
                            value={filter.operator}
                            onValueChange={(v) => {
                              const newFilters = [...filters]
                              newFilters[idx].operator = v
                              setFilters(newFilters)
                            }}
                          >
                            <SelectTrigger className="h-7 w-14 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="=">=</SelectItem>
                              <SelectItem value="!=">≠</SelectItem>
                              <SelectItem value=">">{">"}</SelectItem>
                              <SelectItem value="<">{"<"}</SelectItem>
                              <SelectItem value=">=">≥</SelectItem>
                              <SelectItem value="<=">≤</SelectItem>
                              <SelectItem value="contains">contiene</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input
                            value={filter.value}
                            onChange={(e) => {
                              const newFilters = [...filters]
                              newFilters[idx].value = e.target.value
                              setFilters(newFilters)
                            }}
                            className="h-7 flex-1 text-xs"
                            placeholder="Valor"
                          />
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFilter(idx)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">Sin filtros aplicados</p>
                  )}
                </div>

                {/* Visual Options */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <Palette className="h-3 w-3" />
                    OPCIONES VISUALES
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mostrar leyenda</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Mostrar etiquetas</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Animaciones</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Grid de fondo</span>
                      <Switch />
                    </div>
                  </div>
                </div>

                {/* Limit */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">LÍMITE DE FILAS</p>
                  <Slider defaultValue={[100]} max={1000} step={10} className="mt-3" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>10</span>
                    <span>100 filas</span>
                    <span>1000</span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* AI Panel */}
          {showAIPanel && (
            <div className="w-96 border-l bg-gradient-to-b from-primary/5 to-background flex flex-col shrink-0">
              <div className="p-3 border-b flex items-center justify-between">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  AI Report Assistant
                </h3>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowAIPanel(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-primary/30 bg-primary/5">
                    <p className="text-sm mb-3">Describe el reporte que necesitas en lenguaje natural:</p>
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Ej: Quiero ver las ventas del último trimestre agrupadas por vendedor, mostrando totales y el % de cumplimiento de meta..."
                      className="w-full h-28 text-sm p-3 rounded-lg border bg-background resize-none"
                    />
                    <Button className="w-full mt-3" onClick={generateAIReport}>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generar Reporte
                    </Button>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">SUGERENCIAS RÁPIDAS</p>
                    <div className="space-y-2">
                      {[
                        "Top 10 productos más vendidos este mes",
                        "Clientes con cartera vencida > 30 días",
                        "Comparativo de ventas mes actual vs anterior",
                        "Inventario crítico por bodega",
                        "Rentabilidad por categoría de producto",
                        "Análisis de tendencia de ventas semanal",
                      ].map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => setAiPrompt(suggestion)}
                          className="w-full text-left p-3 rounded-lg bg-muted/50 hover:bg-muted text-sm transition-colors flex items-center gap-2"
                        >
                          <Zap className="h-4 w-4 text-primary shrink-0" />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 border">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">Insights Automáticos</span>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• Las ventas tienen una tendencia alcista del 12% este trimestre</p>
                      <p>• El vendedor "Carlos M." supera la meta en un 23%</p>
                      <p>• Hay 15 productos con stock crítico que requieren atención</p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Main Reports Dashboard
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Centro de Reportes</h1>
          <p className="text-muted-foreground">Genera, visualiza y programa reportes inteligentes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline" size="sm">
            <FolderOpen className="h-4 w-4 mr-2" />
            Plantillas
          </Button>
          <Button size="sm" onClick={() => setIsBuilderOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Reporte
          </Button>
        </div>
      </div>

      {/* Quick KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi) => (
          <Card
            key={kpi.id}
            className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer group"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.titulo}</p>
                  <p className="text-2xl font-bold mt-1">{kpi.valor}</p>
                </div>
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                    kpi.tendencia === "up" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400",
                  )}
                >
                  {kpi.tendencia === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {kpi.cambio}%
                </div>
              </div>
              <div className="mt-3 opacity-60 group-hover:opacity-100 transition-opacity">
                <Sparkline data={kpi.sparkline} color={kpi.tendencia === "up" ? "#22c55e" : "#ef4444"} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Ventas Mensuales */}
        <Card className="col-span-2 bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Ventas vs Meta Mensual</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around pt-4">
              {ventasMensuales.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group">
                  <div className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    ${(item.ventas / 1000000).toFixed(0)}M
                  </div>
                  <div className="relative">
                    <div
                      className="w-10 bg-gradient-to-t from-primary to-primary/60 rounded-t transition-all group-hover:from-primary/90"
                      style={{ height: `${(item.ventas / 70000000) * 180}px` }}
                    />
                    <div
                      className="absolute bottom-0 left-0 w-10 border-2 border-dashed border-yellow-500/50 rounded-t pointer-events-none"
                      style={{ height: `${(item.meta / 70000000) * 180}px` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{item.mes}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary" />
                <span className="text-sm text-muted-foreground">Ventas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded border-2 border-dashed border-yellow-500/50" />
                <span className="text-sm text-muted-foreground">Meta</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Distribution Pie */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Ventas por Categoría</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  {
                    ventasPorCategoria.reduce(
                      (acc, item, i) => {
                        const offset = acc.offset
                        acc.elements.push(
                          <circle
                            key={i}
                            cx="18"
                            cy="18"
                            r="15.9155"
                            fill="none"
                            stroke={item.color}
                            strokeWidth="3"
                            strokeDasharray={`${item.valor} ${100 - item.valor}`}
                            strokeDashoffset={-offset}
                            className="transition-all duration-300 hover:opacity-80"
                          />,
                        )
                        acc.offset += item.valor
                        return acc
                      },
                      { elements: [] as JSX.Element[], offset: 0 },
                    ).elements
                  }
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl font-bold">$324M</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </div>
              </div>
              <div className="w-full mt-4 space-y-2">
                {ventasPorCategoria.map((item, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-muted-foreground">{item.categoria}</span>
                    </div>
                    <span className="font-medium">{item.valor}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="favorites">Favoritos</TabsTrigger>
            <TabsTrigger value="scheduled">Programados</TabsTrigger>
            <TabsTrigger value="shared">Compartidos</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar reportes..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Módulo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="ventas">Ventas</SelectItem>
                <SelectItem value="inventario">Inventario</SelectItem>
                <SelectItem value="contabilidad">Contabilidad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Reporte</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Módulo</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Tipo</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Última Ejecución</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Programado</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Vistas</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {savedReports.map((reporte) => (
                    <tr key={reporte.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "h-10 w-10 rounded-lg flex items-center justify-center",
                              reporte.tipo === "table"
                                ? "bg-blue-500/20 text-blue-400"
                                : reporte.tipo === "bar"
                                  ? "bg-green-500/20 text-green-400"
                                  : reporte.tipo === "dashboard"
                                    ? "bg-purple-500/20 text-purple-400"
                                    : "bg-orange-500/20 text-orange-400",
                            )}
                          >
                            {reporte.tipo === "table" ? (
                              <Table className="h-5 w-5" />
                            ) : reporte.tipo === "bar" ? (
                              <BarChart3 className="h-5 w-5" />
                            ) : reporte.tipo === "dashboard" ? (
                              <LayoutGrid className="h-5 w-5" />
                            ) : (
                              <ScatterChart className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{reporte.nombre}</span>
                              {reporte.favorito && <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />}
                              {reporte.compartido && <Globe className="h-3.5 w-3.5 text-muted-foreground" />}
                            </div>
                            <p className="text-xs text-muted-foreground">{reporte.descripcion}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="secondary">{reporte.modulo}</Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="capitalize">
                          {reporte.tipo}
                        </Badge>
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{reporte.ultimaEjecucion}</td>
                      <td className="p-4">
                        {reporte.programado ? (
                          <div className="flex items-center gap-1.5 text-sm">
                            <Clock className="h-3.5 w-3.5 text-primary" />
                            {reporte.programado}
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4 text-sm text-muted-foreground">{reporte.vistas.toLocaleString()}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Play className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="m-0">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {savedReports
                  .filter((r) => r.favorito)
                  .map((reporte) => (
                    <Card
                      key={reporte.id}
                      className="bg-muted/30 border-border hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className={cn(
                              "h-10 w-10 rounded-lg flex items-center justify-center",
                              reporte.tipo === "table"
                                ? "bg-blue-500/20 text-blue-400"
                                : reporte.tipo === "bar"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-purple-500/20 text-purple-400",
                            )}
                          >
                            {reporte.tipo === "table" ? (
                              <Table className="h-5 w-5" />
                            ) : reporte.tipo === "bar" ? (
                              <BarChart3 className="h-5 w-5" />
                            ) : (
                              <LayoutGrid className="h-5 w-5" />
                            )}
                          </div>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </div>
                        <h3 className="font-semibold">{reporte.nombre}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{reporte.descripcion}</p>
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                          <Badge variant="secondary" className="text-xs">
                            {reporte.modulo}
                          </Badge>
                          <span className="text-xs text-muted-foreground ml-auto">{reporte.ultimaEjecucion}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="m-0">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground py-8">
                {savedReports.filter((r) => r.programado).length} reportes programados
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shared" className="m-0">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground py-8">
                {savedReports.filter((r) => r.compartido).length} reportes compartidos
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
