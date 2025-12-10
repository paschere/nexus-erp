"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Building2,
  FileCheck,
  FileX,
  RefreshCw,
  Eye,
  Mail,
  Printer,
  MoreHorizontal,
  TrendingUp,
  Receipt,
  FileOutput,
  Sparkles,
  Zap,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const facturas = [
  {
    id: "FE-001245",
    cliente: "Constructora ABC S.A.S",
    nit: "900.123.456-7",
    fecha: "2024-01-15",
    valor: 15840000,
    estado: "aceptada",
    cufe: "a1b2c3d4e5f6...",
    tipo: "factura",
  },
  {
    id: "FE-001244",
    cliente: "Distribuidora XYZ Ltda",
    nit: "800.456.789-1",
    fecha: "2024-01-15",
    valor: 8920000,
    estado: "aceptada",
    cufe: "b2c3d4e5f6g7...",
    tipo: "factura",
  },
  {
    id: "FE-001243",
    cliente: "Tech Solutions Colombia",
    nit: "901.234.567-8",
    fecha: "2024-01-14",
    valor: 25600000,
    estado: "pendiente",
    cufe: "",
    tipo: "factura",
  },
  {
    id: "NC-000089",
    cliente: "Constructora ABC S.A.S",
    nit: "900.123.456-7",
    fecha: "2024-01-14",
    valor: 2500000,
    estado: "aceptada",
    cufe: "c3d4e5f6g7h8...",
    tipo: "nota_credito",
  },
  {
    id: "FE-001242",
    cliente: "Importadora del Valle",
    nit: "890.567.234-5",
    fecha: "2024-01-13",
    valor: 12350000,
    estado: "rechazada",
    cufe: "",
    tipo: "factura",
  },
  {
    id: "ND-000034",
    cliente: "Distribuidora XYZ Ltda",
    nit: "800.456.789-1",
    fecha: "2024-01-13",
    valor: 1800000,
    estado: "aceptada",
    cufe: "d4e5f6g7h8i9...",
    tipo: "nota_debito",
  },
  {
    id: "FE-001241",
    cliente: "Servicios Integrados Co",
    nit: "900.876.543-2",
    fecha: "2024-01-12",
    valor: 6780000,
    estado: "aceptada",
    cufe: "e5f6g7h8i9j0...",
    tipo: "factura",
  },
  {
    id: "DS-000156",
    cliente: "Proveedor Nacional S.A",
    nit: "800.111.222-3",
    fecha: "2024-01-12",
    valor: 4500000,
    estado: "aceptada",
    cufe: "f6g7h8i9j0k1...",
    tipo: "doc_soporte",
  },
]

const facturacionMensual = [
  { mes: "Ago", facturas: 145, valor: 850 },
  { mes: "Sep", facturas: 162, valor: 920 },
  { mes: "Oct", facturas: 178, valor: 1050 },
  { mes: "Nov", facturas: 195, valor: 1180 },
  { mes: "Dic", facturas: 210, valor: 1350 },
  { mes: "Ene", facturas: 156, valor: 980 },
]

const distribucionTipo = [
  { name: "Facturas", value: 78, color: "#2dd4bf" },
  { name: "Notas Crédito", value: 12, color: "#f59e0b" },
  { name: "Notas Débito", value: 5, color: "#8b5cf6" },
  { name: "Doc. Soporte", value: 5, color: "#3b82f6" },
]

const estadoColors: Record<string, string> = {
  aceptada: "bg-green-500/20 text-green-400 border-green-500/30",
  pendiente: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  rechazada: "bg-red-500/20 text-red-400 border-red-500/30",
  procesando: "bg-blue-500/20 text-blue-400 border-blue-500/30",
}

const tipoLabels: Record<string, string> = {
  factura: "Factura Electrónica",
  nota_credito: "Nota Crédito",
  nota_debito: "Nota Débito",
  doc_soporte: "Doc. Soporte",
}

export function FacturacionElectronicaModule() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEstado, setFilterEstado] = useState("todos")
  const [filterTipo, setFilterTipo] = useState("todos")
  const [showNewFactura, setShowNewFactura] = useState(false)
  const [tipoDocumento, setTipoDocumento] = useState("factura")

  const filteredFacturas = facturas.filter((f) => {
    const matchSearch =
      f.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.nit.includes(searchTerm)
    const matchEstado = filterEstado === "todos" || f.estado === filterEstado
    const matchTipo = filterTipo === "todos" || f.tipo === filterTipo
    return matchSearch && matchEstado && matchTipo
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Facturación Electrónica DIAN</h1>
          <p className="text-muted-foreground">Emisión y gestión de documentos electrónicos</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <RefreshCw className="h-4 w-4" />
            Sincronizar DIAN
          </Button>
          <Dialog open={showNewFactura} onOpenChange={setShowNewFactura}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4" />
                Nuevo Documento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Crear Documento Electrónico</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                {/* Tipo de documento */}
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { id: "factura", label: "Factura", icon: FileText },
                    { id: "nota_credito", label: "Nota Crédito", icon: FileX },
                    { id: "nota_debito", label: "Nota Débito", icon: FileCheck },
                    { id: "doc_soporte", label: "Doc. Soporte", icon: FileOutput },
                  ].map((tipo) => (
                    <button
                      key={tipo.id}
                      onClick={() => setTipoDocumento(tipo.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        tipoDocumento === tipo.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <tipo.icon
                        className={`h-6 w-6 mx-auto mb-2 ${tipoDocumento === tipo.id ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <p className="text-sm font-medium">{tipo.label}</p>
                    </button>
                  ))}
                </div>

                {/* AI Suggestion */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">Sugerencia de NEXUS AI</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Basado en el historial, te sugiero facturar a "Constructora ABC S.A.S" por los servicios de
                        consultoría pendientes del mes pasado (~$12.500.000).
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="mt-2 text-primary hover:text-primary hover:bg-primary/10"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Aplicar sugerencia
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Datos del cliente */}
                <div className="space-y-4">
                  <h3 className="font-medium">Datos del Cliente</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>NIT / Cédula</Label>
                      <div className="flex gap-2">
                        <Input placeholder="900.123.456-7" />
                        <Button variant="outline" size="icon">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Razón Social</Label>
                      <Input placeholder="Nombre del cliente" />
                    </div>
                    <div className="space-y-2">
                      <Label>Dirección</Label>
                      <Input placeholder="Dirección fiscal" />
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
                      <Label>Email</Label>
                      <Input type="email" placeholder="correo@empresa.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Teléfono</Label>
                      <Input placeholder="+57 300 123 4567" />
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Items / Productos</h3>
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      <Plus className="h-3 w-3" />
                      Agregar item
                    </Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descripción</TableHead>
                        <TableHead className="w-24">Cantidad</TableHead>
                        <TableHead className="w-32">Precio Unit.</TableHead>
                        <TableHead className="w-24">IVA</TableHead>
                        <TableHead className="w-32 text-right">Total</TableHead>
                        <TableHead className="w-10"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Input placeholder="Descripción del producto o servicio" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" defaultValue={1} />
                        </TableCell>
                        <TableCell>
                          <Input type="number" placeholder="0" />
                        </TableCell>
                        <TableCell>
                          <Select defaultValue="19">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0%</SelectItem>
                              <SelectItem value="5">5%</SelectItem>
                              <SelectItem value="19">19%</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right font-medium">$0</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Totales */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">IVA (19%)</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Retención</span>
                    <span>-$0</span>
                  </div>
                  <div className="border-t border-border my-2"></div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">$0</span>
                  </div>
                </div>

                {/* Observaciones */}
                <div className="space-y-2">
                  <Label>Observaciones</Label>
                  <Textarea placeholder="Notas adicionales para la factura..." />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setShowNewFactura(false)}>
                    Cancelar
                  </Button>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <FileText className="h-4 w-4" />
                    Guardar borrador
                  </Button>
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Send className="h-4 w-4" />
                    Emitir a DIAN
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
                <p className="text-sm text-muted-foreground">Facturas Emitidas</p>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% vs mes anterior
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Valor Facturado</p>
                <p className="text-2xl font-bold text-foreground">$980M</p>
                <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +8.5% vs mes anterior
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Receipt className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tasa Aceptación</p>
                <p className="text-2xl font-bold text-foreground">98.5%</p>
                <p className="text-xs text-muted-foreground mt-1">2 rechazadas este mes</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolución DIAN</p>
                <p className="text-2xl font-bold text-foreground">18760</p>
                <p className="text-xs text-yellow-400 flex items-center gap-1 mt-1">
                  <AlertTriangle className="h-3 w-3" />
                  Vence en 45 días
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Facturación Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={facturacionMensual}>
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
                  <Area
                    type="monotone"
                    dataKey="valor"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
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
            <CardTitle className="text-base">Por Tipo de Documento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distribucionTipo}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    dataKey="value"
                    stroke="none"
                  >
                    {distribucionTipo.map((entry, index) => (
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
            <div className="grid grid-cols-2 gap-2 mt-4">
              {distribucionTipo.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                  <span className="text-xs font-medium ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="todos" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="facturas">Facturas</TabsTrigger>
            <TabsTrigger value="notas">Notas Crédito/Débito</TabsTrigger>
            <TabsTrigger value="soporte">Doc. Soporte</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente, número, NIT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-64 bg-muted/50"
              />
            </div>
            <Select value={filterEstado} onValueChange={setFilterEstado}>
              <SelectTrigger className="w-36 bg-muted/50">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="aceptada">Aceptada</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="rechazada">Rechazada</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="todos" className="mt-0">
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead>Número</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>NIT</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFacturas.map((factura) => (
                      <TableRow key={factura.id} className="border-border">
                        <TableCell className="font-medium text-primary">{factura.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {tipoLabels[factura.tipo]}
                          </Badge>
                        </TableCell>
                        <TableCell>{factura.cliente}</TableCell>
                        <TableCell className="text-muted-foreground">{factura.nit}</TableCell>
                        <TableCell className="text-muted-foreground">{factura.fecha}</TableCell>
                        <TableCell className="text-right font-medium">
                          ${(factura.valor / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell>
                          <Badge className={estadoColors[factura.estado]}>
                            {factura.estado === "aceptada" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {factura.estado === "pendiente" && <Clock className="h-3 w-3 mr-1" />}
                            {factura.estado === "rechazada" && <XCircle className="h-3 w-3 mr-1" />}
                            {factura.estado.charAt(0).toUpperCase() + factura.estado.slice(1)}
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
                                Ver documento
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Download className="h-4 w-4" />
                                Descargar PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <FileText className="h-4 w-4" />
                                Descargar XML
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Mail className="h-4 w-4" />
                                Enviar por correo
                              </DropdownMenuItem>
                              <DropdownMenuItem className="gap-2">
                                <Printer className="h-4 w-4" />
                                Imprimir
                              </DropdownMenuItem>
                              {factura.estado === "rechazada" && (
                                <DropdownMenuItem className="gap-2 text-primary">
                                  <RefreshCw className="h-4 w-4" />
                                  Reenviar a DIAN
                                </DropdownMenuItem>
                              )}
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
        </TabsContent>

        <TabsContent value="facturas">
          <Card className="bg-card border-border p-8 text-center text-muted-foreground">
            Vista filtrada de facturas electrónicas
          </Card>
        </TabsContent>

        <TabsContent value="notas">
          <Card className="bg-card border-border p-8 text-center text-muted-foreground">
            Vista filtrada de notas crédito y débito
          </Card>
        </TabsContent>

        <TabsContent value="soporte">
          <Card className="bg-card border-border p-8 text-center text-muted-foreground">
            Vista filtrada de documentos soporte
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
