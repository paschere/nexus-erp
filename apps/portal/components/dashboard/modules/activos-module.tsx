"use client"

import type React from "react"

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
  Building2,
  Plus,
  TrendingDown,
  Wrench,
  MapPin,
  Calendar,
  Search,
  Filter,
  Eye,
  Edit,
  MoreHorizontal,
  Truck,
  Monitor,
  Sofa,
  Factory,
  FileText,
  Download,
  QrCode,
  Camera,
  Clock,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  DollarSign,
  TrendingUp,
  BarChart3,
  History,
  Printer,
  Share2,
  X,
  User,
  CalendarDays,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts"

const kpis = [
  { label: "Total Activos", value: "1,342", change: "+28", trend: "up", icon: Building2, color: "text-blue-400" },
  {
    label: "Valor en Libros",
    value: "$8.4B",
    change: "-2.1%",
    trend: "down",
    icon: DollarSign,
    color: "text-emerald-400",
  },
  { label: "En Mantenimiento", value: "23", change: "+5", trend: "up", icon: Wrench, color: "text-amber-400" },
  {
    label: "Depreciación Mes",
    value: "$125M",
    change: "+3.2%",
    trend: "up",
    icon: TrendingDown,
    color: "text-purple-400",
  },
  { label: "Vida Útil Prom.", value: "6.2 años", change: "-0.3", trend: "down", icon: Clock, color: "text-teal-400" },
  { label: "ROI Activos", value: "18.5%", change: "+1.2%", trend: "up", icon: TrendingUp, color: "text-pink-400" },
]

const categorias = [
  {
    id: "maquinaria",
    nombre: "Maquinaria y Equipo",
    icono: Factory,
    cantidad: 285,
    valor: 3200000000,
    depreciacion: 320000000,
    color: "#3b82f6",
  },
  {
    id: "vehiculos",
    nombre: "Vehículos",
    icono: Truck,
    cantidad: 142,
    valor: 1850000000,
    depreciacion: 370000000,
    color: "#22c55e",
  },
  {
    id: "computo",
    nombre: "Equipos de Cómputo",
    icono: Monitor,
    cantidad: 456,
    valor: 980000000,
    depreciacion: 326000000,
    color: "#f59e0b",
  },
  {
    id: "mobiliario",
    nombre: "Mobiliario",
    icono: Sofa,
    cantidad: 389,
    valor: 445000000,
    depreciacion: 44500000,
    color: "#8b5cf6",
  },
  {
    id: "edificaciones",
    nombre: "Edificaciones",
    icono: Building2,
    cantidad: 12,
    valor: 5800000000,
    depreciacion: 145000000,
    color: "#ef4444",
  },
  {
    id: "herramientas",
    nombre: "Herramientas",
    icono: Wrench,
    cantidad: 58,
    valor: 125000000,
    depreciacion: 25000000,
    color: "#06b6d4",
  },
]

const activos = [
  {
    codigo: "ACT-2024-0089",
    nombre: "CNC Router Industrial 5 Ejes",
    categoria: "Maquinaria y Equipo",
    ubicacion: "Planta Bogotá - Zona A",
    responsable: "Carlos Mendoza",
    valorAdquisicion: 385000000,
    valorActual: 346500000,
    depreciacionAcum: 38500000,
    vidaUtil: 10,
    vidaRestante: 9,
    fechaAdquisicion: "2024-03-15",
    estado: "activo",
    imagen: "/cnc-machine.png",
    ultimoMant: "2024-11-20",
    proximoMant: "2025-02-20",
  },
  {
    codigo: "ACT-2024-0088",
    nombre: "Camión Furgón 10 Toneladas",
    categoria: "Vehículos",
    ubicacion: "Flota - Bogotá",
    responsable: "Logística",
    valorAdquisicion: 280000000,
    valorActual: 224000000,
    depreciacionAcum: 56000000,
    vidaUtil: 5,
    vidaRestante: 4,
    fechaAdquisicion: "2024-01-10",
    estado: "activo",
    imagen: "/cargo-truck.jpg",
    ultimoMant: "2024-12-01",
    proximoMant: "2025-03-01",
  },
  {
    codigo: "ACT-2024-0087",
    nombre: "Servidor Dell PowerEdge R750",
    categoria: "Equipos de Cómputo",
    ubicacion: "Data Center - Rack 12",
    responsable: "TI",
    valorAdquisicion: 85000000,
    valorActual: 56666000,
    depreciacionAcum: 28334000,
    vidaUtil: 3,
    vidaRestante: 2,
    fechaAdquisicion: "2024-04-20",
    estado: "mantenimiento",
    imagen: "/server-rack.png",
    ultimoMant: "2024-12-05",
    proximoMant: "2025-01-05",
  },
  {
    codigo: "ACT-2024-0086",
    nombre: "Montacargas Eléctrico 3T",
    categoria: "Maquinaria y Equipo",
    ubicacion: "Bodega Central",
    responsable: "Almacén",
    valorAdquisicion: 145000000,
    valorActual: 108750000,
    depreciacionAcum: 36250000,
    vidaUtil: 8,
    vidaRestante: 6,
    fechaAdquisicion: "2023-06-15",
    estado: "activo",
    imagen: "/electric-forklift.jpg",
    ultimoMant: "2024-10-15",
    proximoMant: "2025-01-15",
  },
  {
    codigo: "ACT-2024-0085",
    nombre: "Estación de Trabajo Ejecutiva",
    categoria: "Mobiliario",
    ubicacion: "Oficinas Admin - Piso 3",
    responsable: "Gerencia",
    valorAdquisicion: 12000000,
    valorActual: 9600000,
    depreciacionAcum: 2400000,
    vidaUtil: 10,
    vidaRestante: 8,
    fechaAdquisicion: "2023-02-10",
    estado: "activo",
    imagen: "/executive-desk.jpg",
    ultimoMant: null,
    proximoMant: null,
  },
  {
    codigo: "ACT-2024-0084",
    nombre: "Compresor Industrial 100HP",
    categoria: "Maquinaria y Equipo",
    ubicacion: "Planta Bogotá - Cuarto Máq.",
    responsable: "Producción",
    valorAdquisicion: 95000000,
    valorActual: 66500000,
    depreciacionAcum: 28500000,
    vidaUtil: 15,
    vidaRestante: 12,
    fechaAdquisicion: "2022-08-20",
    estado: "activo",
    imagen: "/industrial-compressor.jpg",
    ultimoMant: "2024-11-10",
    proximoMant: "2025-02-10",
  },
  {
    codigo: "ACT-2024-0083",
    nombre: "Edificio Administrativo Central",
    categoria: "Edificaciones",
    ubicacion: "Bogotá - Zona Industrial",
    responsable: "Administración",
    valorAdquisicion: 2800000000,
    valorActual: 2660000000,
    depreciacionAcum: 140000000,
    vidaUtil: 50,
    vidaRestante: 47,
    fechaAdquisicion: "2021-01-15",
    estado: "activo",
    imagen: "/modern-glass-office.png",
    ultimoMant: "2024-06-01",
    proximoMant: "2025-06-01",
  },
  {
    codigo: "ACT-2024-0082",
    nombre: "Flota Laptops HP ProBook x50",
    categoria: "Equipos de Cómputo",
    ubicacion: "Distribuidos",
    responsable: "TI",
    valorAdquisicion: 175000000,
    valorActual: 87500000,
    depreciacionAcum: 87500000,
    vidaUtil: 3,
    vidaRestante: 1.5,
    fechaAdquisicion: "2023-06-01",
    estado: "activo",
    imagen: "/modern-laptop.png",
    ultimoMant: "2024-09-15",
    proximoMant: "2025-03-15",
  },
]

const mantenimientos = [
  {
    id: 1,
    activo: "CNC Router Industrial",
    tipo: "Preventivo",
    fecha: "2025-02-20",
    estado: "programado",
    costo: 5500000,
    tecnico: "Servicio Externo",
    prioridad: "media",
  },
  {
    id: 2,
    activo: "Servidor Dell PowerEdge",
    tipo: "Correctivo",
    fecha: "2024-12-10",
    estado: "en_proceso",
    costo: 2800000,
    tecnico: "TI Interno",
    prioridad: "alta",
  },
  {
    id: 3,
    activo: "Montacargas Eléctrico",
    tipo: "Preventivo",
    fecha: "2025-01-15",
    estado: "programado",
    costo: 3200000,
    tecnico: "Proveedor",
    prioridad: "media",
  },
  {
    id: 4,
    activo: "Compresor Industrial",
    tipo: "Preventivo",
    fecha: "2025-02-10",
    estado: "programado",
    costo: 4100000,
    tecnico: "Mantenimiento",
    prioridad: "baja",
  },
  {
    id: 5,
    activo: "Camión Furgón",
    tipo: "Preventivo",
    fecha: "2025-03-01",
    estado: "programado",
    costo: 1800000,
    tecnico: "Taller Externo",
    prioridad: "media",
  },
]

const depreciacionMensual = [
  { mes: "Jul", valor: 118000000 },
  { mes: "Ago", valor: 119500000 },
  { mes: "Sep", valor: 121000000 },
  { mes: "Oct", valor: 122500000 },
  { mes: "Nov", valor: 124000000 },
  { mes: "Dic", valor: 125500000 },
]

const distribucionEdad = [
  { rango: "0-2 años", cantidad: 385, porcentaje: 29 },
  { rango: "2-5 años", cantidad: 520, porcentaje: 39 },
  { rango: "5-10 años", cantidad: 312, porcentaje: 23 },
  { rango: "+10 años", cantidad: 125, porcentaje: 9 },
]

export function ActivosModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("activos")
  const [selectedCategoria, setSelectedCategoria] = useState("todas")
  const [selectedActivo, setSelectedActivo] = useState<(typeof activos)[0] | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      value,
    )
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "activo":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "mantenimiento":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "baja":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "inactivo":
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getPrioridadColor = (prioridad: string) => {
    switch (prioridad) {
      case "alta":
        return "bg-red-500/20 text-red-400"
      case "media":
        return "bg-amber-500/20 text-amber-400"
      case "baja":
        return "bg-emerald-500/20 text-emerald-400"
      default:
        return "bg-slate-500/20 text-slate-400"
    }
  }

  const filteredActivos = activos.filter(
    (a) =>
      (a.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.codigo.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategoria === "todas" || a.categoria === selectedCategoria),
  )

  const totalValor = categorias.reduce((acc, cat) => acc + cat.valor, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Activos Fijos</h1>
          <p className="text-muted-foreground">Gestión integral de activos, depreciación y mantenimiento</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <QrCode className="h-4 w-4" />
            Escanear
          </Button>
          <Button size="sm" className="gap-2 bg-teal-600 hover:bg-teal-700">
            <Plus className="h-4 w-4" />
            Registrar Activo
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

      {/* Categorías Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categorias.map((cat) => (
          <Card
            key={cat.id}
            className={`bg-card border-border hover:border-primary/50 transition-all cursor-pointer ${selectedCategoria === cat.nombre ? "border-primary" : ""}`}
            onClick={() => setSelectedCategoria(selectedCategoria === cat.nombre ? "todas" : cat.nombre)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${cat.color}20` }}>
                  <cat.icono className="h-5 w-5" style={{ color: cat.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-2xl font-bold">{cat.cantidad}</p>
                  <p className="text-xs text-muted-foreground truncate">{cat.nombre}</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Valor</span>
                  <span className="font-medium">{formatCurrency(cat.valor)}</span>
                </div>
                <Progress
                  value={(cat.valor / totalValor) * 100}
                  className="h-1"
                  style={{ "--progress-color": cat.color } as React.CSSProperties}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="activos" className="gap-2">
            <Building2 className="h-4 w-4" />
            Activos
          </TabsTrigger>
          <TabsTrigger value="depreciacion" className="gap-2">
            <TrendingDown className="h-4 w-4" />
            Depreciación
          </TabsTrigger>
          <TabsTrigger value="mantenimiento" className="gap-2">
            <Wrench className="h-4 w-4" />
            Mantenimiento
          </TabsTrigger>
          <TabsTrigger value="reportes" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Reportes
          </TabsTrigger>
        </TabsList>

        {/* Tab Activos */}
        <TabsContent value="activos" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <div className="relative flex-1 md:max-w-[350px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por código, nombre, ubicación..."
                      className="pl-10 bg-secondary/50"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Camera className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                    <SelectTrigger className="w-[200px] bg-secondary/50">
                      <SelectValue placeholder="Todas las categorías" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas las categorías</SelectItem>
                      {categorias.map((c) => (
                        <SelectItem key={c.id} value={c.nombre}>
                          {c.nombre}
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
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="w-[60px]"></TableHead>
                      <TableHead>Código / Activo</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Ubicación</TableHead>
                      <TableHead>Valor Actual</TableHead>
                      <TableHead>Depreciación</TableHead>
                      <TableHead>Vida Útil</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="w-[100px]">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredActivos.map((activo) => (
                      <TableRow
                        key={activo.codigo}
                        className="border-border cursor-pointer hover:bg-secondary/50"
                        onClick={() => setSelectedActivo(activo)}
                      >
                        <TableCell>
                          <img
                            src={activo.imagen || "/placeholder.svg"}
                            alt={activo.nombre}
                            className="w-12 h-12 rounded-lg object-cover bg-secondary"
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-mono text-xs text-muted-foreground">{activo.codigo}</p>
                            <p className="font-medium">{activo.nombre}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {activo.categoria}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="truncate max-w-[150px]">{activo.ubicacion}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{formatCurrency(activo.valorActual)}</p>
                            <p className="text-xs text-muted-foreground">
                              Adq: {formatCurrency(activo.valorAdquisicion)}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-red-400">
                              -{formatCurrency(activo.depreciacionAcum)}
                            </p>
                            <Progress
                              value={(activo.depreciacionAcum / activo.valorAdquisicion) * 100}
                              className="h-1.5 w-16 [&>div]:bg-red-500"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{activo.vidaRestante}</span>
                              <span className="text-xs text-muted-foreground">/ {activo.vidaUtil} años</span>
                            </div>
                            <Progress value={(activo.vidaRestante / activo.vidaUtil) * 100} className="h-1.5 w-16" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={getEstadoColor(activo.estado)}>
                            {activo.estado === "activo"
                              ? "Activo"
                              : activo.estado === "mantenimiento"
                                ? "Mantenimiento"
                                : activo.estado}
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
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Depreciación */}
        <TabsContent value="depreciacion" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2 bg-card border-border">
              <CardHeader>
                <CardTitle>Depreciación Mensual</CardTitle>
                <CardDescription>Evolución de la depreciación acumulada</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={depreciacionMensual}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="mes" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`} />
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="valor"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Depreciación por Categoría</CardTitle>
                <CardDescription>Distribución mensual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categorias.map((cat) => (
                    <div key={cat.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span className="text-sm">{cat.nombre}</span>
                        </div>
                        <span className="text-sm font-medium">{formatCurrency(cat.depreciacion)}</span>
                      </div>
                      <Progress
                        value={(cat.depreciacion / 400000000) * 100}
                        className="h-1.5"
                        style={{ "--progress-background": cat.color } as React.CSSProperties}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Distribución por Edad</CardTitle>
                <CardDescription>Antigüedad de los activos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={distribucionEdad}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="rango" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #334155", borderRadius: "8px" }}
                      />
                      <Bar dataKey="cantidad" fill="#2dd4bf" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Valor por Categoría</CardTitle>
                <CardDescription>Distribución del valor en libros</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="h-[200px] w-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categorias}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="valor"
                        >
                          {categorias.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 flex-1">
                    {categorias.slice(0, 5).map((cat) => (
                      <div key={cat.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span className="text-xs truncate max-w-[100px]">{cat.nombre}</span>
                        </div>
                        <span className="text-xs font-medium">{((cat.valor / totalValor) * 100).toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Mantenimiento */}
        <TabsContent value="mantenimiento" className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Programados", valor: 18, icono: Calendar, color: "text-blue-400 bg-blue-500/20" },
              { label: "En Proceso", valor: 5, icono: RefreshCw, color: "text-amber-400 bg-amber-500/20" },
              { label: "Completados", valor: 42, icono: CheckCircle2, color: "text-emerald-400 bg-emerald-500/20" },
              { label: "Vencidos", valor: 2, icono: AlertTriangle, color: "text-red-400 bg-red-500/20" },
            ].map((item) => (
              <Card key={item.label} className="bg-card border-border">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${item.color}`}>
                    <item.icono className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{item.valor}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Calendario de Mantenimientos</CardTitle>
                <Button size="sm" className="gap-2 bg-teal-600 hover:bg-teal-700">
                  <Plus className="h-4 w-4" />
                  Programar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {mantenimientos.map((mant) => (
                    <div
                      key={mant.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-lg ${mant.estado === "en_proceso" ? "bg-amber-500/20" : "bg-blue-500/20"}`}
                        >
                          <Wrench
                            className={`h-5 w-5 ${mant.estado === "en_proceso" ? "text-amber-400" : "text-blue-400"}`}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{mant.activo}</p>
                            <Badge variant="outline" className={getPrioridadColor(mant.prioridad)}>
                              {mant.prioridad}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {mant.tipo} - {mant.tecnico}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{mant.fecha}</p>
                        <p className="text-sm text-muted-foreground">{formatCurrency(mant.costo)}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          mant.estado === "programado"
                            ? "text-blue-400 border-blue-500/30"
                            : "text-amber-400 border-amber-500/30"
                        }
                      >
                        {mant.estado === "programado" ? "Programado" : "En proceso"}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Reportes */}
        <TabsContent value="reportes" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { nombre: "Inventario de Activos", descripcion: "Listado completo con valores", icono: FileText },
              { nombre: "Depreciación Anual", descripcion: "Cálculo fiscal y contable", icono: TrendingDown },
              { nombre: "Historial Mantenimiento", descripcion: "Registro de intervenciones", icono: History },
              { nombre: "Activos por Ubicación", descripcion: "Distribución geográfica", icono: MapPin },
              { nombre: "Proyección Reposición", descripcion: "Activos a renovar", icono: RefreshCw },
              { nombre: "Análisis ROI", descripcion: "Retorno por activo", icono: TrendingUp },
              { nombre: "Costo Total Propiedad", descripcion: "TCO por categoría", icono: DollarSign },
              { nombre: "Auditoría Activos", descripcion: "Control y verificación", icono: CheckCircle2 },
            ].map((reporte) => (
              <Card
                key={reporte.nombre}
                className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-teal-500/20">
                      <reporte.icono className="h-5 w-5 text-teal-400" />
                    </div>
                  </div>
                  <p className="font-medium mb-1">{reporte.nombre}</p>
                  <p className="text-xs text-muted-foreground">{reporte.descripcion}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity gap-2 bg-transparent"
                  >
                    <Download className="h-3 w-3" />
                    Generar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal Detalle Activo */}
      {selectedActivo && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl bg-card border-border max-h-[90vh] overflow-auto">
            <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-card z-10 border-b border-border">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {selectedActivo.nombre}
                  <Badge variant="outline" className={getEstadoColor(selectedActivo.estado)}>
                    {selectedActivo.estado}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  {selectedActivo.codigo} - {selectedActivo.categoria}
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedActivo(null)}>
                <X className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex gap-6">
                <div className="w-40 h-40 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedActivo.imagen || "/placeholder.svg"}
                    alt={selectedActivo.nombre}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Valor Adquisición</p>
                    <p className="text-xl font-bold">{formatCurrency(selectedActivo.valorAdquisicion)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Valor Actual</p>
                    <p className="text-xl font-bold text-emerald-400">{formatCurrency(selectedActivo.valorActual)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Depreciación Acumulada</p>
                    <p className="text-xl font-bold text-red-400">-{formatCurrency(selectedActivo.depreciacionAcum)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Vida Útil Restante</p>
                    <p className="text-xl font-bold">
                      {selectedActivo.vidaRestante} / {selectedActivo.vidaUtil} años
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Ubicación</p>
                    <p className="text-sm font-medium">{selectedActivo.ubicacion}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Responsable</p>
                    <p className="text-sm font-medium">{selectedActivo.responsable}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Fecha Adquisición</p>
                    <p className="text-sm font-medium">{selectedActivo.fechaAdquisicion}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wrench className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Próximo Mantenimiento</p>
                    <p className="text-sm font-medium">{selectedActivo.proximoMant || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 gap-2">
                  <Edit className="h-4 w-4" />
                  Editar
                </Button>
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <Wrench className="h-4 w-4" />
                  Mantenimiento
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <QrCode className="h-4 w-4" />
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
