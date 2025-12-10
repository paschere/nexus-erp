"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Building2,
  Plus,
  Search,
  Filter,
  Star,
  TrendingUp,
  TrendingDown,
  Package,
  Clock,
  DollarSign,
  FileText,
  MapPin,
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Award,
  Truck,
  Sparkles,
  ShieldCheck,
  Calendar,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const proveedores = [
  {
    id: 1,
    nombre: "Suministros Industriales S.A.",
    nit: "900.123.456-7",
    categoria: "Materias Primas",
    ciudad: "Bogotá",
    contacto: "Juan Pérez",
    email: "juan@suministros.com",
    telefono: "+57 1 234 5678",
    rating: 4.8,
    comprasAnuales: 450000000,
    ordenesPendientes: 3,
    tiempoEntrega: 3.2,
    cumplimiento: 96,
    estado: "activo",
    certificaciones: ["ISO 9001", "ISO 14001"],
  },
  {
    id: 2,
    nombre: "Tecnología Global Ltda",
    nit: "800.987.654-3",
    categoria: "Tecnología",
    ciudad: "Medellín",
    contacto: "María García",
    email: "maria@tecglobal.com",
    telefono: "+57 4 567 8901",
    rating: 4.5,
    comprasAnuales: 280000000,
    ordenesPendientes: 1,
    tiempoEntrega: 5.1,
    cumplimiento: 92,
    estado: "activo",
    certificaciones: ["ISO 27001"],
  },
  {
    id: 3,
    nombre: "Distribuidora Nacional",
    nit: "901.456.789-0",
    categoria: "Logística",
    ciudad: "Cali",
    contacto: "Carlos López",
    email: "carlos@distinacional.co",
    telefono: "+57 2 345 6789",
    rating: 3.9,
    comprasAnuales: 180000000,
    ordenesPendientes: 5,
    tiempoEntrega: 4.8,
    cumplimiento: 85,
    estado: "revision",
    certificaciones: [],
  },
  {
    id: 4,
    nombre: "Químicos del Valle",
    nit: "890.234.567-1",
    categoria: "Químicos",
    ciudad: "Barranquilla",
    contacto: "Ana Martínez",
    email: "ana@quimvalle.com",
    telefono: "+57 5 678 9012",
    rating: 4.2,
    comprasAnuales: 320000000,
    ordenesPendientes: 2,
    tiempoEntrega: 6.3,
    cumplimiento: 88,
    estado: "activo",
    certificaciones: ["BASC"],
  },
]

const evaluaciones = [
  { mes: "Ago", calidad: 92, entrega: 88, precio: 95 },
  { mes: "Sep", calidad: 94, entrega: 91, precio: 93 },
  { mes: "Oct", calidad: 91, entrega: 85, precio: 94 },
  { mes: "Nov", calidad: 96, entrega: 93, precio: 92 },
  { mes: "Dic", calidad: 95, entrega: 90, precio: 91 },
  { mes: "Ene", calidad: 97, entrega: 94, precio: 90 },
]

export function ProveedoresModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoriaFilter, setCategoriaFilter] = useState("todos")
  const [showNewSupplier, setShowNewSupplier] = useState(false)

  const getEstadoBadge = (estado: string) => {
    const styles: Record<string, { bg: string; icon: any }> = {
      activo: { bg: "bg-green-500/20 text-green-400", icon: CheckCircle },
      revision: { bg: "bg-yellow-500/20 text-yellow-400", icon: AlertTriangle },
      inactivo: { bg: "bg-red-500/20 text-red-400", icon: XCircle },
    }
    const Icon = styles[estado].icon
    return (
      <Badge className={styles[estado].bg}>
        <Icon className="h-3 w-3 mr-1" />
        {estado.charAt(0).toUpperCase() + estado.slice(1)}
      </Badge>
    )
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-green-400"
    if (rating >= 4.0) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Proveedores</h1>
          <p className="text-muted-foreground">Gestión y evaluación de proveedores</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Sparkles className="h-4 w-4" />
            Evaluar con AI
          </Button>
          <Dialog open={showNewSupplier} onOpenChange={setShowNewSupplier}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary">
                <Plus className="h-4 w-4" />
                Nuevo Proveedor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Nuevo Proveedor</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[70vh] pr-4">
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Razón Social</Label>
                      <Input placeholder="Nombre de la empresa" />
                    </div>
                    <div className="space-y-2">
                      <Label>NIT</Label>
                      <Input placeholder="000.000.000-0" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Categoría</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="materias">Materias Primas</SelectItem>
                          <SelectItem value="tecnologia">Tecnología</SelectItem>
                          <SelectItem value="logistica">Logística</SelectItem>
                          <SelectItem value="servicios">Servicios</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Ciudad</Label>
                      <Input placeholder="Ciudad" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Contacto Principal</Label>
                      <Input placeholder="Nombre del contacto" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="email@empresa.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Teléfono</Label>
                      <Input placeholder="+57 xxx xxx xxxx" />
                    </div>
                    <div className="space-y-2">
                      <Label>Sitio Web</Label>
                      <Input placeholder="www.empresa.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Dirección</Label>
                    <Input placeholder="Dirección completa" />
                  </div>
                </div>
              </ScrollArea>
              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setShowNewSupplier(false)}>
                  Cancelar
                </Button>
                <Button className="bg-primary">Guardar Proveedor</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Proveedores</p>
                <p className="text-2xl font-bold">{proveedores.length}</p>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" /> +3 este mes
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compras Anuales</p>
                <p className="text-2xl font-bold">$1.2B</p>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" /> +12% vs año anterior
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tiempo Promedio</p>
                <p className="text-2xl font-bold">4.6 días</p>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3" /> -0.5 días
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <Truck className="h-5 w-5 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cumplimiento</p>
                <p className="text-2xl font-bold">91%</p>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" /> +3%
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Award className="h-5 w-5 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="lista" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="lista">Directorio</TabsTrigger>
            <TabsTrigger value="evaluacion">Evaluación</TabsTrigger>
            <TabsTrigger value="ordenes">Órdenes</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar proveedores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64 bg-muted/50"
              />
            </div>
            <Select value={categoriaFilter} onValueChange={setCategoriaFilter}>
              <SelectTrigger className="w-40 bg-muted/50">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas</SelectItem>
                <SelectItem value="materias">Materias Primas</SelectItem>
                <SelectItem value="tecnologia">Tecnología</SelectItem>
                <SelectItem value="logistica">Logística</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="lista">
          <div className="grid grid-cols-2 gap-4">
            {proveedores.map((proveedor) => (
              <Card key={proveedor.id} className="bg-card border-border hover:border-primary/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {proveedor.nombre.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{proveedor.nombre}</h3>
                        <p className="text-sm text-muted-foreground">{proveedor.nit}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {proveedor.categoria}
                          </Badge>
                          {getEstadoBadge(proveedor.estado)}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" /> Ver Detalle
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" /> Nueva Orden
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star className="h-4 w-4 mr-2" /> Evaluar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Rating</p>
                      <p
                        className={`font-bold flex items-center justify-center gap-1 ${getRatingColor(proveedor.rating)}`}
                      >
                        <Star className="h-4 w-4 fill-current" />
                        {proveedor.rating}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Compras</p>
                      <p className="font-bold">${(proveedor.comprasAnuales / 1000000).toFixed(0)}M</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Cumplimiento</p>
                      <p className="font-bold">{proveedor.cumplimiento}%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {proveedor.ciudad}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {proveedor.tiempoEntrega} días
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="h-3 w-3" /> {proveedor.ordenesPendientes} pendientes
                    </span>
                  </div>

                  {proveedor.certificaciones.length > 0 && (
                    <div className="flex items-center gap-2 mt-3">
                      {proveedor.certificaciones.map((cert) => (
                        <Badge key={cert} variant="outline" className="text-xs">
                          <ShieldCheck className="h-3 w-3 mr-1" /> {cert}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="evaluacion">
          <div className="grid grid-cols-3 gap-4">
            <Card className="col-span-2 bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Evaluación de Desempeño</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end gap-4">
                  {evaluaciones.map((ev, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex gap-1 h-48">
                        <div className="flex-1 flex flex-col justify-end">
                          <div className="bg-blue-500 rounded-t" style={{ height: `${ev.calidad * 2}px` }}></div>
                        </div>
                        <div className="flex-1 flex flex-col justify-end">
                          <div className="bg-green-500 rounded-t" style={{ height: `${ev.entrega * 2}px` }}></div>
                        </div>
                        <div className="flex-1 flex flex-col justify-end">
                          <div className="bg-yellow-500 rounded-t" style={{ height: `${ev.precio * 2}px` }}></div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{ev.mes}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-6 mt-4">
                  <span className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded bg-blue-500"></div> Calidad
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded bg-green-500"></div> Entrega
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded bg-yellow-500"></div> Precio
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Top Proveedores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {proveedores
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 4)
                  .map((p, i) => (
                    <div key={p.id} className="flex items-center gap-3">
                      <span className="text-lg font-bold text-muted-foreground">#{i + 1}</span>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                          {p.nombre.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{p.nombre}</p>
                        <p className="text-xs text-muted-foreground">{p.categoria}</p>
                      </div>
                      <div className={`flex items-center gap-1 ${getRatingColor(p.rating)}`}>
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-bold">{p.rating}</span>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ordenes">
          <Card className="bg-card border-border">
            <CardContent className="p-6 text-center text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Las órdenes de compra se gestionan en el módulo de Compras</p>
              <Button variant="outline" className="mt-4 bg-transparent">
                Ir a Compras
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Distribución por Categoría</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { cat: "Materias Primas", valor: 45, color: "bg-blue-500" },
                  { cat: "Tecnología", valor: 25, color: "bg-green-500" },
                  { cat: "Logística", valor: 18, color: "bg-yellow-500" },
                  { cat: "Servicios", valor: 12, color: "bg-purple-500" },
                ].map((item) => (
                  <div key={item.cat} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.cat}</span>
                      <span className="text-muted-foreground">{item.valor}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.valor}%` }}></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-base">Métricas Clave</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Proveedores Certificados", valor: "68%", icono: ShieldCheck, color: "text-green-400" },
                  { label: "Días Promedio de Pago", valor: "32 días", icono: Calendar, color: "text-blue-400" },
                  { label: "Órdenes este Mes", valor: "127", icono: FileText, color: "text-yellow-400" },
                  { label: "Ahorro por Negociación", valor: "$45M", icono: TrendingDown, color: "text-purple-400" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <item.icono className={`h-5 w-5 ${item.color}`} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <span className="font-bold">{item.valor}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
