"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  Plus,
  Search,
  Download,
  Upload,
  Building2,
  User,
  TrendingUp,
  DollarSign,
  Star,
  StarOff,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  FileText,
  ShoppingCart,
  Sparkles,
  MessageSquare,
  History,
  Target,
  AlertCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const clientes = [
  {
    id: "CLI-001",
    nombre: "Constructora ABC S.A.S",
    tipo: "empresa",
    nit: "900.123.456-7",
    email: "contacto@constructoraabc.com",
    telefono: "+57 601 234 5678",
    ciudad: "Bogotá",
    segmento: "Enterprise",
    valorTotal: 485000000,
    pedidos: 45,
    ultimaCompra: "2024-01-15",
    estado: "activo",
    favorito: true,
    score: 92,
  },
  {
    id: "CLI-002",
    nombre: "Distribuidora XYZ Ltda",
    tipo: "empresa",
    nit: "800.456.789-1",
    email: "ventas@distribuidoraxyz.com",
    telefono: "+57 604 567 8901",
    ciudad: "Medellín",
    segmento: "PYME",
    valorTotal: 128000000,
    pedidos: 23,
    ultimaCompra: "2024-01-14",
    estado: "activo",
    favorito: true,
    score: 78,
  },
  {
    id: "CLI-003",
    nombre: "Tech Solutions Colombia",
    tipo: "empresa",
    nit: "901.234.567-8",
    email: "info@techsolutions.co",
    telefono: "+57 601 890 1234",
    ciudad: "Bogotá",
    segmento: "Enterprise",
    valorTotal: 356000000,
    pedidos: 67,
    ultimaCompra: "2024-01-12",
    estado: "activo",
    favorito: false,
    score: 88,
  },
  {
    id: "CLI-004",
    nombre: "Juan Carlos Pérez",
    tipo: "persona",
    nit: "79.456.123",
    email: "jcperez@gmail.com",
    telefono: "+57 310 123 4567",
    ciudad: "Cali",
    segmento: "Individual",
    valorTotal: 8500000,
    pedidos: 5,
    ultimaCompra: "2024-01-10",
    estado: "activo",
    favorito: false,
    score: 65,
  },
  {
    id: "CLI-005",
    nombre: "Importadora del Valle",
    tipo: "empresa",
    nit: "890.567.234-5",
    email: "compras@importadoravalle.com",
    telefono: "+57 602 345 6789",
    ciudad: "Cali",
    segmento: "PYME",
    valorTotal: 95000000,
    pedidos: 18,
    ultimaCompra: "2024-01-08",
    estado: "inactivo",
    favorito: false,
    score: 45,
  },
  {
    id: "CLI-006",
    nombre: "Servicios Integrados Co",
    tipo: "empresa",
    nit: "900.876.543-2",
    email: "admin@serviciosintegrados.co",
    telefono: "+57 605 678 9012",
    ciudad: "Barranquilla",
    segmento: "PYME",
    valorTotal: 67000000,
    pedidos: 12,
    ultimaCompra: "2024-01-05",
    estado: "activo",
    favorito: false,
    score: 72,
  },
]

const ventasPorMes = [
  { mes: "Ago", ventas: 125 },
  { mes: "Sep", ventas: 148 },
  { mes: "Oct", ventas: 162 },
  { mes: "Nov", ventas: 178 },
  { mes: "Dic", ventas: 195 },
  { mes: "Ene", ventas: 156 },
]

const segmentoData = [
  { name: "Enterprise", value: 45, color: "#2dd4bf" },
  { name: "PYME", value: 35, color: "#3b82f6" },
  { name: "Individual", value: 20, color: "#f59e0b" },
]

const estadoColors: Record<string, string> = {
  activo: "bg-green-500/20 text-green-400 border-green-500/30",
  inactivo: "bg-red-500/20 text-red-400 border-red-500/30",
  prospecto: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
}

export function ClientesModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSegmento, setFilterSegmento] = useState("todos")
  const [filterEstado, setFilterEstado] = useState("todos")
  const [showNewCliente, setShowNewCliente] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<(typeof clientes)[0] | null>(null)

  const filteredClientes = clientes.filter((c) => {
    const matchSearch =
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.nit.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchSegmento = filterSegmento === "todos" || c.segmento.toLowerCase() === filterSegmento.toLowerCase()
    const matchEstado = filterEstado === "todos" || c.estado === filterEstado
    return matchSearch && matchSegmento && matchEstado
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">Gestión completa de clientes y relaciones comerciales</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Upload className="h-4 w-4" />
            Importar
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Dialog open={showNewCliente} onOpenChange={setShowNewCliente}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                Nuevo Cliente
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Crear Nuevo Cliente</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* AI Suggestion */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">NEXUS AI detectó un prospecto</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Hay un lead de "Inversiones Globales S.A" en tu bandeja de correo que podría convertirse en
                        cliente. ¿Deseas autocompletar los datos?
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="mt-2 text-primary hover:text-primary hover:bg-primary/10"
                      >
                        Autocompletar datos
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Tipo de cliente */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 rounded-lg border-2 border-primary bg-primary/10 flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">Empresa</span>
                  </button>
                  <button className="p-4 rounded-lg border-2 border-border hover:border-primary/50 flex items-center gap-3">
                    <User className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Persona Natural</span>
                  </button>
                </div>

                {/* Datos básicos */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>NIT / Cédula</Label>
                    <Input placeholder="900.123.456-7" />
                  </div>
                  <div className="space-y-2">
                    <Label>Razón Social / Nombre</Label>
                    <Input placeholder="Nombre del cliente" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="correo@empresa.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Teléfono</Label>
                    <Input placeholder="+57 300 123 4567" />
                  </div>
                  <div className="space-y-2">
                    <Label>Ciudad</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar ciudad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bogota">Bogotá D.C.</SelectItem>
                        <SelectItem value="medellin">Medellín</SelectItem>
                        <SelectItem value="cali">Cali</SelectItem>
                        <SelectItem value="barranquilla">Barranquilla</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Segmento</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar segmento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                        <SelectItem value="pyme">PYME</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Dirección</Label>
                    <Input placeholder="Dirección completa" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Notas</Label>
                    <Textarea placeholder="Información adicional del cliente..." />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowNewCliente(false)}>
                    Cancelar
                  </Button>
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4" />
                    Crear Cliente
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Clientes</p>
                <p className="text-2xl font-bold text-foreground">1,248</p>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +28 este mes
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor de Vida (LTV)</p>
                <p className="text-2xl font-bold text-foreground">$42.5M</p>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +5.2% vs trimestre anterior
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasa Retención</p>
                <p className="text-2xl font-bold text-foreground">94.2%</p>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +2.1% vs año anterior
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">En Riesgo</p>
                <p className="text-2xl font-bold text-foreground">23</p>
                <p className="text-xs text-yellow-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="h-3 w-3" />
                  Sin compras en 60+ días
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Panel */}
      <Card className="bg-gradient-to-r from-primary/5 to-blue-500/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Insights de NEXUS AI</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <div className="bg-background/50 rounded-lg p-3">
                  <p className="text-sm font-medium text-yellow-400">Oportunidad de Upsell</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    "Constructora ABC" tiene patrón de compra mensual. Considera ofrecer plan Enterprise.
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <p className="text-sm font-medium text-red-400">Cliente en Riesgo</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    "Importadora del Valle" no ha comprado en 45 días. Última interacción fue un reclamo.
                  </p>
                </div>
                <div className="bg-background/50 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-400">Tendencia Positiva</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    El segmento PYME creció 18% este trimestre. Enfoca marketing en este grupo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Nuevos Clientes por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ventasPorMes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="ventas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Por Segmento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={segmentoData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    dataKey="value"
                    stroke="none"
                  >
                    {segmentoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {segmentoData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Lista de Clientes</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cliente..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64 bg-muted/50"
                />
              </div>
              <Select value={filterSegmento} onValueChange={setFilterSegmento}>
                <SelectTrigger className="w-36 bg-muted/50">
                  <SelectValue placeholder="Segmento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="pyme">PYME</SelectItem>
                  <SelectItem value="individual">Individual</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterEstado} onValueChange={setFilterEstado}>
                <SelectTrigger className="w-32 bg-muted/50">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>NIT / Cédula</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Segmento</TableHead>
                  <TableHead className="text-right">Valor Total</TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.map((cliente) => (
                  <TableRow key={cliente.id} className="border-border">
                    <TableCell>
                      <button className="text-muted-foreground hover:text-yellow-400">
                        {cliente.favorito ? (
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {cliente.nombre
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{cliente.nombre}</p>
                          <p className="text-xs text-muted-foreground">{cliente.ciudad}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{cliente.nit}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="text-muted-foreground">{cliente.email}</p>
                        <p className="text-xs text-muted-foreground">{cliente.telefono}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {cliente.segmento}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${(cliente.valorTotal / 1000000).toFixed(0)}M
                    </TableCell>
                    <TableCell className="text-center">
                      <div
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold ${
                          cliente.score >= 80
                            ? "bg-green-500/20 text-green-400"
                            : cliente.score >= 60
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {cliente.score}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={estadoColors[cliente.estado]}>
                        {cliente.estado.charAt(0).toUpperCase() + cliente.estado.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            Ver perfil
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Enviar mensaje
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <FileText className="h-4 w-4" />
                            Ver facturas
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <ShoppingCart className="h-4 w-4" />
                            Nuevo pedido
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <History className="h-4 w-4" />
                            Historial
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
