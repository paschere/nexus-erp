"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Warehouse,
  RotateCcw,
  Search,
  Filter,
  Plus,
  MapPin,
  Eye,
  Edit,
  MoreHorizontal,
  ArrowRightLeft,
  ClipboardCheck,
  Timer,
  Truck,
  PackageCheck,
  Scan,
  Camera,
  Mic,
  Download,
  List,
  LayoutGrid,
  Thermometer,
  Snowflake,
  AlertCircle,
  Clock,
  RefreshCw,
  Printer,
  Share2,
  Target,
  Activity,
  Send,
  X,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts"

const kpis = [
  { label: "Total SKUs", value: "12,458", change: "+234", trend: "up", icon: Package, color: "text-blue-400" },
  {
    label: "Valor Inventario",
    value: "$2.4B",
    change: "+5.2%",
    trend: "up",
    icon: Warehouse,
    color: "text-emerald-400",
  },
  { label: "Stock Crítico", value: "47", change: "-12", trend: "down", icon: AlertTriangle, color: "text-red-400" },
  { label: "Rotación", value: "4.2x", change: "+0.3", trend: "up", icon: RotateCcw, color: "text-purple-400" },
  { label: "Precisión", value: "99.2%", change: "+0.5%", trend: "up", icon: Target, color: "text-teal-400" },
  { label: "Pedidos Pend.", value: "128", change: "+18", trend: "up", icon: Clock, color: "text-amber-400" },
]

const productos = [
  {
    sku: "PRD-001",
    nombre: "Motor Eléctrico 5HP",
    categoria: "Motores",
    stock: 45,
    minimo: 20,
    maximo: 100,
    reservado: 5,
    disponible: 40,
    costo: 2500000,
    ubicacion: "A-12-3",
    lote: "LOT-2024-001",
    vencimiento: null,
    estado: "ok",
    imagen: "/electric-motor.png",
    rotacion: 4.5,
    ultimoMov: "Hace 2h",
  },
  {
    sku: "PRD-002",
    nombre: "Válvula de Control DN50",
    categoria: "Válvulas",
    stock: 8,
    minimo: 15,
    maximo: 50,
    reservado: 2,
    disponible: 6,
    costo: 850000,
    ubicacion: "B-05-1",
    lote: "LOT-2024-015",
    vencimiento: null,
    estado: "bajo",
    imagen: "/control-valve.jpg",
    rotacion: 3.2,
    ultimoMov: "Hace 1d",
  },
  {
    sku: "PRD-003",
    nombre: "Sensor de Temperatura PT100",
    categoria: "Sensores",
    stock: 120,
    minimo: 50,
    maximo: 200,
    reservado: 15,
    disponible: 105,
    costo: 180000,
    ubicacion: "C-08-2",
    lote: "LOT-2024-089",
    vencimiento: "2025-06-15",
    estado: "ok",
    imagen: "/temperature-sensor.png",
    rotacion: 5.8,
    ultimoMov: "Hace 4h",
  },
  {
    sku: "PRD-004",
    nombre: "Bomba Centrífuga 10HP",
    categoria: "Bombas",
    stock: 3,
    minimo: 10,
    maximo: 30,
    reservado: 2,
    disponible: 1,
    costo: 4200000,
    ubicacion: "A-15-4",
    lote: "LOT-2024-045",
    vencimiento: null,
    estado: "critico",
    imagen: "/centrifugal-pump.png",
    rotacion: 2.1,
    ultimoMov: "Hace 3d",
  },
  {
    sku: "PRD-005",
    nombre: "PLC Siemens S7-1200",
    categoria: "Automatización",
    stock: 25,
    minimo: 10,
    maximo: 50,
    reservado: 3,
    disponible: 22,
    costo: 3800000,
    ubicacion: "D-02-1",
    lote: "LOT-2024-078",
    vencimiento: null,
    estado: "ok",
    imagen: "/plc-controller.jpg",
    rotacion: 3.9,
    ultimoMov: "Hace 6h",
  },
  {
    sku: "PRD-006",
    nombre: "Cable de Control 4x16",
    categoria: "Cables",
    stock: 500,
    minimo: 200,
    maximo: 1000,
    reservado: 50,
    disponible: 450,
    costo: 12000,
    ubicacion: "E-01-1",
    lote: "LOT-2024-102",
    vencimiento: null,
    estado: "ok",
    imagen: "/control-cable.jpg",
    rotacion: 6.5,
    ultimoMov: "Hace 1h",
  },
  {
    sku: "PRD-007",
    nombre: "Variador de Frecuencia 20HP",
    categoria: "Drives",
    stock: 12,
    minimo: 8,
    maximo: 25,
    reservado: 4,
    disponible: 8,
    costo: 5600000,
    ubicacion: "D-04-2",
    lote: "LOT-2024-112",
    vencimiento: null,
    estado: "ok",
    imagen: "/frequency-drive.jpg",
    rotacion: 2.8,
    ultimoMov: "Hace 12h",
  },
  {
    sku: "PRD-008",
    nombre: "Aceite Hidráulico ISO 68",
    categoria: "Lubricantes",
    stock: 85,
    minimo: 100,
    maximo: 300,
    reservado: 10,
    disponible: 75,
    costo: 95000,
    ubicacion: "F-02-3",
    lote: "LOT-2024-098",
    vencimiento: "2025-12-01",
    estado: "bajo",
    imagen: "/hydraulic-oil.jpg",
    rotacion: 4.2,
    ultimoMov: "Hace 2d",
  },
]

const almacenes = [
  {
    id: 1,
    nombre: "Bodega Principal",
    codigo: "BOD-001",
    ubicacion: "Bogotá",
    ciudad: "Bogotá D.C.",
    capacidad: 85,
    productos: 8420,
    skus: 4250,
    valor: "$1.8B",
    temperatura: 22,
    humedad: 45,
    zonas: 12,
    personal: 24,
    tipo: "general",
  },
  {
    id: 2,
    nombre: "Centro Frío",
    codigo: "CF-001",
    ubicacion: "Bogotá Norte",
    ciudad: "Bogotá D.C.",
    capacidad: 72,
    productos: 2340,
    skus: 890,
    valor: "$420M",
    temperatura: -18,
    humedad: 35,
    zonas: 6,
    personal: 12,
    tipo: "refrigerado",
  },
  {
    id: 3,
    nombre: "Bodega Medellín",
    codigo: "BOD-002",
    ubicacion: "Medellín",
    ciudad: "Medellín",
    capacidad: 45,
    productos: 1250,
    skus: 720,
    valor: "$180M",
    temperatura: 24,
    humedad: 55,
    zonas: 8,
    personal: 8,
    tipo: "general",
  },
  {
    id: 4,
    nombre: "Centro Distribución",
    codigo: "CD-001",
    ubicacion: "Funza",
    ciudad: "Cundinamarca",
    capacidad: 62,
    productos: 3448,
    skus: 1580,
    valor: "$520M",
    temperatura: 21,
    humedad: 42,
    zonas: 15,
    personal: 35,
    tipo: "cross-dock",
  },
]

const movimientos = [
  {
    id: 1,
    tipo: "entrada",
    producto: "Motor Eléctrico 5HP",
    sku: "PRD-001",
    cantidad: 20,
    origen: "Proveedor ABC",
    destino: "BOD-001",
    fecha: "Hoy 14:30",
    usuario: "Carlos M.",
    documento: "OC-2024-1234",
    estado: "completado",
  },
  {
    id: 2,
    tipo: "salida",
    producto: "Válvula de Control DN50",
    sku: "PRD-002",
    cantidad: 5,
    origen: "BOD-001",
    destino: "Cliente XYZ",
    fecha: "Hoy 11:20",
    usuario: "Ana R.",
    documento: "PED-2024-892",
    estado: "completado",
  },
  {
    id: 3,
    tipo: "transferencia",
    producto: "PLC Siemens S7-1200",
    sku: "PRD-005",
    cantidad: 3,
    origen: "BOD-001",
    destino: "BOD-002",
    fecha: "Hoy 09:45",
    usuario: "Pedro L.",
    documento: "TRF-2024-156",
    estado: "en_transito",
  },
  {
    id: 4,
    tipo: "ajuste",
    producto: "Sensor de Temperatura PT100",
    sku: "PRD-003",
    cantidad: -2,
    origen: "BOD-001",
    destino: "Ajuste Conteo",
    fecha: "Ayer 16:15",
    usuario: "María G.",
    documento: "AJT-2024-089",
    estado: "completado",
  },
  {
    id: 5,
    tipo: "entrada",
    producto: "Cable de Control 4x16",
    sku: "PRD-006",
    cantidad: 200,
    origen: "Proveedor Cables SA",
    destino: "BOD-001",
    fecha: "Ayer 10:30",
    usuario: "Juan P.",
    documento: "OC-2024-1235",
    estado: "completado",
  },
  {
    id: 6,
    tipo: "devolucion",
    producto: "Bomba Centrífuga 10HP",
    sku: "PRD-004",
    cantidad: 1,
    origen: "Cliente ABC",
    destino: "BOD-001",
    fecha: "Ayer 08:00",
    usuario: "Ana R.",
    documento: "DEV-2024-045",
    estado: "revision",
  },
]

const rotacionData = [
  { mes: "Jul", entradas: 450, salidas: 420, rotacion: 3.8 },
  { mes: "Ago", entradas: 520, salidas: 510, rotacion: 4.1 },
  { mes: "Sep", entradas: 480, salidas: 495, rotacion: 4.0 },
  { mes: "Oct", entradas: 610, salidas: 580, rotacion: 4.3 },
  { mes: "Nov", entradas: 550, salidas: 590, rotacion: 4.5 },
  { mes: "Dic", entradas: 680, salidas: 650, rotacion: 4.2 },
]

const distribucionStock = [
  { name: "Óptimo", value: 65, color: "#22c55e" },
  { name: "Bajo", value: 20, color: "#f59e0b" },
  { name: "Crítico", value: 8, color: "#ef4444" },
  { name: "Exceso", value: 7, color: "#8b5cf6" },
]

const categoriaData = [
  { categoria: "Motores", stock: 245, valor: 612500000 },
  { categoria: "Válvulas", stock: 189, valor: 160650000 },
  { categoria: "Sensores", stock: 520, valor: 93600000 },
  { categoria: "Bombas", stock: 78, valor: 327600000 },
  { categoria: "PLCs", stock: 156, valor: 592800000 },
  { categoria: "Cables", stock: 1200, valor: 14400000 },
]

const conteosProgramados = [
  {
    id: 1,
    tipo: "Cíclico",
    zona: "Zona A - Motores",
    fecha: "Hoy",
    hora: "15:00",
    items: 85,
    responsable: "Carlos M.",
    estado: "pendiente",
  },
  {
    id: 2,
    tipo: "Físico",
    zona: "Toda la Bodega",
    fecha: "15 Dic",
    hora: "06:00",
    items: 4250,
    responsable: "Equipo Completo",
    estado: "programado",
  },
  {
    id: 3,
    tipo: "Aleatorio",
    zona: "Zona C - Sensores",
    fecha: "Mañana",
    hora: "09:00",
    items: 45,
    responsable: "Ana R.",
    estado: "pendiente",
  },
]

export function InventarioModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("productos")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedAlmacen, setSelectedAlmacen] = useState("todos")
  const [showEntradaModal, setShowEntradaModal] = useState(false)
  const [showTransferenciaModal, setShowTransferenciaModal] = useState(false)
  const [selectedProducto, setSelectedProducto] = useState<(typeof productos)[0] | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "ok":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "bajo":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "critico":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getTipoMovColor = (tipo: string) => {
    switch (tipo) {
      case "entrada":
        return "bg-emerald-500/20 text-emerald-400"
      case "salida":
        return "bg-blue-500/20 text-blue-400"
      case "transferencia":
        return "bg-purple-500/20 text-purple-400"
      case "ajuste":
        return "bg-amber-500/20 text-amber-400"
      case "devolucion":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-slate-500/20 text-slate-400"
    }
  }

  const filteredProductos = productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.lote.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inventario</h1>
          <p className="text-muted-foreground">Gestión integral de stock, almacenes y trazabilidad</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent"
            onClick={() => setShowTransferenciaModal(true)}
          >
            <ArrowRightLeft className="h-4 w-4" />
            Transferir
          </Button>
          <Button size="sm" className="gap-2 bg-teal-600 hover:bg-teal-700" onClick={() => setShowEntradaModal(true)}>
            <Plus className="h-4 w-4" />
            Nueva Entrada
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="bg-card border-border hover:border-primary/30 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-secondary ${kpi.color}`}>
                  <kpi.icon className="h-4 w-4" />
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs ${kpi.trend === "up" ? "text-emerald-400 border-emerald-500/30" : "text-red-400 border-red-500/30"}`}
                >
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {kpi.change}
                </Badge>
              </div>
              <p className="text-xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-xs text-muted-foreground">{kpi.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alertas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-red-500/20">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-red-400">8 productos en stock crítico</p>
              <p className="text-sm text-muted-foreground">Requieren reposición inmediata</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/20 bg-transparent"
            >
              Ver todos
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/10 border-amber-500/30">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-amber-500/20">
              <Timer className="h-5 w-5 text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-amber-400">12 lotes próximos a vencer</p>
              <p className="text-sm text-muted-foreground">En los próximos 30 días</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-amber-500/30 text-amber-400 hover:bg-amber-500/20 bg-transparent"
            >
              Revisar
            </Button>
          </CardContent>
        </Card>
        <Card className="bg-purple-500/10 border-purple-500/30">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-500/20">
              <Truck className="h-5 w-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-purple-400">5 transferencias en tránsito</p>
              <p className="text-sm text-muted-foreground">Pendientes de recepción</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20 bg-transparent"
            >
              Seguir
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="productos" className="gap-2">
              <Package className="h-4 w-4" />
              Productos
            </TabsTrigger>
            <TabsTrigger value="almacenes" className="gap-2">
              <Warehouse className="h-4 w-4" />
              Almacenes
            </TabsTrigger>
            <TabsTrigger value="movimientos" className="gap-2">
              <ArrowRightLeft className="h-4 w-4" />
              Movimientos
            </TabsTrigger>
            <TabsTrigger value="conteos" className="gap-2">
              <ClipboardCheck className="h-4 w-4" />
              Conteos
            </TabsTrigger>
            <TabsTrigger value="analitica" className="gap-2">
              <Activity className="h-4 w-4" />
              Analítica
            </TabsTrigger>
          </TabsList>

          {activeTab === "productos" && (
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Tab Productos */}
        <TabsContent value="productos" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 md:w-[350px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por SKU, nombre, lote, ubicación..."
                      className="pl-10 bg-secondary/50"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Scan className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedAlmacen} onValueChange={setSelectedAlmacen}>
                    <SelectTrigger className="w-[180px] bg-secondary/50">
                      <SelectValue placeholder="Todos los almacenes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los almacenes</SelectItem>
                      {almacenes.map((a) => (
                        <SelectItem key={a.id} value={a.codigo}>
                          {a.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Filter className="h-4 w-4" />
                    Filtros
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "list" ? (
                <ScrollArea className="h-[500px]">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>SKU / Producto</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Disponible</TableHead>
                        <TableHead>Ubicación</TableHead>
                        <TableHead>Costo Unit.</TableHead>
                        <TableHead>Rotación</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="w-[120px]">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProductos.map((prod) => (
                        <TableRow
                          key={prod.sku}
                          className="border-border cursor-pointer hover:bg-secondary/50"
                          onClick={() => setSelectedProducto(prod)}
                        >
                          <TableCell>
                            <img
                              src={prod.imagen || "/placeholder.svg"}
                              alt={prod.nombre}
                              className="w-10 h-10 rounded-lg object-cover bg-secondary"
                            />
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-mono text-xs text-muted-foreground">{prod.sku}</p>
                              <p className="font-medium">{prod.nombre}</p>
                              <p className="text-xs text-muted-foreground">{prod.categoria}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold">{prod.stock}</span>
                                <span className="text-xs text-muted-foreground">/ {prod.maximo}</span>
                              </div>
                              <Progress value={(prod.stock / prod.maximo) * 100} className="h-1.5 w-20" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium text-emerald-400">{prod.disponible}</p>
                              {prod.reservado > 0 && (
                                <p className="text-xs text-amber-400">{prod.reservado} reservados</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="font-mono text-sm">{prod.ubicacion}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">{prod.lote}</p>
                          </TableCell>
                          <TableCell className="font-medium">{formatCurrency(prod.costo)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{prod.rotacion}x</span>
                              <div className="h-6 w-12">
                                <ResponsiveContainer width="100%" height="100%">
                                  <AreaChart
                                    data={[
                                      { v: 2 },
                                      { v: 3 },
                                      { v: prod.rotacion },
                                      { v: 4 },
                                      { v: prod.rotacion + 0.5 },
                                    ]}
                                  >
                                    <Area
                                      type="monotone"
                                      dataKey="v"
                                      stroke="#2dd4bf"
                                      fill="#2dd4bf"
                                      fillOpacity={0.3}
                                      strokeWidth={1.5}
                                    />
                                  </AreaChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getEstadoColor(prod.estado)}>
                              {prod.estado === "ok" ? "Óptimo" : prod.estado === "bajo" ? "Bajo" : "Crítico"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredProductos.map((prod) => (
                    <Card
                      key={prod.sku}
                      className={`bg-secondary/30 border-border hover:border-primary/50 transition-all cursor-pointer ${prod.estado === "critico" ? "border-red-500/50" : prod.estado === "bajo" ? "border-amber-500/50" : ""}`}
                      onClick={() => setSelectedProducto(prod)}
                    >
                      <CardContent className="p-4">
                        <div className="aspect-square rounded-lg bg-secondary mb-3 flex items-center justify-center overflow-hidden">
                          <img
                            src={prod.imagen || "/placeholder.svg"}
                            alt={prod.nombre}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="font-mono text-xs text-muted-foreground">{prod.sku}</p>
                        <p className="font-medium text-sm truncate">{prod.nombre}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div>
                            <p className="text-lg font-bold">{prod.stock}</p>
                            <p className="text-xs text-muted-foreground">en stock</p>
                          </div>
                          <Badge variant="outline" className={`text-xs ${getEstadoColor(prod.estado)}`}>
                            {prod.estado === "ok" ? "OK" : prod.estado === "bajo" ? "Bajo" : "!"}
                          </Badge>
                        </div>
                        <Progress value={(prod.stock / prod.maximo) * 100} className="h-1 mt-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Almacenes */}
        <TabsContent value="almacenes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {almacenes.map((almacen) => (
              <Card
                key={almacen.id}
                className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${almacen.tipo === "refrigerado" ? "bg-blue-500/20" : almacen.tipo === "cross-dock" ? "bg-purple-500/20" : "bg-teal-500/20"}`}
                    >
                      {almacen.tipo === "refrigerado" ? (
                        <Snowflake className="h-5 w-5 text-blue-400" />
                      ) : almacen.tipo === "cross-dock" ? (
                        <Truck className="h-5 w-5 text-purple-400" />
                      ) : (
                        <Warehouse className="h-5 w-5 text-teal-400" />
                      )}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {almacen.codigo}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{almacen.nombre}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-4">
                    <MapPin className="h-3 w-3" />
                    {almacen.ubicacion}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Capacidad</span>
                        <span className="font-medium">{almacen.capacidad}%</span>
                      </div>
                      <Progress
                        value={almacen.capacidad}
                        className={`h-2 ${almacen.capacidad > 90 ? "[&>div]:bg-red-500" : almacen.capacidad > 75 ? "[&>div]:bg-amber-500" : ""}`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">SKUs</p>
                        <p className="font-semibold">{almacen.skus.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Valor</p>
                        <p className="font-semibold">{almacen.valor}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Temperatura</p>
                        <p className="font-semibold flex items-center gap-1">
                          {almacen.temperatura < 0 ? (
                            <Snowflake className="h-3 w-3 text-blue-400" />
                          ) : (
                            <Thermometer className="h-3 w-3 text-amber-400" />
                          )}
                          {almacen.temperatura}°C
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Personal</p>
                        <p className="font-semibold">{almacen.personal}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity bg-transparent"
                  >
                    Ver detalle
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mapa Visual */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Layout de Almacén</CardTitle>
                  <CardDescription>Bodega Principal - Visualización en tiempo real</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    Disponible
                  </Badge>
                  <Badge variant="outline" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    Ocupado
                  </Badge>
                  <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
                    Lleno
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-16 gap-1">
                {Array.from({ length: 128 }).map((_, i) => {
                  const estado = Math.random()
                  const esZonaFria = i >= 48 && i < 64
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded cursor-pointer hover:scale-110 transition-transform ${
                        esZonaFria
                          ? "bg-blue-500/60"
                          : estado > 0.8
                            ? "bg-red-500/60"
                            : estado > 0.4
                              ? "bg-amber-500/60"
                              : "bg-emerald-500/60"
                      }`}
                      title={`Ubicación ${String.fromCharCode(65 + Math.floor(i / 16))}-${String((i % 16) + 1).padStart(2, "0")}`}
                    />
                  )
                })}
              </div>
              <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                <span>Zonas A - H</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Snowflake className="h-3 w-3 text-blue-400" />
                    Zona refrigerada
                  </span>
                </div>
                <span>Posiciones 01 - 16</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Movimientos */}
        <TabsContent value="movimientos" className="space-y-4">
          <div className="grid grid-cols-5 gap-4 mb-4">
            {[
              { tipo: "Entradas", icono: PackageCheck, valor: 128, color: "text-emerald-400 bg-emerald-500/20" },
              { tipo: "Salidas", icono: Send, valor: 95, color: "text-blue-400 bg-blue-500/20" },
              { tipo: "Transferencias", icono: ArrowRightLeft, valor: 23, color: "text-purple-400 bg-purple-500/20" },
              { tipo: "Ajustes", icono: Edit, valor: 12, color: "text-amber-400 bg-amber-500/20" },
              { tipo: "Devoluciones", icono: RefreshCw, valor: 8, color: "text-red-400 bg-red-500/20" },
            ].map((item) => (
              <Card key={item.tipo} className="bg-card border-border">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <item.icono className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{item.valor}</p>
                    <p className="text-xs text-muted-foreground">{item.tipo} hoy</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Historial de Movimientos</CardTitle>
                <div className="flex gap-2">
                  <Input placeholder="Buscar..." className="w-[200px] bg-secondary/50" />
                  <Select defaultValue="todos">
                    <SelectTrigger className="w-[150px] bg-secondary/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los tipos</SelectItem>
                      <SelectItem value="entrada">Entradas</SelectItem>
                      <SelectItem value="salida">Salidas</SelectItem>
                      <SelectItem value="transferencia">Transferencias</SelectItem>
                      <SelectItem value="ajuste">Ajustes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead>Tipo</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Origen</TableHead>
                      <TableHead>Destino</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {movimientos.map((mov) => (
                      <TableRow key={mov.id} className="border-border">
                        <TableCell>
                          <Badge variant="outline" className={getTipoMovColor(mov.tipo)}>
                            {mov.tipo.charAt(0).toUpperCase() + mov.tipo.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{mov.producto}</p>
                            <p className="text-xs text-muted-foreground font-mono">{mov.sku}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`font-bold ${mov.cantidad > 0 ? "text-emerald-400" : "text-red-400"}`}>
                            {mov.cantidad > 0 ? "+" : ""}
                            {mov.cantidad}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">{mov.origen}</TableCell>
                        <TableCell className="text-sm">{mov.destino}</TableCell>
                        <TableCell className="font-mono text-xs">{mov.documento}</TableCell>
                        <TableCell className="text-sm">{mov.usuario}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{mov.fecha}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              mov.estado === "completado"
                                ? "text-emerald-400 border-emerald-500/30"
                                : mov.estado === "en_transito"
                                  ? "text-blue-400 border-blue-500/30"
                                  : "text-amber-400 border-amber-500/30"
                            }
                          >
                            {mov.estado === "completado"
                              ? "Completado"
                              : mov.estado === "en_transito"
                                ? "En tránsito"
                                : "Revisión"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Conteos */}
        <TabsContent value="conteos" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2 bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Conteos Programados</CardTitle>
                  <Button size="sm" className="gap-2 bg-teal-600 hover:bg-teal-700">
                    <Plus className="h-4 w-4" />
                    Programar Conteo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {conteosProgramados.map((conteo) => (
                    <div
                      key={conteo.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-lg ${conteo.tipo === "Físico" ? "bg-purple-500/20" : conteo.tipo === "Cíclico" ? "bg-blue-500/20" : "bg-amber-500/20"}`}
                        >
                          <ClipboardCheck
                            className={`h-5 w-5 ${conteo.tipo === "Físico" ? "text-purple-400" : conteo.tipo === "Cíclico" ? "text-blue-400" : "text-amber-400"}`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{conteo.tipo}</p>
                            <Badge variant="outline" className="text-xs">
                              {conteo.items} items
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{conteo.zona}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {conteo.fecha} - {conteo.hora}
                        </p>
                        <p className="text-sm text-muted-foreground">{conteo.responsable}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          conteo.estado === "pendiente"
                            ? "text-amber-400 border-amber-500/30"
                            : "text-blue-400 border-blue-500/30"
                        }
                      >
                        {conteo.estado === "pendiente" ? "Pendiente" : "Programado"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Iniciar
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Precisión de Inventario</CardTitle>
                <CardDescription>Últimos 6 meses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className="text-4xl font-bold text-teal-400">99.2%</p>
                  <p className="text-sm text-muted-foreground">Precisión actual</p>
                </div>
                <div className="h-[150px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { m: "Jul", v: 98.5 },
                        { m: "Ago", v: 98.8 },
                        { m: "Sep", v: 99.0 },
                        { m: "Oct", v: 98.7 },
                        { m: "Nov", v: 99.1 },
                        { m: "Dic", v: 99.2 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="m" stroke="#64748b" fontSize={12} />
                      <YAxis domain={[98, 100]} stroke="#64748b" fontSize={12} />
                      <Line type="monotone" dataKey="v" stroke="#2dd4bf" strokeWidth={2} dot={{ fill: "#2dd4bf" }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Analítica */}
        <TabsContent value="analitica" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Movimientos Mensuales</CardTitle>
                <CardDescription>Entradas vs Salidas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={rotacionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="mes" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                      />
                      <Bar dataKey="entradas" name="Entradas" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="salidas" name="Salidas" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Distribución de Stock</CardTitle>
                <CardDescription>Estado general del inventario</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-8">
                  <div className="h-[200px] w-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={distribucionStock}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {distribucionStock.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3 flex-1">
                    {distribucionStock.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={item.value} className="w-20 h-2" />
                          <span className="text-sm font-medium w-10">{item.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 bg-card border-border">
              <CardHeader>
                <CardTitle>Valor por Categoría</CardTitle>
                <CardDescription>Distribución del valor del inventario</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoriaData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis
                        type="number"
                        stroke="#64748b"
                        fontSize={12}
                        tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`}
                      />
                      <YAxis dataKey="categoria" type="category" stroke="#64748b" fontSize={12} width={80} />
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                      />
                      <Bar dataKey="valor" fill="#2dd4bf" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal Detalle Producto */}
      {selectedProducto && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{selectedProducto.nombre}</CardTitle>
                <CardDescription>
                  {selectedProducto.sku} - {selectedProducto.categoria}
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedProducto(null)}>
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-6">
                <div className="w-32 h-32 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedProducto.imagen || "/placeholder.svg"}
                    alt={selectedProducto.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Stock Actual</p>
                    <p className="text-2xl font-bold">{selectedProducto.stock}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Disponible</p>
                    <p className="text-2xl font-bold text-emerald-400">{selectedProducto.disponible}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Reservado</p>
                    <p className="text-xl font-semibold text-amber-400">{selectedProducto.reservado}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Costo Unitario</p>
                    <p className="text-xl font-semibold">{formatCurrency(selectedProducto.costo)}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Ubicación</p>
                  <p className="font-medium flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {selectedProducto.ubicacion}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lote</p>
                  <p className="font-mono">{selectedProducto.lote}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rotación</p>
                  <p className="font-medium">{selectedProducto.rotacion}x / mes</p>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1 gap-2">
                  <ArrowRightLeft className="h-4 w-4" />
                  Transferir
                </Button>
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <Edit className="h-4 w-4" />
                  Editar
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
